import React from 'react';
import {Alert, Box, Button, Heading, VStack} from "@navikt/ds-react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import type {IAssignedRoles, IRole, IRolePage, IUnitItem, IUnitTree} from "~/data/types";
import {AssignRoleTable} from "~/components/assignment/NewAssignmentRoleTable";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {fetchRoles} from "~/data/fetch-roles";
import {NewAssignmentRoleSearch} from "~/components/assignment/NewAssignmentRoleSearch";
import {fetchOrgUnits, fetchResourceById} from "~/data/fetch-resources";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {BASE_PATH} from "../../environment";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import {IResource} from "~/data/types";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseRoles, responseOrgUnits, responseAssignments, responseResource] = await Promise.all([
        fetchRoles(request, size, page, search, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchAssignedRoles(request.headers.get("Authorization"), params.id, "1000", "0", "", orgUnits),
        fetchResourceById(request.headers.get("Authorization"), params.id),

    ]);
    const roleList: IRolePage = await responseRoles.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedRolesList: IAssignedRoles = await responseAssignments.json()
    const resource: IResource = await responseResource.json()


    const assignedRolesMap: Map<number, IRole> = new Map(assignedRolesList.roles.map(role => [role.id, role]))
    const isAssignedRoles: IRole[] = roleList.roles.map(role => {

        return {
            ...role,
            "assigned": assignedRolesMap.has(role.id)
        }
    })

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resource,
        roleList,
        orgUnitList,
        assignedRolesList,
        isAssignedRoles,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

// @ts-ignore
const generateBreadcrumbs = (params, data) => {
    return (
        <>
            <span>
                <Link to={`/resources/${params.id}`}>Ressurser</Link>
            </span>
            {" > "}
            <span>
                <Link to={`/resources/${params.id}/user-assignments`}>Ressursinfo</Link>
            </span>
            {" > "}
            <span>
                <Link to={`/assignment/resource/${params.id}/role`}>Tildeling</Link>
            </span>
        </>
    );
};

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data }) => generateBreadcrumbs(params, data),
}

export default function NewAssignmentForRole() {

    const data = useLoaderData<{
        roleList: IRolePage,
        orgUnitList: IUnitItem[]
        assignedRolesList: IAssignedRoles,
        isAssignedRoles: IRole[],
        basePath: string,
        responseCode: string | undefined,
        resource: IResource
    }>();
    const params = useParams<string>()

    return (
        <>
            <div className={"content"}>
                <VStack className={"heading"} >
                    <Heading level="1" size="xlarge">Ny tildeling </Heading>
                    <Heading level="2" size="small">{data.resource.resourceName}</Heading>
                </VStack>
                <section className={"toolbar"}>
                    <SelectObjectType/>
                    <section className={"filters"}>
                        <NewAssignmentRoleSearch/>
                    </section>
                </section>
                <Box paddingBlock='8 0'>
                    <ResponseAlert responseCode={data.responseCode}/>
                </Box>
                <AssignRoleTable isAssignedRoles={data.isAssignedRoles}
                                 resourceId={params.id}
                                 rolesId={params.id}
                                 currentPage={data.roleList.currentPage}
                                 totalPages={data.roleList.totalPages}
                                 basePath={data.basePath}
                />
            </div>
        </>
    );
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

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen var vellykket!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}