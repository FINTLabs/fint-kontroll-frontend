import React from 'react';
import styles from "~/components/resource/resource.css"
import {useLoaderData, useRouteLoaderData} from "@remix-run/react";
import type {IAssignedUsers} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {AssignedUsersTable} from "~/components/assignment/AssignedUsersTable";
import {Box, Heading} from "@navikt/ds-react";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {AssignedUsersSearch} from "~/components/assignment/AssignedUsersSearch";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];

    const [assignedUsers] = await Promise.all([

        fetchAssignedUsers(request.headers.get("Authorization"), params.id, size, page, search, orgUnits)

    ]);
    return json({
        assignedUsers: await assignedUsers.json()
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function AssignedUsers() {
    const data = useLoaderData<{
        assignedUsers: IAssignedUsers,
    }>();

    return (
        <>
            <Box paddingBlock="16 16">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>
            <section className={"filters"}>
                <SelectObjectType/>
                <AssignedUsersSearch/>
            </section>
            <section className={"grid-main"}>
                <AssignedUsersTable assignedUsers={data.assignedUsers}/>
            </section>
        </>
    );
}