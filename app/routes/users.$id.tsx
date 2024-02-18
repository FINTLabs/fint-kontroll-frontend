import React from 'react';
import UserInfo from "~/components/user/UserInfo";
import styles from "~/components/user/user.css"
import {Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IAssignmentPage, IUser} from "~/data/types";
import {fetchUserById} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignmentsForUser} from "~/data/fetch-assignments";
import {AssignmentsForUserTable} from "~/components/user/AssignmentsForUserTable";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";

    const [user, assignments] = await Promise.all([
        fetchUserById(request.headers.get("Authorization"), params.id),
        fetchAssignmentsForUser(request.headers.get("Authorization"), params.id, size, page)
    ]);
    return json({
        user: await user.json(),
        assignments: await assignments.json()
    })
}

export default function Users() {
    const data = useLoaderData<{ user: IUser, assignments: IAssignmentPage }>();

    return (
        <section className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Brukerinformasjon</Heading>
            </div>
            <UserInfo user={data.user}/>
            <section className={"toolbar"} style={{marginTop: '3rem'}}>
                <Heading className={"heading"} level="1" size="large">Brukeren er tildelt følgende ressurser:</Heading>
            </section>
            <AssignmentsForUserTable assignmentsForUser={data.assignments}/>
        </section>
    );
}