import { Tabs } from '@navikt/ds-react';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { json } from '@remix-run/node';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import React from 'react';
import KontrollAccessRolesSelect from '~/components/kontroll-admin/KontrollAccessRolesSelect';

export async function loader({ request }: LoaderFunctionArgs) {
    const [roles] = await Promise.all([fetchAccessRoles(request)]);

    return json({
        roles,
    });
}

export default function SystemAdminMenuSettings() {
    const { roles } = useLoaderData<typeof loader>();

    return (
        <Tabs value={'menystyring'}>
            <Tabs.Panel value="menystyring">
                <KontrollAccessRolesSelect roles={roles} />
                <Outlet />
            </Tabs.Panel>
        </Tabs>
    );
}
