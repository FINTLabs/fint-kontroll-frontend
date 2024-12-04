import {Alert, Box, HStack, Loader, Tabs, VStack} from "@navikt/ds-react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    useLoaderData,
    useLocation,
    useNavigate, useParams,
    useRouteError
} from "@remix-run/react";
import {BreadcrumbParams, IResource} from "~/data/types";
import {fetchResourceById} from "~/data/fetch-resources";
import {BASE_PATH} from "../../environment";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {ArrowRightIcon, PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import React, {useCallback, useEffect, useState} from "react";
import {useLoadingState} from "~/components/common/customHooks";
import {TableHeader} from "~/components/common/Table/Header/TableHeader";


export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const responseResource = await fetchResourceById(request, params.id);

    const resource: IResource = await responseResource.json()

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resource,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export const handle = {
    breadcrumb: ({params}: BreadcrumbParams) =>
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={`/resources`} className={"breadcrumb-link"}>Ressurser</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/resources/${params.id}/user-assignments`} className={"breadcrumb-link"}>Ressursinfo</Link>
            </HStack>
        </HStack>
}

export default function NewAssignment() {
    const loaderData = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    const location = useLocation();
    const params = useParams();
    const {loading, fetching} = useLoadingState()
    const resource: IResource = loaderData.resource
    const responseCode: string | undefined = loaderData.responseCode


    const [state, setState] = useState(location.pathname.includes("/user") ? "user" : "role");

    const handleChangeTab = useCallback((value: string) => {
        navigate(`/assignment/resource/${params.id}/${value}`)
        setState(value)
    }, [navigate, params.id])

    useEffect(() => {
        if (location.pathname.includes("/user")) {
            setState("user")
        } else {
            setState("role")
        }
    }, [location.pathname])

    return (
        <div className={"content"}>
            <TableHeader
                title={"Ny tildeling"}
                subTitle={resource.resourceName}
            />

            <VStack gap="4" marginBlock={"8 0"}>
                <ResponseAlert
                    responseCode={responseCode}
                    successText={"Tildelingen var vellykket!"}
                    deleteText={"Tildelingen ble slettet!"}
                    conflictText={"Denne ressursen er allerede tildelt brukeren. Vennligst gå til brukersiden for å se tildelingen."}
                />
                <Tabs value={state} onChange={handleChangeTab}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="user"
                            label="Brukere"
                            icon={<PersonIcon fontSize="1.2rem"/>}
                            id="user-tab"
                        />
                        <Tabs.Tab
                            value="role"
                            label="Grupper"
                            icon={<PersonGroupIcon fontSize="1.2rem"/>}
                            id="role-tab"
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
        </div>
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