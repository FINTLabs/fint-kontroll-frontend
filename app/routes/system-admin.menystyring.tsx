import { Alert, Heading, InfoCard, Tabs, VStack } from '@navikt/ds-react';
import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, useLoaderData } from 'react-router';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import React from 'react';
import KontrollAccessRolesSelect from '~/components/kontroll-admin/KontrollAccessRolesSelect';
import { InformationSquareIcon } from '@navikt/aksel-icons';

export async function loader({ request }: LoaderFunctionArgs) {
    const [roles] = await Promise.all([fetchAccessRoles(request)]);

    return {
        roles,
    };
}

export default function SystemAdminMenuSettings() {
    const { roles } = useLoaderData<typeof loader>();

    return (
        <Tabs value={'menystyring'}>
            <Tabs.Panel value="menystyring">
                <VStack gap={'8'}>
                    <InfoCard data-color="info">
                        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                            <InfoCard.Title>
                                Endringer her vil ikke påvirke en rolles rettigheter eller
                                tilganger.
                            </InfoCard.Title>
                        </InfoCard.Header>
                        <InfoCard.Content>
                            Dette er kun for å vise eller skjule menypunkter. Før du gjør endringer
                            her bør du være sikker på at rollen har de rettighetene som trengs.
                        </InfoCard.Content>
                    </InfoCard>
                    <KontrollAccessRolesSelect roles={roles} />
                </VStack>
                <Outlet />
            </Tabs.Panel>
        </Tabs>
    );
}
