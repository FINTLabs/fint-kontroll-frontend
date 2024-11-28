import React from 'react';
import {Alert, Box, Tabs} from "@navikt/ds-react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json, TypedResponse} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import type {BreadcrumbParams, IAssignedRoles, IRole, IRoleList} from "~/data/types";
import {AssignRoleTable} from "~/components/assignment/NewAssignmentRoleTable";
import {fetchRoles} from "~/data/fetch-roles";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {BASE_PATH} from "../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {RoleSearch} from "~/components/role/RoleSearch";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";

type LoaderData = {
    roleList: IRoleList,
    isAssignedRoles: IRole[],
    basePath: string,
}

export async function loader({params, request}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>>  {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseRoles, responseAssignments] = await Promise.all([
        fetchRoles(request, size, page, search, orgUnits),
        fetchAssignedRoles(request, params.id, "1000", "0", "", orgUnits)
    ]);
    const roleList: IRoleList = await responseRoles.json()
    const assignedRolesList: IAssignedRoles = await responseAssignments.json()

    const assignedRolesMap: Map<number, IRole> = new Map(assignedRolesList.roles.map(role => [role.id, role]))
    const isAssignedRoles: IRole[] = roleList.roles.map(role => {

        return {
            ...role,
            "assigned": assignedRolesMap.has(role.id)
        }
    })

    return json({
        roleList,
        isAssignedRoles,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function NewAssignmentForRole() {
    const {isAssignedRoles, roleList, basePath} = useLoaderData<LoaderData>();
    const params = useParams<string>()

    return (
        <Tabs.Panel value="role">
            <TableToolbar
                SearchComponent={<RoleSearch/>}
            />
            <AssignRoleTable
                isAssignedRoles={isAssignedRoles}
                resourceId={params.id}
                currentPage={roleList.currentPage}
                totalPages={roleList.totalPages}
                basePath={basePath}
                size={roleList.totalItems}
            />
        </Tabs.Panel>
    );
}

export const handle = {
    breadcrumb: ({params}: BreadcrumbParams) =>
        <Link to={`/assignment/resource/${params.id}/role`} className={"breadcrumb-link"}>Gruppetildeling</Link>
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}