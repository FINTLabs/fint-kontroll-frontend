import { Alert, Heading, Tabs, VStack } from '@navikt/ds-react';
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
                <VStack gap={'8'}>
                    <Alert variant={'info'}>
                        <Heading spacing size="small" level="3">
                            Endringer her vil ikke påvirke en rolles rettigheter eller tilganger.
                        </Heading>
                        Dette er kun for å vise eller skjule menypunkter. Før du gjør endringer her
                        bør du være sikker på at rollen har de rettighetene som trengs.
                    </Alert>
                    <KontrollAccessRolesSelect roles={roles} />
                </VStack>
                <Outlet />
            </Tabs.Panel>
        </Tabs>
    );
}
