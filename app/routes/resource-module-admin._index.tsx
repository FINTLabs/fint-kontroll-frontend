import React from 'react';
import styles from "~/components/resource/resource.css"
import {Heading, HStack, Link} from "@navikt/ds-react";
import { useNavigate } from "@remix-run/react";
import ResourceModuleAdminUsersTable from "~/components/resource-module-admin/ResourceModuleAdminUsersTable";
import {PlusIcon} from "@navikt/aksel-icons";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export default function ResourceModuleAdminIndex() {
    const navigate = useNavigate()

    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Ressursmoduladministrasjon</Heading>

            <ResourceModuleAdminUsersTable />
        </section>
    );
}