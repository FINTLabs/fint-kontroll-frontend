import React from 'react';
import {Alert, Box, Heading} from "@navikt/ds-react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import type {IAssignedRoles, IRole, IRolePage, IUnitItem, IUnitTree} from "~/data/types";
import {AssignRoleTable} from "~/components/assignment/NewAssignmentRoleTable";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {fetchRoles} from "~/data/fetch-roles";
import {NewAssignmentRoleSearch} from "~/components/assignment/NewAssignmentRoleSearch";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {BASE_PATH} from "../../environment";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseRoles, responseOrgUnits, responseAssignments] = await Promise.all([
        fetchRoles(request.headers.get("Authorization"), size, page, search, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchAssignedRoles(request.headers.get("Authorization"), params.id, "1000", "0", "", orgUnits)
    ]);
    const roleList: IRolePage = await responseRoles.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
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
        orgUnitList,
        assignedRolesList,
        isAssignedRoles,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function NewAssignmentForRole() {

    const data = useLoaderData<{
        roleList: IRolePage,
        orgUnitList: IUnitItem[]
        assignedRolesList: IAssignedRoles,
        isAssignedRoles: IRole[],
        basePath: string
    }>();

    const params = useParams<string>()

    return (
        <div className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge">Ny tildeling</Heading>
            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    <NewAssignmentRoleSearch/>
                </section>
            </section>
            <AssignRoleTable isAssignedRoles={data.isAssignedRoles}
                             resourceId={params.id}
                             rolesId={params.id}
                             currentPage={data.roleList.currentPage}
                             totalPages={data.roleList.totalPages}
                             basePath={data.basePath}
            />
        </div>
    );
}
export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
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