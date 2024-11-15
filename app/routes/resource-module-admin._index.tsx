import React from 'react';
import {Alert, Box, Button, Heading, HStack, Link, VStack} from "@navikt/ds-react";
import {Links, Meta, Scripts, useLoaderData, useNavigate, useRouteError} from "@remix-run/react";
import ResourceModuleAdminUsersTable from "../components/resource-module-admin/ResourceModuleAdminUsersTable";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchUsersWithAssignment} from "~/data/resourceModuleAdmin/resource-module-admin";
import styles from "../components/resource-module-admin/resourceModuleAdmin.css?url";
import {IUnitItem} from "~/data/types";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {
    IResourceModuleAccessRole,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {PlusIcon} from "@navikt/aksel-icons";
import {TableHeaderLayout} from "~/components/common/Table/TableHeaderLayout";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import ChipsFilters from "~/components/common/ChipsFilters";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const auth = request
    const size = Number(url.searchParams.get("size") ?? "10");
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgunits: string[] = url.searchParams.get("orgUnits")?.split(",") ?? [""];
    const name = url.searchParams.get("search") ?? "";
    const role = url.searchParams.get("accessroleid") ?? "";

    const responseUsersPage = await fetchUsersWithAssignment(auth, page, size, orgunits, name, role);
    const responseRoles = await fetchAccessRoles(auth)
    const responseOrgUnits = await fetchOrgUnits(auth)

    const usersPage = await responseUsersPage.json()
    const roles = await responseRoles.json()
    const orgUnitPage = await responseOrgUnits.json()

    return json({
        usersPage,
        roles,
        orgUnitPage
    })
}


export default function ResourceModuleAdminIndex() {
    const data = useLoaderData<typeof loader>()
    const usersPage = data.usersPage as IResourceModuleUsersPage
    const roles = data.roles as IResourceModuleAccessRole[]
    const orgUnitList = data.orgUnitPage.orgUnits as IUnitItem[]
    const navigate = useNavigate()

    return (
        <VStack className={"content"} gap="4">
            <TableHeaderLayout
                title={"Administrer brukere med rolletilknytning"}
                OrgUnitFilterButton={<OrgUnitFilterModal orgUnitList={orgUnitList}/>}
                FilterComponents={<ResourceModuleRoleFilter roles={roles}/>}
                SearchComponent={<ResourceModuleSearch/>}
                ChipsFilters={<ChipsFilters/>}
                CreateNewButton={
                    <Button
                        role="link"
                        as="a"
                        id="create-assignment"
                        className={"no-underline-button"}
                        variant={"secondary"}
                        iconPosition="right" icon={<PlusIcon aria-hidden/>}
                        onClick={() => navigate("opprett-ny-tildeling")}>
                        Opprett ny tildeling
                    </Button>
                }
            />
            <ResourceModuleAdminUsersTable usersPage={usersPage} orgUnitList={orgUnitList} roles={roles}/>
        </VStack>
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