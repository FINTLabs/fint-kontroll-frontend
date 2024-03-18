import React from 'react';
import {Box, Chips, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import type {IRolePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoles} from "~/data/fetch-roles";
import {RoleTable} from "~/components/role/RoleTable";
import {RoleSearch} from "~/components/role/RoleSearch";
import {fetchOrgUnits} from "~/data/fetch-resources";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseRoles, responseOrgUnits] = await Promise.all([
        fetchRoles(request.headers.get("Authorization"), size, page, search, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization"))
    ]);
    const roleList: IRolePage = await responseRoles.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits

    return json({
        roleList,
        orgUnitList
    })
}

export default function Roles_index() {
    const data = useLoaderData<{
        roleList: IRolePage,
        orgUnitList: IUnitItem[]
    }>();
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Grupper</Heading>
                <Box className={"filters"} paddingBlock={"4 4"}>
                    <div>
                        <OrgUnitFilterModal orgUnitList={data.orgUnitList}/>
                    </div>
                    <div>
                        <RoleSearch/>
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
            <RoleTable rolePage={data.roleList}/>
        </div>
    );
}