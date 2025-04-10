import { Link, useLoaderData, useRouteError } from '@remix-run/react';
import { IRole } from '~/data/types/userTypes';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchAllOrgUnits, fetchResources } from '~/data/fetch-resources';
import { json, TypedResponse } from '@remix-run/node';
import { BASE_PATH } from '../../environment';
import { HStack, VStack } from '@navikt/ds-react';
import { fetchAssignedResourcesRole, fetchRoleById } from '~/data/fetch-roles';
import React from 'react';
import { AssignResourceToRoleTable } from '~/components/role/AssignResourceToRoleTable';
import { ResourceSearch } from '~/components/resource/ResourceSearch';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { FilterByApplicationCategory } from '~/components/common/filter/FilterByApplicationCategory';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { getRoleMembersUrl, getRoleNewAssignmentUrl, ROLES } from '~/data/paths';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import {
    IAssignedResourcesList,
    IResourceAssignment,
    IResourceForList,
    IResourceList,
} from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { fetchApplicationCategories } from '~/data/fetch-kodeverk';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ params, request }: LoaderFunctionArgs): Promise<
    TypedResponse<{
        responseCode: string | undefined;
        size: string;
        resourceList: IResourceList;
        orgUnitList: IUnitItem[];
        assignedResourceList: IAssignedResourcesList;
        isAssignedResources: any;
        role: IRole;
        applicationCategories: string[];
        basePath: string;
    }>
> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const role = await fetchRoleById(request, params.id);
    const resourceList = await fetchResources(
        request,
        size,
        page,
        search,
        orgUnits,
        applicationcategory,
        accessType,
        role.roleType
    );

    const filter = resourceList.resources.map((value) => `&resourcefilter=${value.id}`).join('');

    const [orgUnitTree, assignedResourceList, applicationCategoriesKodeverk] = await Promise.all([
        fetchAllOrgUnits(request),
        fetchAssignedResourcesRole(request, params.id, size, '0', 'ALLTYPES', filter),
        fetchApplicationCategories(request),
    ]);

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(
        assignedResourceList.resources.map((resource) => [resource.resourceRef, resource])
    );
    const isAssignedResources: IResourceForList[] = resourceList.resources.map((resource) => {
        return {
            ...resource,
            assigned: assignedResourcesMap.has(resource.id),
        };
    });

    return json({
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        size,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        assignedResourceList,
        isAssignedResources,
        role,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={ROLES} className={'breadcrumb-link'}>
                    Grupper
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getRoleMembersUrl(params.id)} className={'breadcrumb-link'}>
                    Gruppeinfo
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getRoleNewAssignmentUrl(params.id)} className={'breadcrumb-link'}>
                    Ny tildeling
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function NewAssignmentForRole() {
    const { resourceList, isAssignedResources, responseCode, role, size, applicationCategories } =
        useLoaderData<typeof loader>();

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Ny tildeling'}
                subTitle={role.roleName}
                FilterComponents={
                    <FilterByApplicationCategory applicationCategories={applicationCategories} />
                }
                SearchComponent={<ResourceSearch />}
            />
            <VStack gap="4">
                <ResponseAlert
                    responseCode={responseCode}
                    successText={'Tildelingen var vellykket!'}
                    deleteText={'Tildelingen ble slettet!'}
                />

                <AssignResourceToRoleTable
                    isAssignedResources={isAssignedResources}
                    size={size}
                    roleId={role.id}
                    currentPage={resourceList.currentPage}
                    totalPages={resourceList.totalPages}
                    orgId={role.organisationUnitId}
                />
            </VStack>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
