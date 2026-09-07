import { LoaderFunctionArgs, useLoaderData, useRouteError } from 'react-router';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { postMyAccessRequest } from '~/data/fetch-me-info';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';
import { DeviceTable } from '~/components/device/DeviceTable';
import { fetchDeviceGroups } from '~/data/fetch-devices';
import { DeviceSearch } from '~/components/device/DeviceSearch';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const [deviceGroupList, responseOrgUnits, access] = await Promise.all([
        fetchDeviceGroups(request, size, page, search, orgUnits),
        fetchAllOrgUnits(request),
        postMyAccessRequest(request, [{ url: '/api/devicegroups/123', method: 'GET' }]),
    ]);
    return {
        deviceGroupList,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        hasAccessToDeviceGroups: access?.every((a) => a.access),
    };
}

export default function DeviceIndex() {
    const { orgUnitList, deviceGroupList, size } = useLoaderData<typeof loader>();

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Maskingrupper'}
                SearchComponent={<DeviceSearch />}
                orgUnitsForFilter={orgUnitList}
            />
            <DeviceTable deviceGroupList={deviceGroupList} size={size} />
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
