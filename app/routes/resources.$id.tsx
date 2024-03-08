import React from 'react';
import styles from "~/components/resource/resource.css"
import {Box, Heading, LinkPanel} from "@navikt/ds-react";
import {Outlet, useLoaderData, useRouteLoaderData} from "@remix-run/react";
import type {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfo} from "~/components/resource/ResourceInfo";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {

    // const url = new URL(request.url);
    // const size = url.searchParams.get("size") ?? "10";
    // const page = url.searchParams.get("page") ?? "0"

    const [resource/*, assignedUsers, assignedRoles*/] = await Promise.all([
        fetchResourceById(request.headers.get("Authorization"), params.id),
        //  fetchAssignedUsers(request.headers.get("Authorization"), params.id, size, page),
        // fetchAssignedRoles(request.headers.get("Authorization"), params.id, size, pageRole)
    ]);
    return json({
        resource: await resource.json(),
        // assignedUsers: await assignedUsers.json(),
        // assignedRoles: await assignedRoles.json()
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function ResourceById() {
    const data = useLoaderData<{
        resource: IResource,
        //  assignedUsers: IAssignedUsers,
        // assignedRoles: IAssignedRoles
    }>();

    return (
        <section className={"content"}>
            <Box className={"filters"}>
                <LinkPanel href={`/assignment/resource/${data.resource.id}/user`} border>
                    <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                </LinkPanel>
            </Box>
            <Heading className={"heading"} level="1" size="xlarge"
                     align={"center"}>{data.resource.resourceName}</Heading>

            <ResourceInfo resource={data.resource}/>
            <Outlet/>
        </section>
    );
}