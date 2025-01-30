//import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Link, useLoaderData, useRouteError, useRouteLoaderData} from "@remix-run/react";
import {IAssignedRoles} from "~/data/types/userTypes";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {AssignedRolesTable} from "~/components/assignment/AssignedRolesTable";
import {Alert, Box, Tabs, VStack} from "@navikt/ds-react";
import {BASE_PATH} from "../../environment";
import React from "react";
import {fetchResourceById} from "~/data/fetch-resources";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {RoleSearch} from "~/components/role/RoleSearch";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";
import {fetchUserTypes} from "~/data/fetch-kodeverk";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [assignedRoles, resource, userTypesKodeverk] = await Promise.all([
        fetchAssignedRoles(request, params.id, size, page, search, orgUnits),
        fetchResourceById(request, params.id),
        fetchUserTypes(request)
    ])

    return json({
        assignedRoles: await assignedRoles.json(),
        resourceName: resource.resourceName,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        userTypesKodeverk
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => {
        return <Link to={`/resources/${params.id}/role-assignments`} className={"breadcrumb-link"}>Ressursinfo</Link>
    }
}

export default function AssignedRoles() {
    const data = useLoaderData<{
        assignedRoles: IAssignedRoles,
        basePath: string,
        responseCode: string | undefined
    }>();

    return (
        <Tabs.Panel value="gruppe-tildelinger">
            <VStack gap="4">
                <TableToolbar
                    SearchComponent={<RoleSearch/>}
                />
                <ResponseAlert responseCode={data.responseCode} successText={"Tildelingen var vellykket!"}
                               deleteText={"Tildelingen ble slettet!"}/>
                <AssignedRolesTable assignedRoles={data.assignedRoles} basePath={data.basePath}/>
            </VStack>
        </Tabs.Panel>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
     console.error(error, "Her er error i grppe-tildelinger");
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
}