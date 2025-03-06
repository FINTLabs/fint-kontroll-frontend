import { json } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { fetchAllOrgUnits, fetchResources } from '~/data/fetch-resources';
import { ResourceTable } from '~/components/resource/ResourceTable';
import { ResourceSearch } from '~/components/resource/ResourceSearch';
import styles from '../components/org-unit-filter/orgUnitFilter.css?url';
import { getSizeCookieFromRequestHeader } from '~/components/common/CommonFunctions';
import { ResourceSelectApplicationCategory } from '~/components/service-admin/ResourceSelectApplicationCategory';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { fetchApplicationCategories } from '~/data/fetch-kodeverk';
import { Alert, Box, Heading, VStack } from '@navikt/ds-react';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationCategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const [resourceList, orgUnitTree, applicationCategoriesKodeverk] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationCategory, accessType),
        fetchAllOrgUnits(request),
        fetchApplicationCategories(request),
    ]);

    return json({
        resourceList,
        size,
        orgUnitList: orgUnitTree.orgUnits,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
    });
}

export default function Resource() {
    const { resourceList, size, orgUnitList, applicationCategories } =
        useLoaderData<typeof loader>();

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Ressurser'}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<ResourceSearch />}
                FilterComponents={
                    <ResourceSelectApplicationCategory
                        applicationCategories={applicationCategories}
                    />
                }
                alertMessage={{
                    heading:
                        'En midlertidig feil kan føre til at ikke alle ressurser dukker opp i tabellen.',
                    text: ' Vi anbefaler å søke direkte etter ressursen i søkefeltet hvis du ikke finner den i tabellen. Vi jobber med å rette feilen.',
                    variant: 'warning',
                }}
            />
            <ResourceTable resourcePage={resourceList} size={size} />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
