import React from 'react';
import {UserTable} from "~/components/user/UserTable";
import {UserSearch} from "~/components/user/UserSearch";
import {Box, Chips, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import {fetchUsers} from "~/data/fetch-users";
import {IUnitItem, IUnitTree, IUserPage} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseOrgUnits] = await Promise.all([
        fetchUsers(request.headers.get("Authorization"), size, page, search, userType, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization"))
    ]);
    const userList: IUserPage = await responseUsers.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits

    return json({
        userList,
        orgUnitList
    })
}

export default function UsersIndex() {
    const data = useLoaderData<{
        userList: IUserPage,
        orgUnitList: IUnitItem[]
    }>();
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Brukere</Heading>
                <Box className={"filters"} paddingBlock={"4 4"}>
                    <OrgUnitFilterModal orgUnitList={data.orgUnitList}/>
                    <UserTypeFilter/>
                    <UserSearch/>
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
            <UserTable userPage={data.userList} size={"10"}/>
        </div>
    );
}