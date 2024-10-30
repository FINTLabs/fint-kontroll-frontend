import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Alert, Box, Heading, LinkPanel, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Outlet, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {IKodeverkUserType, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {BASE_PATH} from "../../environment";
import {ResourceInfoBox} from "~/components/common/ResourceInfoBox";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";

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
    breadcrumb: () => <Link to="/resources">Ressurser</Link>,
};

export default function ResourceById() {

    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource
    const { userTypes, basePath } = loaderData

    return (
        <section className={"content"}>
            <VStack gap="8">
                <VStack gap="4">
                    <Box className={"filters"}>
                        <LinkPanel href={`${basePath}/assignment/resource/${resource.id}/user`} border>
                            <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                        </LinkPanel>
                    </Box>

                    <Heading className={"heading"} level="1" size="xlarge" align={"center"}>
                        {resource.resourceName}
                    </Heading>

                    <ResourceInfoBox resource={resource} userTypes={userTypes}/>
                </VStack>

                <Outlet context={{resource}}/>
            </VStack>
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