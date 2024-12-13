import {Alert, Box, Tabs} from "@navikt/ds-react";
import {
    Links,
    Meta,
    Outlet, Scripts,
    useLoaderData,
    useOutletContext,
    useRouteError,
} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {IRole} from "~/data/kontrollAdmin/types";
import KontrollAccessRolesRadioGroup from "~/components/kontroll-admin/KontrollAccessRolesRadioGroup";


export async function loader({request}: LoaderFunctionArgs) {
    const response = await fetchAccessRoles(request);
    return json(await response.json());
}

export default function SystemAdminDefinerRolle() {
    const roles: IRole[] = useLoaderData<typeof loader>();
    const context = useOutletContext()

    return (
        <Tabs value={"definer-rolle"}>
            <Tabs.Panel value="definer-rolle">
                <KontrollAccessRolesRadioGroup roles={roles} />
                <Outlet context={context} />
            </Tabs.Panel>
        </Tabs>
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