import React from 'react';
import { useLoaderData, useRouteError } from '@remix-run/react';
import type { IRoleList } from '~/data/types/userTypes';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { fetchRoles } from '~/data/fetch-roles';
import { RoleTable } from '~/components/role/RoleTable';
import { RoleSearch } from '~/components/role/RoleSearch';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { getSizeCookieFromRequestHeader } from '~/components/common/CommonFunctions';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const [roleList, responseOrgUnits, userTypesKodeverk] = await Promise.all([
        fetchRoles(request, size, page, search, orgUnits),
        fetchAllOrgUnits(request),
        fetchUserTypes(request),
    ]);

    return {
        roleList,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        userTypesKodeverk,
    };
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
