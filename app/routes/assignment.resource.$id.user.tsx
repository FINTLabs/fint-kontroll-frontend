import React from 'react';
import {Heading} from "@navikt/ds-react";
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
        basePath: string
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
    //console.error(error);
    return (
        <html lang={"no"}>
        <head>
            <title>Oh no!</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        Uups! Problemer med å hente brukere
        <div>{error.message}</div>
        <Scripts/>
        </body>
        </html>
    );
}