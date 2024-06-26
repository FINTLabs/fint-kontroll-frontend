import React from 'react';
import styles from "../components/resource/resource.css?url"
import {
    Link,
    Links,
    Meta,
    Scripts,
    useLoaderData,
    useRouteError,
    useRouteLoaderData
} from "@remix-run/react";
import {IAssignedUsers, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {AssignedUsersTable} from "~/components/assignment/AssignedUsersTable";
import {Alert, Box, Heading} from "@navikt/ds-react";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {AssignedUsersSearch} from "~/components/assignment/AssignedUsersSearch";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import ChipsFilters from "~/components/common/ChipsFilters";
import {BASE_PATH} from "../../environment";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import {fetchResourceById} from "~/data/fetch-resources";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request, context}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];

    const [assignedUsers, resourceById] = await Promise.all([
        fetchAssignedUsers(request, params.id, size, page, search, userType, orgUnits),
        fetchResourceById(request, params.id),
    ])

    const resource: IResource = await resourceById.json()
    return json({
        context,
        assignedUsers: await assignedUsers.json(),
        resourceName: resource.resourceName,
        size,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data}) => {
        return <Link to={`/resources/${params.id}/user-assignments`}>Ressursinfo</Link>
    }
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>("resource.$id")
}

export default function AssignedUsers() {
    const loaderData = useLoaderData<typeof loader>();
    const assignedUsersPage: IAssignedUsers = loaderData.assignedUsers
    const size = loaderData.size
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode

    return (
        <>
            <Box paddingBlock="16 8">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>

            <section className={"toolbar"}>
                <SelectObjectType />
                <section className={"filters"}>
                    <UserTypeFilter />
                    <AssignedUsersSearch />
                </section>
            </section>

            <Box className={"filters"} paddingBlock={"1 8"}>
                <ChipsFilters />
            </Box>

            <Box paddingBlock='8 0'>
                <ResponseAlert responseCode={responseCode}/>
            </Box>

            <section className={"grid-main"}>
                <AssignedUsersTable assignedUsers={assignedUsersPage} size={size} basePath={basePath} />
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