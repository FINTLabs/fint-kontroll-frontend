import React from 'react';
import {Alert, Box, Heading, Tabs} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import  {IAssignmentPage} from "~/data/types";
import  {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import styles from "../components/user/user.css?url";
import {AssignmentsForRoleTable} from "~/components/role/AssignmentsForRoleTable";
import {fetchAssignmentsForRole} from "~/data/fetch-assignments";
import {BASE_PATH} from "../../environment";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import {getSizeCookieServerSide} from "~/components/common/CommonFunctions";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieServerSide(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchAssignmentsForRole(request.headers.get("Authorization"), params.id, size, page);

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
    breadcrumb: ({ params, data }) => <Link to={`/roles/${params.id}/assignments`}>Ressurser</Link>
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
                <Heading className={"heading"} level={"2"} size={"large"}>Tildelte ressurser</Heading>
                <Tabs.Panel value="assignments" className="h-24 w-full bg-gray-50 p-4">
                    <Box paddingBlock='8 0'>
                        <ResponseAlert responseCode={responseCode}/>
                    </Box>

                    <AssignmentsForRoleTable assignmentsForRole={assignments} size={size} basePath={basePath} />
                </Tabs.Panel>
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

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "410") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen er slettet!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under sletting av tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}