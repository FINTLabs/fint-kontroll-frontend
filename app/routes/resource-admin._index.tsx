import React from 'react';
import {Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type {IResourcePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceSearch} from "~/components/resource-admin/ResourceSearch";
import {ResourceTable} from "~/components/resource-admin/ResourceTable";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseResource, responseOrgUnits] = await Promise.all([
        fetchResources(request.headers.get("Authorization"), size, page, search, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization"))
    ]);
    const resourceList: IResourcePage = await responseResource.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits

    return json({
        resourceList,
        orgUnitList
    })
}

export default function ResourceAdminIndex() {

    const data = useLoaderData<{
        resourceList: IResourcePage,
        orgUnitList: IUnitItem[]
    }>();

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
            <ResourceTable resourcePage={data.resourceList}/>
        </div>
    );
}