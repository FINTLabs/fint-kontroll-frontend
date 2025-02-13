import React from 'react';
import { Heading, Tabs, VStack } from '@navikt/ds-react';
import { Link, useLoaderData, useRouteError } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import styles from '../components/user/user.css?url';
import { AssignmentsForRoleTable } from '~/components/role/AssignmentsForRoleTable';
import { fetchAssignmentsForRole } from '~/data/fetch-assignments';
import { BASE_PATH } from '../../environment';
import { getSizeCookieFromRequestHeader } from '~/components/common/CommonFunctions';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { getRoleAssignmentsUrl } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const assignments = await fetchAssignmentsForRole(request, params.id, size, page);

    return {
        assignments,
        size,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        responseCode: url.searchParams.get('responseCode') ?? undefined,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <Link to={getRoleAssignmentsUrl(params.id)} className={'breadcrumb-link'}>
            Tildelte ressurser
        </Link>
    ),
};

export default function AssignmentsForRole() {
    const { assignments, size, basePath, responseCode } = useLoaderData<typeof loader>();

    return (
        <section>
            <Tabs value={'assignments'}>
                <VStack gap="4">
                    <Heading className={'heading'} level={'2'} size={'large'}>
                        Tildelte ressurser
                    </Heading>
                    <Tabs.Panel value="assignments">
                        <ResponseAlert
                            responseCode={responseCode}
                            successText={'Tildelingen var vellykket!'}
                            deleteText={'Tildelingen ble slettet!'}
                        />

                        <AssignmentsForRoleTable
                            assignmentsForRole={assignments}
                            size={size}
                            basePath={basePath}
                        />
                    </Tabs.Panel>
                </VStack>
            </Tabs>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
