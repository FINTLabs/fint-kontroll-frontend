import React from 'react';
import {Alert, Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IRoleList, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoles} from "~/data/fetch-roles";
import {RoleTable} from "~/components/role/RoleTable";
import {RoleSearch} from "~/components/role/RoleSearch";
import {fetchOrgUnits} from "~/data/fetch-resources";
import OrgUnitFilterModal from "../components/org-unit-filter/OrgUnitFilterModal";
import ChipsFilters from "~/components/common/ChipsFilters";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {TableHeaderLayout} from "~/components/common/Table/TableHeaderLayout";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseRoles, responseOrgUnits] = await Promise.all([
        fetchRoles(request, size, page, search, orgUnits),
        fetchOrgUnits(request)
    ]);
    const roleList: IRoleList = await responseRoles.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits

    return json({
        roleList,
        orgUnitList,
        size
    })
}

export default function Roles_index() {
    const data = useLoaderData<typeof loader>()

    const roleList: IRoleList = data.roleList
    const orgUnitList: IUnitItem[] = data.orgUnitList
    const size = data.size

    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Grupper"}
                OrgUnitFilterButton={<OrgUnitFilterModal orgUnitList={orgUnitList}/>}
                SearchComponent={<RoleSearch/>}
                ChipsFilters={<ChipsFilters/>}
            />
            <RoleTable rolePage={roleList} size={size}/>
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