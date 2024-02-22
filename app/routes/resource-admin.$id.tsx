import React from 'react';
import styles from "~/components/resource/resource.css"
import {Heading} from "@navikt/ds-react";
import {Outlet, useLoaderData, useRouteLoaderData} from "@remix-run/react";
import type {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfoBlock} from "~/components/resource-admin/ResourceInfoBlock";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {

    const [resource] = await Promise.all([
        fetchResourceById(request.headers.get("Authorization"), params.id),
    ]);
    return json({
        resource: await resource.json(),
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function ResourceById() {
    const data = useLoaderData<{
        resource: IResource,
    }>();

    return (
        <section className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge"
                     align={"center"}>{data.resource.resourceName}</Heading>
            <ResourceInfoBlock resource={data.resource}/>
            <Outlet/>
        </section>
    );
}