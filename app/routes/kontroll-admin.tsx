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
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export default function KontrollAdmin() {
    const tabsList = ["define", "featureRole"]
    const location = useLocation()
    const currentTab = tabsList.find(tab => location.pathname.includes(tab))

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "define")
    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        navigate(value)
    };


    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>Kontrolladministrasjon</Heading>
            <Tabs defaultValue={selectedTab} value={selectedTab} onChange={handleTabChange}>
                <div style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="define"
                            label="Definer rolle"
                            icon={<PersonCheckmarkIcon title="inbox" />}
                            id={"define-role-tab"}
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