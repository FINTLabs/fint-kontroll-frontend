import React from 'react';
import {Heading, Tabs} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IMemberPage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import styles from "~/components/user/user.css";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchMembers(request.headers.get("Authorization"), params.id, size, page, search);
    return json(await response.json());
}

export default function Members() {
    const members = useLoaderData<IMemberPage>();
    return (
        <section>
            <Tabs value={"members"}>
                <Heading className={"heading"} level={"2"} size={"large"}>Medlemmer av gruppen</Heading>
                <Tabs.Panel value="members" className="h-24 w-full bg-gray-50 p-4">
                    <MemberTable memberPage={members}/>
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}