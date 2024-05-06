import React from 'react';
import {Heading, Tabs} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import  {IAssignmentPage} from "~/data/types";
import  {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import styles from "../components/user/user.css?url";
import {AssignmentsForRoleTable} from "~/components/role/AssignmentsForRoleTable";
import {fetchAssignmentsForRole} from "~/data/fetch-assignments";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchAssignmentsForRole(request.headers.get("Authorization"), params.id, size, page);

    const assignments = await response.json()

    return json({
        assignments,
        size
    })
}

export default function AssignmentsForRole() {
    const loaderData = useLoaderData<typeof loader>();
    const assignments = loaderData.assignments
    const size = loaderData.size

    return (
        <section>
            <Tabs value={"assignments"}>
                <Heading className={"heading"} level={"2"} size={"large"}>Tildelte ressurser</Heading>
                <Tabs.Panel value="assignments" className="h-24 w-full bg-gray-50 p-4">
                    <AssignmentsForRoleTable assignmentsForRole={assignments} size={size} />
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}