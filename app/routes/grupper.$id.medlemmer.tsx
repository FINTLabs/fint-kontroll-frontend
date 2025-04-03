import React from 'react';
import { Detail, Tabs, VStack } from '@navikt/ds-react';
import { Link, useLoaderData, useRouteError } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchMembers } from '~/data/fetch-roles';
import { json } from '@remix-run/node';
import { MemberTable } from '~/components/role/MemberTable';
import { Search } from '~/components/common/Search';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { getRoleMembersUrl } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';

    const [members, userTypesKodeverk] = await Promise.all([
        fetchMembers(request, params.id, size, page, search),
        fetchUserTypes(request),
    ]);

    return json({
        members,
        size,
        userTypesKodeverk,
    });
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <Link to={getRoleMembersUrl(params.id)} className={'breadcrumb-link'}>
            Medlemmer
        </Link>
    ),
};

export default function Members() {
    const loaderData = useLoaderData<typeof loader>();
    const members = loaderData.members;

    return (
        <section>
            <Tabs value={'members'}>
                <VStack gap="4">
                    <TableHeaderLayout
                        title={'Medlemmer'}
                        isSubHeader={true}
                        SearchComponent={
                            <Search label={'Søk etter medlemmer'} id={'search-member'} />
                        }
                        LeftAlignedFilters={
                            <VStack align={'start'} justify={'start'} height={'100%'}>
                                <Detail>Antall medlemmer i gruppen: {members.totalItems}</Detail>
                            </VStack>
                        }
                    />
                    <Tabs.Panel value="members">
                        <MemberTable />
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
