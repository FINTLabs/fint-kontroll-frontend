import React from 'react';
import styles from "~/components/resource/resource.css"
import {Box, Heading} from "@navikt/ds-react";
import {useLoaderData, useRouteLoaderData} from "@remix-run/react";
import type {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfoBlock} from "~/components/resource-admin/ResourceInfoBlock";
import {ResourceDetailTable} from "~/components/resource-admin/ResourceDetailTable";

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
        <Box className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge"
                     align={"center"}>{data.resource.resourceName}</Heading>
            <ResourceInfoBlock resource={data.resource}/>
            <section>
                <Box paddingBlock="16 16">
                    <Heading level="2" size="xlarge" align={"center"}>Tilgjengelig for følgende enheter</Heading>
                </Box>
                <ResourceDetailTable resource={data.resource}/>
            </section>
        </Box>
    );
}