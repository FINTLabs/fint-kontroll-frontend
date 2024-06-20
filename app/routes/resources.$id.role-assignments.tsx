//import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError, useRouteLoaderData} from "@remix-run/react";
import {IAssignedRoles, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedRoles} from "~/data/fetch-assignments";
import {AssignedRolesTable} from "~/components/assignment/AssignedRolesTable";
import {AssignedRolesSearch} from "~/components/assignment/AssignedRolesSearch";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {Alert, Box, Heading} from "@navikt/ds-react";
import {BASE_PATH} from "../../environment";
import React from "react";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import {fetchResourceById} from "~/data/fetch-resources";
import {getSizeCookieServerSide} from "~/components/common/CommonFunctions";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieServerSide(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [assignedRoles, resourceById] = await Promise.all([
        fetchAssignedRoles(request.headers.get("Authorization"), params.id, size, page, search, orgUnits),
        fetchResourceById(request.headers.get("Authorization"), params.id),
    ])

    const resource: IResource = await resourceById.json()
    return json({
        assignedRoles: await assignedRoles.json(),
        resourceName: resource.resourceName,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
    })
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data}) => {
        return <Link to={`/resources/${params.id}/role-assignments`}>Ressursinfo</Link>
    }
}

export default function AssignedRoles() {
    const data = useLoaderData<{
        assignedRoles: IAssignedRoles,
        basePath: string,
        responseCode: string | undefined
    }>();

    return (
        <>
            <Box paddingBlock="16 8">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>
            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    <AssignedRolesSearch/>
                </section>
            </section>
            <Box paddingBlock='8 0'>
                <ResponseAlert responseCode={data.responseCode}/>
            </Box>
            <section>
                <AssignedRolesTable assignedRoles={data.assignedRoles} basePath={data.basePath}/>
            </section>
        </>
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

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "410") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen er slettet!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under sletting av tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}