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
import { DeviceTable } from '~/components/device/DeviceTable';
import { Search } from '~/components/common/Search';
import { fetchDeviceGroups } from '~/data/fetch-devices';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const [deviceGroup, responseOrgUnits, access] = await Promise.all([
        fetchDeviceGroups(request),
        fetchAllOrgUnits(request),
        postMyAccessRequest(request, [{ url: '/api/devicegroups', method: 'GET' }]),
    ]);

    return {
        deviceGroup,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        hasAccessToDeviceGroups: access?.every((a) => a.access),
    };
}

export default function DeviceIndex() {
    const { orgUnitList } = useLoaderData<typeof loader>();
    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Digitale enheter'}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<Search label={'Søk etter maskingruppe'} id={''} />}
            />
            <DeviceTable />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
