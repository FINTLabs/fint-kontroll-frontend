import React from 'react';
import {Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import ResourceModuleAdminUsersTable from "~/components/resource-module-admin/ResourceModuleAdminUsersTable";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchUsersWithAssignment} from "~/data/resourceModuleAdmin/resource-module-admin";
import styles from "~/components/resource-module-admin/resourceModuleAdmin.css";
export function links() {
    return [{rel: 'stylesheet', href: styles}]
}
export async function loader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const auth = request.headers.get("Authorization")
    const size = Number(url.searchParams.get("size") ?? "10");
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgUnits: string[] = url.searchParams.get("orgUnits")?.split(",") ?? [""];
    const search = url.searchParams.get("search") ?? "";
    const role = url.searchParams.get("role") ?? "";
    const response = await fetchUsersWithAssignment(auth, page, size, orgUnits, search, role);
    return json(await response.json());
}

export default function ResourceModuleAdminIndex() {
    const usersPage = useLoaderData<typeof loader>()

    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Ressursmoduladministrasjon</Heading>

            <ResourceModuleAdminUsersTable usersPage={usersPage} />
        </section>
    );
}