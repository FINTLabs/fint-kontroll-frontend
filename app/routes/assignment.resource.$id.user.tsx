import React from 'react';
import {Heading} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IUserPage} from "~/data/types";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {NewAssignmentUserSearch} from "~/components/assignment/NewAssignmentUserSearch";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    console.log('id', params.id)
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchUsers(request.headers.get("Authorization"), size, page, search);

    return json(await response.json());
}


export default function NewAssignment() {

    const userPage = useLoaderData<IUserPage>();

    return (
        <div className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge">Ny tildeling</Heading>
            <section className={"filters"}>
                <SelectObjectType/>
                <NewAssignmentUserSearch/>
            </section>
            <AssignUserTable newAssignmentForUser={userPage}/>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);
    return (
        <html>
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