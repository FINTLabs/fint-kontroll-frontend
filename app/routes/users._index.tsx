import React from 'react';
import {UserTable} from "~/components/user/UserTable";
import {UserSearch} from "~/components/user/UserSearch";
import {Alert, Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError, useSearchParams} from "@remix-run/react";
import {fetchUsers} from "~/data/fetch-users";
import {IUnitItem, IUnitTree, IUserPage} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import OrgUnitFilterModal from "../components/org-unit-filter/OrgUnitFilterModal";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import ChipsFilters from "~/components/common/ChipsFilters";

export async function loader({request}: LoaderFunctionArgs) {
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

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data }) => <Link to={`/users`}>Brukere</Link>
}

export default function UsersIndex() {
    const data = useLoaderData<{
        userList: IUserPage,
        orgUnitList: IUnitItem[]
    }>();
    const [searchParams,] = useSearchParams()
    const size = searchParams.get("size") ?? "10"

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Brukere</Heading>
                <Box className={"filters"} paddingBlock={"4 4"}>
                    <OrgUnitFilterModal orgUnitList={data.orgUnitList}/>
                    <UserTypeFilter />
                    <UserSearch />
                </Box>
            </div>
            <Box className={"filters"} paddingBlock={"1 8"}>
                <ChipsFilters />
            </Box>
            <UserTable userPage={data.userList} size={size}/>
        </div>
    );
}
export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}