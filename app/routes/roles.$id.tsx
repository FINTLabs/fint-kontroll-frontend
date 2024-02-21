import React from 'react';
import {Tabs} from "@navikt/ds-react";
import {RoleTable} from "~/components/role/RoleTable";
import {useLoaderData} from "@remix-run/react";
import {IRolePage} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoles} from "~/data/fetch-roles";
import {json} from "@remix-run/node";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchRoles(request.headers.get("Authorization"), size, page, search);
    return json(await response.json());
}

export default function RolesId() {
    const rolePage = useLoaderData<IRolePage>();

    return (
        <>
            <Tabs defaultValue="members">
                <Tabs.List>
                    <Tabs.Tab
                        value="members"
                        label="Medlemmer av gruppen"
                    />
                    <Tabs.Tab
                        value="resources"
                        label="Tildelte ressurser"
                    />
                </Tabs.List>
                <Tabs.Panel value="members" className="h-24 w-full bg-gray-50 p-4">
                    <RoleTable rolePage={rolePage}/>
                </Tabs.Panel>
                <Tabs.Panel value="resources" className="h-24 w-full bg-gray-50 p-4">
                    Tildelte ressurser
                </Tabs.Panel>
            </Tabs>
        </>
    );
}