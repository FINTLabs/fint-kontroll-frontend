import React, {useState} from 'react';
import styles from "~/components/resource/resource.css"
import {Heading, Tabs} from "@navikt/ds-react";
import {Outlet, useLoaderData, useLocation, useNavigate, useRouteLoaderData} from "@remix-run/react";
import type {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfoBlock} from "~/components/resource-admin/ResourceInfoBlock";
import {PersonCheckmarkIcon, PersonPlusIcon} from "@navikt/aksel-icons";
import {IRole} from "~/data/types";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export default function ResourceModuleAdminIndex() {
    const tabsList = ["tildel", "define", "tildelingsadmin", "featureRole"]
    const location = useLocation()
    const currentTab = tabsList.find(tab => location.pathname.includes(tab))

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "tildel")
    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        navigate(value)
    };

    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Ressursmoduladministrator</Heading>
            <Tabs defaultValue={selectedTab} value={selectedTab} onChange={handleTabChange}>
                <div style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="tildel"
                            label="Tildel rettigheter"
                            icon={<PersonPlusIcon title="historielogg" />}
                            id={"assign-role-tab"}
                        />
                        <Tabs.Tab
                            value="define"
                            label="Definer rolle"
                            icon={<PersonCheckmarkIcon title="inbox" />}
                            id={"define-role-tab"}
                        />
                        <Tabs.Tab
                            value="tildelingsadmin"
                            label="Tildelingsadministrasjon"
                            icon={<PersonCheckmarkIcon title="inbox" />}
                            id={"see-users-tab"}
                        />
                        <Tabs.Tab
                            value="featureRole"
                            label="Knytt features til roller"
                            icon={<PersonCheckmarkIcon title="inbox" />}
                            id={"feature-role-tab"}
                        />
                    </Tabs.List>
                </div>
                <Outlet/>
            </Tabs>
        </section>
    );
}