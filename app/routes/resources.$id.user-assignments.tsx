import React from 'react';
import styles from "../components/resource/resource.css?url"
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError, useRouteLoaderData} from "@remix-run/react";
import {IAssignedUsers, IKodeverkUserType, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {AssignedUsersTable} from "~/components/assignment/AssignedUsersTable";
import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import ChipsFilters from "~/components/common/ChipsFilters";
import {BASE_PATH} from "../../environment";
import {fetchResourceById} from "~/data/fetch-resources";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {UserSearch} from "~/components/user/UserSearch";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";

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

    const [assignedUsers, resourceById, source] = await Promise.all([
        fetchAssignedUsers(request, params.id, size, page, search, userType, orgUnits),
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request)
    ])

    let userTypes: IKodeverkUserType[] = []
    if (source === "gui") {
        userTypes = await fetchUserTypes(request)
    }


    const resource: IResource = await resourceById.json()
    return json({
        context,
        assignedUsers: await assignedUsers.json(),
        resourceName: resource.resourceName,
        size,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        userTypes
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => {
        return <Link to={`/resources/${params.id}/user-assignments`} className={"breadcrumb-link"}>Ressursinfo</Link>
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
        <VStack gap="4">
            <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    <UserTypeFilter userTypes={loaderData.userTypes}/>
                    <UserSearch/>
                </section>
            </section>

            <HStack justify="end">
                <ChipsFilters userTypes={loaderData.userTypes}/>
            </HStack>

            <ResponseAlert responseCode={responseCode} successText={"Tildelingen var vellykket!"}
                           deleteText={"Tildelingen ble slettet!"}/>

            <AssignedUsersTable assignedUsers={assignedUsersPage} size={size} basePath={basePath}/>
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