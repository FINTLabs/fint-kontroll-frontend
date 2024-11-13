//import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError, useRouteLoaderData} from "@remix-run/react";
import {IAssignedRoles, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {AssignedRolesTable} from "~/components/assignment/AssignedRolesTable";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {BASE_PATH} from "../../environment";
import React from "react";
import {fetchResourceById} from "~/data/fetch-resources";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import ChipsFilters from "~/components/common/ChipsFilters";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {RoleSearch} from "~/components/role/RoleSearch";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [assignedRoles, resourceById] = await Promise.all([
        fetchAssignedRoles(request, params.id, size, page, search, orgUnits),
        fetchResourceById(request, params.id),
    ])

    const resource: IResource = await resourceById.json()
    return json({
        assignedRoles: await assignedRoles.json(),
        resourceName: resource.resourceName,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
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
        <VStack gap="4">
            <Heading className={"heading"} level="2" size="xlarge" align={"center"}>Tildelinger</Heading>

            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    {/*<AssignedRolesSearch/>*/}
                    <RoleSearch/>
                </section>
            </section>

            <ResponseAlert responseCode={data.responseCode} successText={"Tildelingen var vellykket!"}
                           deleteText={"Tildelingen ble slettet!"}/>

            <HStack justify="end">
                <ChipsFilters/>
            </HStack>

            <AssignedRolesTable assignedRoles={data.assignedRoles} basePath={data.basePath}/>
        </VStack>
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