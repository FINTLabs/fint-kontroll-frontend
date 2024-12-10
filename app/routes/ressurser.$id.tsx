import React, {useCallback, useEffect, useState} from 'react';
import styles from "../components/resource/resource.css?url"
import {Alert, Box, HStack, LinkPanel, Loader, Tabs, VStack} from "@navikt/ds-react";
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    useLoaderData,
    useLocation,
    useNavigate,
    useParams,
    useRouteError
} from "@remix-run/react";
import {IKodeverkUserType, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {BASE_PATH} from "../../environment";
import {ResourceInfoBox} from "~/components/common/ResourceInfoBox";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";
import {TableHeader} from "~/components/common/Table/Header/TableHeader";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import {useLoadingState} from "~/components/common/customHooks";
import {getResourceNewAssignmentUrl, getResourceUserAssignmentsUrl, RESOURCES} from "~/data/constants";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {

    const [resource, source] = await Promise.all([
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request)
    ]);

    let userTypes: IKodeverkUserType[] = []
    if (source === "gui") {
        userTypes = await fetchUserTypes(request)
    }

    return json({
        resource: await resource.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        userTypes
    })
}

export const handle = {
    breadcrumb: () => <Link to={RESOURCES} className={"breadcrumb-link"}>Ressurser</Link>,
};

export default function ResourceById() {
    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource
    const {userTypes, basePath} = loaderData

    const navigate = useNavigate()
    const location = useLocation();
    const params = useParams();
    const {loading, fetching} = useLoadingState()

    const [state, setState] = useState(location.pathname.includes("/bruker-tildelinger") ? "bruker-tildelinger" : "gruppe-tildelinger");

    const handleChangeTab = useCallback((value: string) => {
        navigate(`/ressurser/${params.id}/${value}`)
        setState(value)
    }, [navigate, params.id])

    useEffect(() => {
        if (location.pathname.includes("/bruker-tildelinger")) {
            setState("bruker-tildelinger")
        } else {
            setState("gruppe-tildelinger")
        }
    }, [location.pathname])

    return (
        <section className={"content"}>
            <VStack gap="4">
                <VStack gap="4">
                    <ResourceInfoBox resource={resource} userTypes={userTypes}/>
                    <Box className={"filters"} paddingBlock={"8"}>
                        <LinkPanel href={`${basePath}${getResourceNewAssignmentUrl(resource.id)}/${state === "bruker-tildelinger" ? "brukere" : "grupper"}`} border>
                            <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                        </LinkPanel>
                    </Box>
                </VStack>

                <TableHeader
                    isSubHeader={true}
                    title={"Tildelinger"}
                    titleAlignment={"center"}
                />
                <Tabs value={state} onChange={handleChangeTab}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="bruker-tildelinger"
                            label="Brukere"
                            icon={<PersonIcon fontSize="1.2rem"/>}
                        />
                        <Tabs.Tab
                            value="gruppe-tildelinger"
                            label="Grupper"
                            icon={<PersonGroupIcon fontSize="1.2rem"/>}
                        />
                    </Tabs.List>

                    {loading && !fetching &&
                        <HStack margin={"4"} width="100%" justify="center">
                            <Loader size="2xlarge" title="Venter..."/>
                        </HStack>
                    }
                    <Outlet context={{resource}}/>
                </Tabs>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
     console.error(error);
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
}