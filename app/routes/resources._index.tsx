import React from 'react';
import {Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type {IResourcePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import styles from "~/components/org-unit-filter/orgUnitFilter.css"

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    console.log(orgUnits)
    const [responseResource, responseOrgUnits] = await Promise.all([
        fetchResources(request.headers.get("Authorization"), size, page, search, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization"))
    ]);
    const resourceList: IResourcePage = await responseResource.json()
    console.log(resourceList)
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits

    return json({
        resourceList,
        orgUnitList
    })
}

export default function Resource() {

    const data = useLoaderData<{
        resourceList: IResourcePage,
        orgUnitList: IUnitItem[]
    }>();
    console.log(data.resourceList)

    return (
        <div className={"content"}>

            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Ressurser</Heading>
                <Box className={"filters"} paddingBlock={"4 16"}>
                    <div>
                        <OrgUnitFilterModal orgUnitList={data.orgUnitList}/>
                    </div>
                    <div>
                        <ResourceSearch/>
                    </div>
                </Box>
            </div>
            <ResourceTable resourcePage={data.resourceList}/>
        </div>
    );
}