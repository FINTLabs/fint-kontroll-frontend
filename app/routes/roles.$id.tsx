import React, {useState} from 'react';
import {Alert, Box, Heading, HStack, LinkPanel, Tabs} from "@navikt/ds-react";
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    useLoaderData,
    useLocation,
    useNavigate,
    useRouteError
} from "@remix-run/react";
import {IRole} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoleById} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import styles from "../components/user/user.css?url";
import {BASE_PATH} from "../../environment";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const response = await fetchRoleById(request, params.id);
    const role: IRole = await response.json()

    return json({
        role,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: () => <Link to={`/roles`} className={"breadcrumb-link"}>Grupper</Link>
}

export default function RolesId() {
    const loaderData = useLoaderData<typeof loader>();
    const role: IRole = loaderData.role
    const basePath: string = loaderData.basePath

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
            <HStack justify="end">
                <LinkPanel href={`${basePath}/assignment/role/${role.id}`} border>
                    <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                </LinkPanel>
            </HStack>

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