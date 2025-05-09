import { VStack } from '@navikt/ds-react';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { fetchAllOrgUnits, fetchResourcesForAdmin } from '~/data/fetch-resources';
import { Search } from '~/components/common/Search';
import { ServiceAdminTable } from '~/components/service-admin/ServiceAdminTable';
import { FilterByApplicationCategory } from '~/components/common/filter/FilterByApplicationCategory';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { BASE_PATH } from '../../environment';
import React from 'react';
import { fetchApplicationCategories, fetchResourceDataSource } from '~/data/fetch-kodeverk';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';
import { FilterByStatus } from '~/components/common/filter/FilterBystatus';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const status = url.searchParams.get('status') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const [resourceList, orgUnitTree, applicationCategoriesKodeverk, source] = await Promise.all([
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
        fetchApplicationCategories(request),
        fetchResourceDataSource(request),
    ]);

    return json({
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        source,
        size,
    });
}

export default function ServiceAdminIndex() {
    const { resourceList, size, responseCode, applicationCategories, source } =
        useLoaderData<typeof loader>();

    const navigate = useNavigate();

    return (
        <VStack className={'content'} gap="4">
            <TableHeaderLayout
                title={'Ressursadministrasjon'}
                SearchComponent={<Search label={'Søk etter ressurs'} id={'search-service-admin'} />}
                FilterComponents={[
                    <FilterByStatus key={'filterstatus'} />,
                    <FilterByApplicationCategory
                        key={'filtercategory'}
                        applicationCategories={applicationCategories}
                    />,
                ]}
                CreateNewButton={
                    source === 'gui' ? (
                        <SecondaryAddNewLinkButton
                            label="Opprett ny ressurs"
                            handleOnClick={() =>
                                navigate(SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE)
                            }
                        />
                    ) : undefined
                }
            />
            <ResponseAlert
                responseCode={responseCode}
                successText={'Ressursen ble opprettet!'}
                deleteText={'Ressursen ble slettet!'}
            />
            <ServiceAdminTable resourcePage={resourceList} size={size} source={source} />
        </VStack>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
