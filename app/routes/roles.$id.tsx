import React from 'react';
import {Heading, Tabs} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IMemberPage, IRole} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers, fetchRoleById} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import styles from "~/components/user/user.css";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";

    const [role, members] = await Promise.all([
        fetchRoleById(request.headers.get("Authorization"), params.id),
        fetchMembers(request.headers.get("Authorization"), params.id, size, page, search)
    ]);
    return json({
        role: await role.json(),
        members: await members.json()
    })
}

export default function RolesId() {
    const data = useLoaderData<{ role: IRole, members: IMemberPage }>();

    return (
        <section className={"content"}>
            <Heading level={"1"} size={"xlarge"}>{data.role.roleName}</Heading>
            <Tabs defaultValue="members">
                <div style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="members"
                            label="Medlemmer"
                        />
                        <Tabs.Tab
                            value="resources"
                            label="Ressurser"
                        />
                    </Tabs.List>
                </div>
                <Heading className={"heading"} level={"2"} size={"large"}>Medlemmer av gruppen</Heading>
                <Tabs.Panel value="members" className="h-24 w-full bg-gray-50 p-4">
                    <MemberTable memberPage={data.members}/>
                </Tabs.Panel>
                <Tabs.Panel value="resources" className="h-24 w-full bg-gray-50 p-4">
                    Tildelte ressurser
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}