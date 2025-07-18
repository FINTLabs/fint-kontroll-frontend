import { Tabs } from '@navikt/ds-react';
import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, useLoaderData, useOutletContext, useRouteError } from 'react-router';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import KontrollAccessRolesRadioGroup from '~/components/kontroll-admin/KontrollAccessRolesRadioGroup';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
    const response = await fetchAccessRoles(request);
    return { response };
}

export default function SystemAdminDefinerRolle() {
    const { response } = useLoaderData();
    const context = useOutletContext();

    return (
        <Tabs value={'definer-rolle'}>
            <Tabs.Panel value="definer-rolle">
                <KontrollAccessRolesRadioGroup roles={response} />
                <Outlet context={context} />
            </Tabs.Panel>
        </Tabs>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
