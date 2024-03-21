import React from 'react';
import styles from "~/components/resource/resource.css"
import {useLoaderData, useRouteLoaderData} from "@remix-run/react";
import type {IAssignedRoles} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {AssignedRolesTable} from "~/components/assignment/AssignedRolesTable";
import {AssignedRolesSearch} from "~/components/assignment/AssignedRolesSearch";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {Box, Heading} from "@navikt/ds-react";

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
        assignedRoles: await assignedRoles.json()
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function AssignedRoles() {
    const data = useLoaderData<{
        assignedRoles: IAssignedRoles,
    }>();

    return (
        <>
            <Box paddingBlock="16 16">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>
            <section className={"filters"}>
                <SelectObjectType/>
                <AssignedRolesSearch/>
            </section>
            <section>
                <AssignedRolesTable assignedRoles={data.assignedRoles}/>
            </section>

        </>
    );
}