import React from 'react';
import {Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import ResourceModuleAdminUsersTable from "~/components/resource-module-admin/ResourceModuleAdminUsersTable";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchUsersWithAssignment} from "~/data/resourceModuleAdmin/resource-module-admin";
import styles from "~/components/resource-module-admin/resourceModuleAdmin.css";
import {IUnitItem} from "~/data/types";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {
    IResourceModuleAccessRole,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
export function links() {
    return [{rel: 'stylesheet', href: styles}]
}
export async function loader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const auth = request.headers.get("Authorization")
    const size = Number(url.searchParams.get("size") ?? "10");
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgunits: string[] = url.searchParams.get("orgunits")?.split(",") ?? [""];
    const name = url.searchParams.get("name") ?? "";
    const role = url.searchParams.get("accessroleid") ?? "";

    const responseUsersPage = await fetchUsersWithAssignment(auth, page, size, orgunits, name, role);
    const responseRoles = await fetchAccessRoles(auth)
    const responseOrgUnits = await fetchOrgUnits(auth)

    const usersPage = await responseUsersPage.json()
    const roles = await responseRoles.json()
    const orgUnitPage = await responseOrgUnits.json()

    return json
    ({
        usersPage,
        roles,
        orgUnitPage
    })
}


export default function ResourceModuleAdminIndex() {
    const data = useLoaderData<typeof loader>()
    const usersPage = data.usersPage as IResourceModuleUsersPage
    const roles = data.roles as IResourceModuleAccessRole
    const orgUnitList = data.orgUnitPage.orgUnits as IUnitItem[]


    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Ressursmoduladministrasjon</Heading>

            <ResourceModuleAdminUsersTable usersPage={usersPage} orgUnitList={orgUnitList} roles={roles} />
        </section>
    );
}