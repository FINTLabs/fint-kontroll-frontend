import React from 'react';
import {Alert, Box, Button, VStack} from "@navikt/ds-react";
import {Links, Meta, Scripts, useLoaderData, useNavigate, useRouteError} from "@remix-run/react";
import ResourceModuleAdminUsersTable from "../components/resource-module-admin/ResourceModuleAdminUsersTable";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json, TypedResponse} from "@remix-run/node";
import {fetchUsersWithAssignment} from "~/data/resourceAdmin/resource-admin";
import styles from "../components/resource-module-admin/resourceModuleAdmin.css?url";
import {IUnitItem} from "~/data/types";
import {fetchAllOrgUnits} from "~/data/fetch-resources";
import {
    IResourceModuleAccessRole,
    IResourceModuleUsersPage
} from "~/data/resourceAdmin/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {PlusIcon} from "@navikt/aksel-icons";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import AllAccessRolesFilter from "~/components/resource-module-admin/AllAccessRolesFilter";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

type LoaderData = {
    usersPage: IResourceModuleUsersPage
    roles: IResourceModuleAccessRole[]
    orgUnitPage: { orgUnits: IUnitItem[] }
    size: number
}

export async function loader({request}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
    const url = new URL(request.url);
    const auth = request
    const size = Number(getSizeCookieFromRequestHeader(request)?.value) ?? 25
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgunits: string[] = url.searchParams.get("orgUnits")?.split(",") ?? [""];
    const name = url.searchParams.get("search") ?? "";
    const role = url.searchParams.get("accessroleid") ?? "";

    const [responseUsersPage, responseRoles, orgUnitPage] = await Promise.all([
        fetchUsersWithAssignment(auth, page, size, orgunits, name, role),
        fetchAccessRoles(auth),
        fetchAllOrgUnits(auth)
    ]);

    const usersPage = await responseUsersPage.json()
    const roles = await responseRoles.json()

    return json({
        usersPage,
        roles,
        orgUnitPage,
        size
    })
}

export default function ResourceAdminIndex() {
    const {usersPage, roles, orgUnitPage, size} = useLoaderData<LoaderData>()
    const navigate = useNavigate()

    return (
        <VStack className={"content"} gap="4">
            <TableHeaderLayout
                title={"Administrer brukere med rolletilknytning"}
                orgUnitsForFilter={orgUnitPage.orgUnits}
                FilterComponents={<AllAccessRolesFilter roles={roles}/>}
                SearchComponent={<ResourceModuleSearch/>}
                CreateNewButton={
                    <Button
                        role="link"
                        as="a"
                        id="create-assignment"
                        className={"no-underline-button"}
                        variant={"secondary"}
                        iconPosition="right" icon={<PlusIcon aria-hidden/>}
                        onClick={() => navigate("opprett-ny-tildeling")}
                    >
                        Opprett ny tildeling
                    </Button>
                }
            />
            <ResourceModuleAdminUsersTable
                usersPage={usersPage}
                orgUnitList={orgUnitPage.orgUnits}
                roles={roles}
                size={size}
            />
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