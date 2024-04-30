import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Alert, Box, Heading, LinkPanel} from "@navikt/ds-react";
import {Links, Meta, Outlet, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
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
        fetchResourceById(request.headers.get("Authorization"), params.id),
    ]);
    return json({
        resource: await resource.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function ResourceById() {
    const data = useLoaderData<{
        resource: IResource,
        basePath: string
    }>();

    return (
        <section className={"content"}>
            <Box className={"filters"}>
                <LinkPanel href={`${data.basePath}/assignment/resource/${data.resource.id}/user`} border>
                    <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                </LinkPanel>
            </Box>
            <Heading className={"heading"} level="1" size="xlarge"
                     align={"center"}>{data.resource.resourceName}</Heading>

            <ResourceInfo resource={data.resource}/>
            <Outlet/>
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