import React from 'react';
import styles from "../components/resource/resource.css?url"
import {useLoaderData, useRouteLoaderData} from "@remix-run/react";
import {IAssignedUsers} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {AssignedUsersTable} from "~/components/assignment/AssignedUsersTable";
import {Box, Heading} from "@navikt/ds-react";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {AssignedUsersSearch} from "~/components/assignment/AssignedUsersSearch";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];

    const [assignedUsers] = await Promise.all([

        fetchAssignedUsers(request.headers.get("Authorization"), params.id, size, page, search, userType, orgUnits)

    ]);
    return json({
        assignedUsers: await assignedUsers.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function AssignedUsers() {
    const data = useLoaderData<{
        assignedUsers: IAssignedUsers,
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
                    <UserTypeFilter/>
                    <AssignedUsersSearch/>
                </section>
            </section>
            <section className={"grid-main"}>
                <AssignedUsersTable assignedUsers={data.assignedUsers} basePath={data.basePath}/>
            </section>
        </>
    );
}