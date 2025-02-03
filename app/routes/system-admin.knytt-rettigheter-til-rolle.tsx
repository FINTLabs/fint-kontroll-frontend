import {Alert, Box, Tabs} from "@navikt/ds-react";
import {Links, Meta, Outlet, Scripts, useLoaderData, useNavigate, useParams, useRouteError} from "@remix-run/react";
import React, {useEffect} from "react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import styles from "../components/kontroll-admin/kontroll-admin.css?url";
import KontrollAccessRolesRadioGroup from "~/components/kontroll-admin/KontrollAccessRolesRadioGroup";
import {IAccessRole} from "~/data/types/userTypes";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
    return await fetchAccessRoles(request)
}

export default () => {
    const accessRoles: IAccessRole[] = useLoaderData<typeof loader>()

    return (
        <Tabs value={"knytt-rettigheter-til-rolle"}>
            <Tabs.Panel value="knytt-rettigheter-til-rolle">
                <KontrollAccessRolesRadioGroup roles={accessRoles}/>
                <Outlet/>
            </Tabs.Panel>
        </Tabs>
    )
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