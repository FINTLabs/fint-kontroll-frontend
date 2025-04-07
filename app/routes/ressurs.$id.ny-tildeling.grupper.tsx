import { Tabs } from '@navikt/ds-react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { json, TypedResponse } from '@remix-run/node';
import { Link, useLoaderData, useParams, useRouteError } from '@remix-run/react';
import { IAssignedRoles, IRole, IRoleList } from '~/data/types/userTypes';
import { AssignRoleTable } from '~/components/assignment/NewAssignmentRoleTable';
import { fetchRoles } from '~/data/fetch-roles';
import { fetchAssignedRoles } from '~/data/fetch-assignments';
import { BASE_PATH } from '../../environment';
import { RoleSearch } from '~/components/role/RoleSearch';
import { TableToolbar } from '~/components/common/Table/Header/TableToolbar';
import { fetchResourceById } from '~/data/fetch-resources';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { BreadcrumbParams } from '~/data/types/generalTypes';
import { IKodeverkUserType } from '~/data/types/kodeverkTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

type LoaderData = {
    roleList: IRoleList;
    isAssignedRoles: IRole[];
    basePath: string;
    userTypesKodeverk: IKodeverkUserType[];
};

export async function loader({
    params,
    request,
}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const resource = await fetchResourceById(request, params.id);

    const roleList = await fetchRoles(
        request,
        size,
        page,
        search,
        orgUnits,
        resource.validForRoles
    );

    let filter = '';
    roleList.roles.forEach((value) => {
        filter += `&rolefilter=${value.id}`;
    });

    const [assignedRolesList, userTypesKodeverk] = await Promise.all([
        fetchAssignedRoles(request, params.id, size, '0', '', orgUnits, filter),
        fetchUserTypes(request),
    ]);

    const assignedRolesMap: Map<number, IRole> = new Map(
        assignedRolesList.roles.map((role) => [role.id, role])
    );
    const isAssignedRoles: IRole[] = roleList.roles.map((role) => {
        return {
            ...role,
            assigned: assignedRolesMap.has(role.id),
        };
    });

    return json({
        roleList,
        isAssignedRoles,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        userTypesKodeverk,
    });
}

export default function NewAssignmentForRole() {
    const { isAssignedRoles, roleList } = useLoaderData<LoaderData>();
    const params = useParams<string>();

    return (
        <Tabs.Panel value="grupper">
            <TableToolbar SearchComponent={<RoleSearch />} />
            <AssignRoleTable
                isAssignedRoles={isAssignedRoles}
                resourceId={params.id}
                currentPage={roleList.currentPage}
                totalPages={roleList.totalPages}
                size={roleList.totalItems}
            />
        </Tabs.Panel>
    );
}

export const handle = {
    breadcrumb: ({ params }: BreadcrumbParams) => (
        <Link to={`/assignment/resource/${params.id}/role`} className={'breadcrumb-link'}>
            Gruppetildeling
        </Link>
    ),
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
