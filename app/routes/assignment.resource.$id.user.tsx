import React from 'react';
import {Alert, Box, Heading} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import type {IAssignedUsers, IUnitItem, IUnitTree, IUser, IUserPage} from "~/data/types";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {NewAssignmentUserSearch} from "~/components/assignment/NewAssignmentUserSearch";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";


export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseOrgUnits, responseAssignments] = await Promise.all([
        fetchUsers(request.headers.get("Authorization"), size, page, search, userType, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchAssignedUsers(request.headers.get("Authorization"), params.id, "1000", "0", "", "", orgUnits)
    ]);
    const userList: IUserPage = await responseUsers.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedUsersList: IAssignedUsers = await responseAssignments.json()

    const assignedUsersMap: Map<number, IUser> = new Map(assignedUsersList.users.map(user => [user.id, user]))
    const isAssignedUsers: IUser[] = userList.users.map(user => {
        return {
            ...user,
            "assigned": assignedUsersMap.has(user.id)
        }
    })

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        userList,
        orgUnitList,
        assignedUsersList,
        isAssignedUsers,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function NewAssignment() {

    const data = useLoaderData<{
        userList: IUserPage,
        orgUnitList: IUnitItem[]
        assignedUsersList: IAssignedUsers,
        isAssignedUsers: IUser[],
        basePath: string,
        responseCode: string | undefined
    }>();

    const params = useParams<string>()

    return (
        <div className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge">Ny tildeling</Heading>
            <section className={"toolbar"}>
                <SelectObjectType/>
                <section className={"filters"}>
                    <UserTypeFilter/>
                    <NewAssignmentUserSearch/>
                </section>
            </section>
            <Box paddingBlock='8 0'>
                <ResponseAlert responseCode={data.responseCode}/>
            </Box>
            <AssignUserTable isAssignedUsers={data.isAssignedUsers}
                             resourceId={params.id}
                             currentPage={data.userList.currentPage}
                             totalPages={data.userList.totalPages}
                             basePath={data.basePath}
            />
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

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen var vellykket!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}