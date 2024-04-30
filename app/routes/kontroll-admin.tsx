import React, {useState} from 'react';
import {Alert, Box, Heading, Tabs} from "@navikt/ds-react";
import {Links, Meta, Outlet, Scripts, useLocation, useNavigate, useRouteError} from "@remix-run/react";
import {PersonCheckmarkIcon} from "@navikt/aksel-icons";

export default function KontrollAdmin() {
    const tabsList = ["define-role", "features-to-role"]
    const location = useLocation()
    const currentTab = tabsList.find(tab => location.pathname.includes(tab))

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "define-role")
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [desiredTab, setDesiredTab] = useState("")

    const handleTabChange = (value: string) => {
        if(!hasChanges) {
            handleNavigate(value)
        }
        else {
            setIsModalVisible(true)
            setDesiredTab(value)
        }
    }

    const handleNavigate = (value: string) => {
        setSelectedTab(value);
        navigate(value)
    }

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

                <Outlet context={{isModalVisible, setIsModalVisible, hasChanges, setHasChanges, desiredTab, handleNavigate}}/>
            </Tabs>
        </section>
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
