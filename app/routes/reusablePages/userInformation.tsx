import React from 'react';
import styles from "../../components/user/user.css?url"
import {Alert, Box, Heading, HStack, LinkPanel, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import {IAssignmentPage, IUserDetails} from "~/data/types";
import {fetchUserById} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAssignmentsForUser} from "~/data/fetch-assignments";
import {AssignmentsForUserTable} from "~/components/user/AssignmentsForUserTable";
import {BASE_PATH} from "../../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {UserInfo} from "~/components/user/UserInfo";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";

    console.log("=============loader==============")

    const [user, assignments] = await Promise.all([
        fetchUserById(request, params.userId),
        fetchAssignmentsForUser(request, params.userId, size, page)
    ]);

    console.log("user", user)
    console.log("assignments", assignments)

    return json({
        user: await user.json(),
        assignments: await assignments.json(),
        size,
        page,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined,
    })
}

export const handle = {
    breadcrumb: ({params}: any) => {
        return params.roleId ?
            (
                <HStack align={"start"}>
                    <HStack justify={"center"} align={"center"}>
                        <Link to={`/roles`} className={"breadcrumb-link"}>Grupper</Link>
                        <ArrowRightIcon fontSize="1.5rem"/>
                        <Link to={`/roles/${params.roleId}/members`} className={"breadcrumb-link"}>Medlemmer</Link>
                        <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                        <Link to={`/roles/${params.userId}/members/${params.userId}/orgunit/${params.orgId}`}
                              className={"breadcrumb-link"}>Brukerinfo</Link>
                    </HStack>
                </HStack>
            ) : (
                <HStack align={"start"}>
                    <HStack justify={"center"} align={"center"}>
                        <Link to={`/users`} className={"breadcrumb-link"}>Brukere</Link>
                        <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                        <Link to={`/users/${params.userId}/orgunit/${params.orgId}`}
                              className={"breadcrumb-link"}>Brukerinfo</Link>
                    </HStack>
                </HStack>
            )
    }
}

type PossibleParams = {
    roleId?: string
    userId: string
    orgId: string
}

export default function UserInformation() {
    const data = useLoaderData<typeof loader>()
    const user: IUserDetails = data.user
    const assignmentsForUser: IAssignmentPage = data.assignments
    const size = data.size
    const basePath: string = data.basePath
    const responseCode: string | undefined = data.responseCode
    const params = useParams<PossibleParams>()

    console.log("params", params)
    return (
        <section className={"content"}>
            <VStack gap="8">
                <VStack gap="4">
                    <UserInfo user={user}/>
                    <Box className={"filters"} paddingBlock={"8"}>
                        <LinkPanel href={`${basePath}/assignment/user/${user.id}/orgunit/${params.orgId}`} border>
                            <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                        </LinkPanel>
                    </Box>
                </VStack>

                <VStack gap="8">
                    <Heading className={"heading"} level="2" size="large">
                        Brukeren er tildelt følgende ressurser:
                    </Heading>
                    <ResponseAlert responseCode={responseCode} successText={"Tildelingen var vellykket!"}
                                   deleteText={"Tildelingen ble slettet!"}/>

                    <AssignmentsForUserTable assignmentsForUser={assignmentsForUser} size={size} basePath={basePath}/>
                </VStack>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error("ERROR", error);
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