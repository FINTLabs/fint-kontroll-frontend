import React from 'react';
import {Alert, Box, Heading} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError, useSearchParams} from "@remix-run/react";
import type {IRolePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoles} from "~/data/fetch-roles";
import {RoleTable} from "~/components/role/RoleTable";
import {RoleSearch} from "~/components/role/RoleSearch";
import {fetchOrgUnits} from "~/data/fetch-resources";
import OrgUnitFilterModal from "../components/org-unit-filter/OrgUnitFilterModal";
import ChipsFilters from "~/components/common/ChipsFilters";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "25";
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
        orgUnitList,
        size
    })
}

export default function Roles_index() {
    const data = useLoaderData<typeof loader>()

    const roleList: IRolePage = data.roleList
    const orgUnitList: IUnitItem[] = data.orgUnitList
    const size = data.size

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Grupper</Heading>
                <Box className={"filters"} paddingBlock={"4 4"}>
                    <div>
                        <OrgUnitFilterModal orgUnitList={orgUnitList} />
                    </div>
                    <div>
                        <RoleSearch />
                    </div>
                </Box>
            </div>

            <Box className={"filters"} paddingBlock={"1 8"}>
                <ChipsFilters />
            </Box>

            <RoleTable rolePage={roleList} size={size} />
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