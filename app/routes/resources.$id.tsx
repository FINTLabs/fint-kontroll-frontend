import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Alert, Box, Heading, LinkPanel, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Outlet, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfo} from "~/components/resource/ResourceInfo";
import {BASE_PATH} from "../../environment";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {

    const [resource] = await Promise.all([
        fetchResourceById(request, params.id),
    ]);
    return json({
        resource: await resource.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export const handle = {
    breadcrumb: () => <Link to="/resources">Ressurser</Link>,
};

export default function ResourceById() {

    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource
    const basePath: string = loaderData.basePath

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

                    <ResourceInfo resource={resource}/>
                </VStack>

                <Outlet context={{ resource }} />
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