import {Alert, Box, Tabs} from "@navikt/ds-react";
import {Links, Meta, Outlet, Scripts, useLoaderData, useNavigate, useParams, useRouteError} from "@remix-run/react";
import React, {useEffect} from "react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import styles from "../components/kontroll-admin/kontroll-admin.css?url";
import KontrollAccessRolesRadioGroup from "~/components/kontroll-admin/KontrollAccessRolesRadioGroup";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
    const accessRolesRes = await fetchAccessRoles(request)
    return await accessRolesRes.json()
}

export default () => {
    const accessRoles: IResourceModuleAccessRole[] = useLoaderData<typeof loader>()


    const params = useParams()

    const roleProp = params.id
    const navigate = useNavigate();

    useEffect(() => {
        !roleProp ? navigate(accessRoles[0].accessRoleId) : ""
    }, []);

    return (
        <Tabs value={"features-to-role"}>
            <Tabs.Panel value="features-to-role">
                <KontrollAccessRolesRadioGroup roles={accessRoles} />
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