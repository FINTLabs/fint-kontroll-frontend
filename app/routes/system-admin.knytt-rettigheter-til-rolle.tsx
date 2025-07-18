import { Tabs } from '@navikt/ds-react';
import { LoaderFunctionArgs, Outlet, useLoaderData, useRouteError } from 'react-router';
import React from 'react';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import styles from '../components/kontroll-admin/kontroll-admin.css?url';
import KontrollAccessRolesRadioGroup from '~/components/kontroll-admin/KontrollAccessRolesRadioGroup';
import { IAccessRole } from '~/data/types/userTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderFunctionArgs) {
    return await fetchAccessRoles(request);
}

export default () => {
    const accessRoles: IAccessRole[] = useLoaderData<typeof loader>();

    return (
        <Tabs value={'knytt-rettigheter-til-rolle'}>
            <Tabs.Panel value="knytt-rettigheter-til-rolle">
                <KontrollAccessRolesRadioGroup roles={accessRoles} />
                <Outlet />
            </Tabs.Panel>
        </Tabs>
    );
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
