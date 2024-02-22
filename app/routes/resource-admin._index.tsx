import React from 'react';
import {Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type {IResourcePage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResources} from "~/data/fetch-resources";
import {ResourceSearch} from "~/components/resource-admin/ResourceSearch";
import {ResourceTable} from "~/components/resource-admin/ResourceTable";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchResources(request.headers.get("Authorization"), size, page, search);
    return json(await response.json());
}

export default function ResourceAdminIndex() {

    const resourcePage = useLoaderData<IResourcePage>();

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Ressursadministrasjon</Heading>
                <Box className={"filters"} paddingBlock={"4 16"}>
                    <div>
                        <ResourceSearch/>
                    </div>
                </Box>
            </div>
            <ResourceTable resourcePage={resourcePage}/>
        </div>
    );
}