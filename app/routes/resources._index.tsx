import React from 'react';
import {Box, Chips, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import type {IResourcePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import OrgUnitFilterModal from "../components/org-unit-filter/OrgUnitFilterModal";
import styles from "../components/org-unit-filter/orgUnitFilter.css?url"

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
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

export default function Resource() {

    const data = useLoaderData<{
        resourceList: IResourcePage,
        orgUnitList: IUnitItem[]
    }>();

    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Ressurser</Heading>
                <Box className={"filters"} paddingBlock={"4 4"}>
                    <div>
                        <OrgUnitFilterModal orgUnitList={data.orgUnitList}/>
                    </div>
                    <div>
                        <ResourceSearch/>
                    </div>
                </Box>
            </div>
            <Box className={"filters"} paddingBlock={"1 8"}>
                {searchParams.get("orgUnits") && (
                    <Chips.Removable onClick={event => {
                        setSearchParams(searchParameter => {
                            searchParameter.delete("orgUnits")
                            return searchParameter
                        })
                    }}>Fjern orgenhetsfilter</Chips.Removable>
                )}
            </Box>
            <ResourceTable resourcePage={data.resourceList}/>
        </div>
    );
}