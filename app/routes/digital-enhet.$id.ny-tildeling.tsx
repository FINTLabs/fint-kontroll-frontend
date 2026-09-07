import { Link, LoaderFunctionArgs, useLoaderData, useRouteError } from 'react-router';
import { fetchAllOrgUnits, fetchResources } from '~/data/fetch-resources';
import { BASE_PATH } from '../../environment';
import { HStack, VStack } from '@navikt/ds-react';
import React from 'react';
import { ResourceSearch } from '~/components/resource/ResourceSearch';
import { FilterByApplicationCategory } from '~/components/common/filter/FilterByApplicationCategory';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { DEVICES, getDeviceGroupByIdUrl, getDeviceGroupNewAssignmentUrl } from '~/data/paths';
import { IResourceAssignment, IResourceForList } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { fetchApplicationCategories } from '~/data/fetch-kodeverk';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';
import { fetchAssignedResourcesDeviceGroups, fetchDeviceGroupById } from '~/data/fetch-devices';
import { AssignResourceToDeviceTable } from '~/components/device/AssignResourceToDeviceTable';
import { ResponseAlert } from '~/components/common/ResponseAlert';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const deviceGroup = await fetchDeviceGroupById(request, params.id);
    const resourceList = await fetchResources(
        request,
        size,
        page,
        search,
        orgUnits,
        applicationcategory,
        accessType
    );

    const filter = resourceList.resources.map((value) => `&resourcefilter=${value.id}`).join('');

    const [orgUnitTree, assignedResourceList, applicationCategoriesKodeverk] = await Promise.all([
        fetchAllOrgUnits(request),
        fetchAssignedResourcesDeviceGroups(request, params.id, size, '0', 'ALLTYPES', filter),
        fetchApplicationCategories(request),
    ]);

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(
        assignedResourceList.resources.map((resource) => [resource.id, resource])
    );
    const isAssignedResources: IResourceForList[] = resourceList.resources.map((resource) => {
        return {
            ...resource,
            assigned: assignedResourcesMap.has(resource.id),
        };
    });

    return {
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        correlationId: url.searchParams.get('correlationId') ?? '',
        size,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        assignedResourceList,
        isAssignedResources,
        deviceGroup,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={DEVICES} className={'breadcrumb-link'}>
                    Maskingrupper
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getDeviceGroupByIdUrl(params.id)} className={'breadcrumb-link'}>
                    info
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getDeviceGroupNewAssignmentUrl(params.id)} className={'breadcrumb-link'}>
                    Ny tildeling
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function NewAssignmentForDevice() {
    const {
        resourceList,
        isAssignedResources,
        responseCode,
        deviceGroup,
        size,
        applicationCategories,
        correlationId,
        basePath,
    } = useLoaderData<typeof loader>();

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Ny tildeling'}
                subTitle={deviceGroup.name}
                FilterComponents={
                    <FilterByApplicationCategory applicationCategories={applicationCategories} />
                }
                SearchComponent={<ResourceSearch />}
            />
            <VStack gap="space-12">
                <ResponseAlert
                    responseCode={responseCode}
                    correlationId={correlationId}
                    basepath={basePath}
                    successText={'Tildelingen var vellykket!'}
                    deleteText={'Tildelingen ble slettet!'}
                />

                <AssignResourceToDeviceTable
                    isAssignedResources={isAssignedResources}
                    size={size}
                    deviceGroupId={deviceGroup.id}
                    currentPage={resourceList.currentPage}
                    totalPages={resourceList.totalPages}
                    orgId={deviceGroup.orgUnitId}
                    totalItems={resourceList.totalItems}
                />
            </VStack>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
