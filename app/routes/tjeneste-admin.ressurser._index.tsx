import { Alert, Box, Button, VStack } from '@navikt/ds-react';
import { json } from '@remix-run/node';
import { Links, Meta, Scripts, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import {
    fetchAllOrgUnits,
    fetchApplicationCategory,
    fetchResourcesForAdmin,
} from '~/data/fetch-resources';
import { Search } from '~/components/common/Search';
import { ServiceAdminTable } from '~/components/service-admin/ServiceAdminTable';
import { ResourceSelectApplicationCategory } from '~/components/service-admin/ResourceSelectApplicationCategory';
import { PlusIcon } from '@navikt/aksel-icons';
import { getSizeCookieFromRequestHeader } from '~/components/common/CommonFunctions';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { BASE_PATH } from '../../environment';
import React from 'react';
import { fetchResourceDataSource } from '~/data/fetch-kodeverk';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE } from '~/data/paths';
import { IResourceAdminList } from '~/data/types/resourceTypes';

export async function loader({ request }: LoaderFunctionArgs): Promise<
    Omit<Response, 'json'> & {
        json(): Promise<any>;
    }
> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const status = url.searchParams.get('status') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const [resourceList, orgUnitTree, applicationCategories, source] = await Promise.all([
        fetchResourcesForAdmin(
            request,
            size,
            page,
            search,
            status,
            orgUnits,
            applicationcategory,
            accessType
        ),
        fetchAllOrgUnits(request),
        fetchApplicationCategory(request),
        fetchResourceDataSource(request),
    ]);

    return json({
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        applicationCategories,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        source,
    });
}

export default function ServiceAdminIndex() {
    const loaderData = useLoaderData<typeof loader>();
    const resourceList: IResourceAdminList = loaderData.resourceList;
    const size = loaderData.size;
    const basePath: string = loaderData.basePath;
    const responseCode: string | undefined = loaderData.responseCode;
    const applicationCategories: string[] = loaderData.applicationCategories;
    const source = loaderData.source;
    const navigate = useNavigate();

    return (
        <VStack className={'content'} gap="4">
            <TableHeaderLayout
                title={'Ressursadministrasjon'}
                SearchComponent={<Search label={'Søk etter ressurs'} id={'search-service-admin'} />}
                FilterComponents={
                    <ResourceSelectApplicationCategory
                        applicationCategories={applicationCategories}
                    />
                }
                CreateNewButton={
                    source === 'gui' ? (
                        <Button
                            role="link"
                            className={'no-underline-button'}
                            variant={'secondary'}
                            iconPosition="right"
                            icon={<PlusIcon aria-hidden />}
                            onClick={() => navigate(SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE)}>
                            Opprett ny ressurs
                        </Button>
                    ) : undefined
                }
            />
            <ResponseAlert
                responseCode={responseCode}
                successText={'Ressursen ble opprettet!'}
                deleteText={'Ressursen ble slettet!'}
            />
            <ServiceAdminTable
                resourcePage={resourceList}
                size={size}
                basePath={basePath}
                source={source}
            />
        </VStack>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <html lang={'no'}>
            <head>
                <title>Feil oppstod</title>
                <Meta />
                <Links />
            </head>
            <body>
                <Box paddingBlock="8">
                    <Alert variant="error">
                        Det oppsto en feil med følgende melding:
                        <div>{error.message}</div>
                    </Alert>
                </Box>
                <Scripts />
            </body>
        </html>
    );
}
