import React from 'react';
import styles from "../components/user/user.css?url"
import {Alert, Box, Button, Heading, HStack, Link, LinkPanel} from "@navikt/ds-react";
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
        size,
        page,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export default function Users() {
    const data = useLoaderData<typeof loader>()
    const user: IUser = data.user
    const assignmentsForUser: IAssignmentPage = data.assignments
    const size = data.size
    const basePath: string = data.basePath
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
                <HStack justify="end">
                    <LinkPanel href={`${basePath}/assignment/user/${user.id}/orgunit/${params.orgId}`} border>
                        <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                    </LinkPanel>
                </HStack>
                <Heading className={"heading"} level="1" size="xlarge" align={"center"}>Brukerinformasjon</Heading>
                <UserInfo user={user}/>
                <section className={"toolbar"} style={{marginTop: '3rem'}}>
                    <Heading className={"heading"} level="2" size="large">
                        Brukeren er tildelt følgende ressurser:
                    </Heading>
                </section>
                <AssignmentsForUserTable assignmentsForUser={assignmentsForUser} size={size}/>
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