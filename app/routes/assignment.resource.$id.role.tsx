import React from 'react';
import {Heading} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IRolePage} from "~/data/types";
import {AssignRoleTable} from "~/components/assignment/NewAssignmentRoleTable";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {fetchRoles} from "~/data/fetch-roles";
import {NewAssignmentRoleSearch} from "~/components/assignment/NewAssignmentRoleSearch";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    console.log('id', params.id)
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchRoles(request.headers.get("Authorization"), size, page, search);

    return json(await response.json());
}


export default function NewAssignmentForRole() {

    const rolePage = useLoaderData<IRolePage>();

    return (
        <div className={"content"}>
            <Heading className={"heading"} level="1" size="xlarge">Ny tildeling</Heading>
            <section className={"filters"}>
                <SelectObjectType/>
                <NewAssignmentRoleSearch/>
            </section>
            <AssignRoleTable newAssignmentForRole={rolePage}/>
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
        Gruppe Problem!
        <div>{error.message}</div>
        <Scripts/>
        </body>
        </html>
    );
}