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
import { postMyAccessRequest } from '~/data/fetch-me-info';

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

    const [resourceList, orgUnitTree, applicationCategoriesKodeverk, access] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationCategory, accessType),
        fetchAllOrgUnits(request),
        fetchApplicationCategories(request),
        postMyAccessRequest(request, [
            { url: '/api/resources/123', method: 'GET' },
            { url: '/api/assignments/v2/resource/123/users', method: 'GET' },
            { url: '/api/assignments/resource/123/roles?', method: 'GET' },
        ]),
    ]);

    return json({
        resourceList,
        size,
        orgUnitList: orgUnitTree.orgUnits,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        hasAccessToResourceDetails: access.every((a) => a.access),
    });
}

export default function Resource() {
    const { resourceList, size, orgUnitList, applicationCategories, hasAccessToResourceDetails } =
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
            />
            <ResourceTable
                resourcePage={resourceList}
                size={size}
                hasAccessToResourceDetails={hasAccessToResourceDetails}
            />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
