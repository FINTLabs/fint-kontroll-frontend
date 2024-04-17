import React, {useState} from 'react';
import {Heading, Tabs} from "@navikt/ds-react";
import {Outlet, useLoaderData, useLocation, useNavigate} from "@remix-run/react";
import {IRole} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoleById} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import styles from "../components/user/user.css?url";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const response = await fetchRoleById(request.headers.get("Authorization"), params.id);
    return json(await response.json());
}

export default function RolesId() {
    const role = useLoaderData<IRole>();
    const pathname = useLocation();
    const tabList = ["members", "assignments"];
    const currentTab = tabList.find(tab => pathname.pathname.includes(tab))
    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "members");
    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        navigate(value)
    };
    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>{role.roleName}</Heading>
            <Tabs defaultValue={"members"} value={selectedTab} onChange={handleTabChange}>
                <div style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="members"
                            label="Medlemmer"
                        />
                        <Tabs.Tab
                            value="assignments"
                            label="Ressurser"
                        />
                    </Tabs.List>
                </div>
                <Outlet/>
            </Tabs>
        </section>
    );
}