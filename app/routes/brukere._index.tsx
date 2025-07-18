import { UserTable } from '~/components/user/UserTable';
import { UserSearch } from '~/components/user/UserSearch';
import { LoaderFunctionArgs, useLoaderData, useRouteError } from 'react-router';
import { fetchUsers } from '~/data/fetch-users';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { UserTypeFilter } from '~/components/user/UserTypeFilter';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { postMyAccessRequest } from '~/data/fetch-me-info';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const userType = url.searchParams.get('userType') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const [userList, responseOrgUnits, userTypesKodeverk, access] = await Promise.all([
        fetchUsers(request, size, page, search, [userType], orgUnits),
        fetchAllOrgUnits(request),
        fetchUserTypes(request),
        postMyAccessRequest(request, [
            { url: '/api/users/123', method: 'GET' },
            { url: '/api/assignments/v2/user/123/resources', method: 'GET' },
        ]),
    ]);

    return {
        userList,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        userTypesKodeverk,
        hasAccessToUserDetails: access?.every((a) => a.access),
    };
}

export default function UsersIndex() {
    const { orgUnitList, userTypesKodeverk } = useLoaderData<typeof loader>();
    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Brukere'}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<UserSearch />}
                FilterComponents={<UserTypeFilter kodeverk={userTypesKodeverk} />}
            />
            <UserTable />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
