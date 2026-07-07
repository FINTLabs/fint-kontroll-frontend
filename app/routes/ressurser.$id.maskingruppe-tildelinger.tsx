import styles from '../components/resource/resource.css?url';
import { Link, useRouteError } from 'react-router';
import { Heading, Tabs, VStack } from '@navikt/ds-react';
import React from 'react';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => {
        return (
            <Link to={`/resources/${params.id}/role-assignments`} className={'breadcrumb-link'}>
                Ressursinfo
            </Link>
        );
    },
};

export default function AssignedDevices() {
    return (
        <Tabs.Panel value="maskingruppe-tildelinger">
            <VStack gap="space-12">
                <Heading size={'small'}>Her kommer device-tildelinger</Heading>
            </VStack>
        </Tabs.Panel>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
