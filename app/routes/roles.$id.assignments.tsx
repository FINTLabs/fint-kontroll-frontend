import React from 'react';
import {Alert, Box, Heading, Tabs, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import styles from "../components/user/user.css?url";
import {AssignmentsForRoleTable} from "~/components/role/AssignmentsForRoleTable";
import {fetchAssignmentsForRole} from "~/data/fetch-assignments";
import {BASE_PATH} from "../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchAssignmentsForRole(request, params.id, size, page);

    const assignments = await response.json()

    return json({
        assignments,
        size,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        responseCode: url.searchParams.get("responseCode") ?? undefined
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params, data}) => <Link to={`/roles/${params.id}/assignments`}>Ressurser</Link>
}

export default function AssignmentsForRole() {
    const loaderData = useLoaderData<typeof loader>();
    const assignments = loaderData.assignments
    const size = loaderData.size
    const basePath = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode

    return (
        <section>
            <Tabs value={"assignments"}>
                <VStack gap="4">
                    <Heading className={"heading"} level={"2"} size={"large"}>Tildelte ressurser</Heading>
                    <Tabs.Panel value="assignments" className="h-24 w-full bg-gray-50 p-4">

                        <ResponseAlert responseCode={responseCode} successText={"Tildelingen var vellykket!"}
                                       deleteText={"Tildelingen ble slettet!"}/>

                        <AssignmentsForRoleTable assignmentsForRole={assignments} size={size} basePath={basePath}/>
                    </Tabs.Panel>
                </VStack>
            </Tabs>
        </section>
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