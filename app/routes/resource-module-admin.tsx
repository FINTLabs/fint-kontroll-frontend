import React from 'react';
import styles from "~/components/resource/resource.css"
import {Heading, Tabs} from "@navikt/ds-react";
import {Outlet, useLoaderData, useLocation, useNavigate, useRouteLoaderData} from "@remix-run/react";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export default function ResourceModuleAdminIndex() {

    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Ressursmoduladministrator</Heading>

            <Outlet/>
        </section>
    );
}