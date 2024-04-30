//import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Links, Meta, Scripts, useLoaderData, useRouteError, useRouteLoaderData} from "@remix-run/react";
import {IAssignedRoles} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {AssignedRolesTable} from "~/components/assignment/AssignedRolesTable";
import {AssignedRolesSearch} from "~/components/assignment/AssignedRolesSearch";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {Alert, Box, Heading} from "@navikt/ds-react";
import {BASE_PATH} from "../../environment";
import React from "react";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [assignedRoles] = await Promise.all([

        fetchAssignedRoles(request.headers.get("Authorization"), params.id, size, page, search, orgUnits),

    ]);
    return json({
        assignedRoles: await assignedRoles.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function AssignedRoles() {
    const data = useLoaderData<{
        assignedRoles: IAssignedRoles,
        basePath: string
    }>();

    return (
        <>
            <Box paddingBlock="16 16">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>
            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    <AssignedRolesSearch/>
                </section>
            </section>
            <section>
                <AssignedRolesTable assignedRoles={data.assignedRoles} basePath={data.basePath}/>
            </section>
        </>
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