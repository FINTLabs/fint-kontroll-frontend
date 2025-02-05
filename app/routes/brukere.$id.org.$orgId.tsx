import styles from '../components/user/user.css?url';
import { Box, Heading, HStack, LinkPanel, VStack } from '@navikt/ds-react';
import { Link, useLoaderData, useParams, useRouteError } from '@remix-run/react';
import { IUserDetails } from '~/data/types/userTypes';
import { fetchUserById } from '~/data/fetch-users';
import { json } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchAssignmentsForUser } from '~/data/fetch-assignments';
import { AssignmentsForUserTable } from '~/components/user/AssignmentsForUserTable';
import { BASE_PATH } from '../../environment';
import { UserInfo } from '~/components/user/UserInfo';
import { getSizeCookieFromRequestHeader } from '~/components/common/CommonFunctions';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { getUserByIdUrl, getUserNewAssignmentUrl, USERS } from '~/data/paths';
import { IAssignmentPage } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';

    const [user, assignments] = await Promise.all([
        fetchUserById(request, params.id),
        fetchAssignmentsForUser(request, params.id, size, page),
    ]);
    return json({
        user,
        assignments: await assignments.json(),
        size,
        page,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        responseCode: url.searchParams.get('responseCode') ?? undefined,
    });
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={USERS} className={'breadcrumb-link'}>
                    Brukere
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getUserByIdUrl(params.id, params.orgId)} className={'breadcrumb-link'}>
                    Brukerinfo
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function Users() {
    const data = useLoaderData<typeof loader>();
    const user: IUserDetails = data.user;
    const assignmentsForUser: IAssignmentPage = data.assignments;
    const size = data.size;
    const basePath: string = data.basePath;
    const responseCode: string | undefined = data.responseCode;
    const params = useParams();

    return (
        <section className={'content'}>
            <VStack gap="8">
                <VStack gap="4">
                    <UserInfo user={user} />
                    <Box className={'filters'} paddingBlock={'8'}>
                        <LinkPanel
                            href={`${basePath}${getUserNewAssignmentUrl(user.id, params.orgId)}`}
                            border>
                            <LinkPanel.Title>Ny tildeling</LinkPanel.Title>
                        </LinkPanel>
                    </Box>
                </VStack>

                <VStack gap="8">
                    <Heading className={'heading'} level="2" size="large">
                        Brukeren er tildelt følgende ressurser:
                    </Heading>
                    <ResponseAlert
                        responseCode={responseCode}
                        successText={'Tildelingen var vellykket!'}
                        deleteText={'Tildelingen ble slettet!'}
                    />

                    <AssignmentsForUserTable
                        assignmentsForUser={assignmentsForUser}
                        size={size}
                        basePath={basePath}
                    />
                </VStack>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
