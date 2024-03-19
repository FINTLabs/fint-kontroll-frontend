import React, {useState} from 'react';
import {Heading, Tabs} from "@navikt/ds-react";
import {Outlet, useLocation, useNavigate} from "@remix-run/react";
import {PersonCheckmarkIcon} from "@navikt/aksel-icons";

export default function KontrollAdmin() {
    const tabsList = ["define-role", "features-to-role"]
    const location = useLocation()
    const currentTab = tabsList.find(tab => location.pathname.includes(tab))

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "define-role")
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
                            value="define-role"
                            label="Definer rolle"
                            icon={<PersonCheckmarkIcon title="inbox" />}
                            id={"define-role-tab"}
                        />
                        <Tabs.Tab
                            value="features-to-role"
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