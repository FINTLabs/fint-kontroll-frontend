import React from 'react';
import styles from "../components/user/user.css?url"
import {Alert, Box, Button, Heading, Link, LinkPanel} from "@navikt/ds-react";
import {Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import {IAssignmentPage, IUser} from "~/data/types";
import {fetchUserById} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignmentsForUser} from "~/data/fetch-assignments";
import {AssignmentsForUserTable} from "~/components/user/AssignmentsForUserTable";
import {BASE_PATH} from "../../environment";
import {UserInfo} from "~/components/user/UserInfo";
import {ArrowLeftIcon} from "@navikt/aksel-icons";

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
        assignments: await assignments.json(),
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export default function Users() {
    const data = useLoaderData<{ user: IUser, assignments: IAssignmentPage, basePath: string }>();
    const params = useParams()

    return (
        <>
            <Button as={Link}
                    variant={"secondary"}
                    icon={<ArrowLeftIcon title="tilbake" fontSize="1.5rem"/>}
                    iconPosition={"left"}
                    href={`${data.basePath}/users`}
            >
                Tilbake
            </Button>
            <section className={"content"}>
                <Box className={"filters"}>
                    <LinkPanel href={`${data.basePath}/assignment/user/${data.user.id}/orgunit/${params.orgId}`} border>
                        <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                    </LinkPanel>
                </Box>
                <Heading className={"heading"} level="1" size="xlarge" align={"center"}>Brukerinformasjon</Heading>
                <UserInfo user={data.user}/>
                <section className={"toolbar"} style={{marginTop: '3rem'}}>
                    <Heading className={"heading"} level="1" size="large">Brukeren er tildelt følgende
                        ressurser:</Heading>
                </section>
                <AssignmentsForUserTable assignmentsForUser={data.assignments}/>
            </section>
        </>
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