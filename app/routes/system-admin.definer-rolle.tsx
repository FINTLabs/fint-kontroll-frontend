import { Tabs } from '@navikt/ds-react';
import { Outlet, useLoaderData, useOutletContext, useRouteError } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { json } from '@remix-run/node';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import KontrollAccessRolesRadioGroup from '~/components/kontroll-admin/KontrollAccessRolesRadioGroup';
import { IAccessRole } from '~/data/types/userTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
    const response = await fetchAccessRoles(request);
    return json(response);
}

export default function SystemAdminDefinerRolle() {
    const roles: IAccessRole[] = useLoaderData<typeof loader>();
    const context = useOutletContext();

    return (
        <Tabs value={'definer-rolle'}>
            <Tabs.Panel value="definer-rolle">
                <KontrollAccessRolesRadioGroup roles={roles} />
                <Outlet context={context} />
            </Tabs.Panel>
        </Tabs>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
