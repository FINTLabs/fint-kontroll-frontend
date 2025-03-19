import styles from '../components/user/user.css?url';
import { HStack, VStack } from '@navikt/ds-react';
import { Link, useLoaderData, useNavigate, useParams, useRouteError } from '@remix-run/react';
import { fetchUserById } from '~/data/fetch-users';
import { json } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchAssignmentsForUser } from '~/data/fetch-assignments';
import { AssignmentsForUserTable } from '~/components/user/AssignmentsForUserTable';
import { BASE_PATH } from '../../environment';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { getUserByIdUrl, getUserNewAssignmentUrl, USERS } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';
import { InfoBox } from '~/components/common/InfoBox';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

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
        assignments,
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
    const {
        user,
        assignments: assignmentsForUser,
        size,
        basePath,
        responseCode,
    } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const params = useParams();

    return (
        <section className={'content'}>
            <VStack gap="12">
                <InfoBox
                    title={'Brukerinformasjon'}
                    info={[
                        { label: 'Navn', value: user.fullName },
                        { label: 'Brukernavn', value: user.userName },
                        { label: 'Organisasjonsenhet', value: user.organisationUnitName },
                        { label: 'E-post', value: user.email },
                    ]}
                    maxColumns={2}
                />

                <VStack gap="8">
                    <TableHeader
                        isSubHeader={true}
                        title={'Brukeren er tildelt følgende ressurser'}
                        HeaderButton={
                            <SecondaryAddNewLinkButton
                                label="Ny tildeling"
                                handleOnClick={() =>
                                    navigate(`${getUserNewAssignmentUrl(user.id, params.orgId)}`)
                                }
                            />
                        }
                    />
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
