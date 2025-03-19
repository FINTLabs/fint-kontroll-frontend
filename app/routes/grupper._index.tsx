import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';
import type { IRoleList } from '~/data/types/userTypes';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { fetchRoles } from '~/data/fetch-roles';
import { RoleTable } from '~/components/role/RoleTable';
import { RoleSearch } from '~/components/role/RoleSearch';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { postMyAccessRequest } from '~/data/fetch-me-info';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ request }: LoaderFunctionArgs): Promise<
    Omit<Response, 'json'> & {
        json(): Promise<any>;
    }
> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const [roleList, responseOrgUnits, userTypesKodeverk, access] = await Promise.all([
        fetchRoles(request, size, page, search, orgUnits),
        fetchAllOrgUnits(request),
        fetchUserTypes(request),
        postMyAccessRequest(request, [
            { url: '/api/roles/123', method: 'GET' },
            { url: '/api/roles/123/members', method: 'GET' },
            { url: '/api/assignments/role/123/resources', method: 'GET' },
        ]),
    ]);

    return json({
        roleList,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        userTypesKodeverk,
        hasAccessToGroupDetails: access.every((a) => a.access),
    });
}

export default function Grupper_index() {
    const data = useLoaderData<typeof loader>();

    const roleList: IRoleList = data.roleList;
    const orgUnitList: IUnitItem[] = data.orgUnitList;
    const size = data.size;

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Grupper'}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<RoleSearch />}
            />
            <RoleTable rolePage={roleList} size={size} />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
