import styles from "../components/resource/resource.css?url"
import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfoBlock} from "~/components/resource-admin/ResourceInfoBlock";
import {ResourceDetailTable} from "~/components/resource-admin/ResourceDetailTable";
import {StatusTag} from "~/components/resource-admin/StatusTag";
import * as React from "react";
import {ArrowRightIcon} from "@navikt/aksel-icons";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {

    const [resource] = await Promise.all([
        fetchResourceById(request, params.id),
    ]);
    return json({
        resource: await resource.json(),
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <Link to={`/resource-admin`}>Ressursadministrasjon</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/resource-admin/${params.id}`}>Ressursinfo</Link>
            </HStack>
        </HStack>
    )
}

export default function ResourceById() {
    const data = useLoaderData<{
        resource: IResource,
    }>();

    return (
        <VStack gap="8">
            <VStack gap="4">
                <HStack gap="8" align={"center"} justify={"center"}>
                    <Heading className={"heading"}
                             level="1"
                             size="xlarge"
                    >
                        {data.resource.resourceName}
                    </Heading>
                    <StatusTag status={data.resource.status}/>
                </HStack>
                <ResourceInfoBlock resource={data.resource}/>
            </VStack>

            <VStack gap="4">
                <Heading level="2" size="xlarge" align={"center"}>Tilgjengelig for følgende enheter</Heading>
                <ResourceDetailTable resource={data.resource}/>
            </VStack>
        </VStack>
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