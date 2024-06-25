import {Alert, Box, Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {
    Links,
    Meta,
    Outlet, Scripts,
    useLoaderData,
    useNavigate, useOutletContext,
    useParams, useRouteError,
} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import React, {Suspense, useEffect} from "react";
import {IRole} from "~/data/kontrollAdmin/types";
import KontrollAccessRolesRadioGroup from "~/components/kontroll-admin/KontrollAccessRolesRadioGroup";


export async function loader({request}: LoaderFunctionArgs) {
    const auth = request
    const response = await fetchAccessRoles(auth);
    return json(await response.json());
}

export default function KontrollAdminDefineRole() {
    const roles: IRole[] = useLoaderData<typeof loader>();
    const context = useOutletContext()

    return (
        <section>
            <Tabs value={"define-role"}>
                <Tabs.Panel value="define-role" className="h-24 w-full bg-gray-50 p-4">
                    <KontrollAccessRolesRadioGroup roles={roles} />
                    <Outlet context={context} />
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