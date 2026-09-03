import { Tabs } from '@navikt/ds-react';
import type { LoaderFunctionArgs } from 'react-router';
import { Link, useLoaderData, useParams, useRouteError } from 'react-router';
import { fetchAssignedDevices } from '~/data/fetch-assignments';
import { BASE_PATH } from '../../environment';
import { TableToolbar } from '~/components/common/Table/Header/TableToolbar';
import { fetchAllOrgUnits, fetchResourceById } from '~/data/fetch-resources';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { BreadcrumbParams } from '~/data/types/generalTypes';
import { IKodeverkUserType } from '~/data/types/kodeverkTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';
import { getOrgUnitAndAllNestedChildren } from '~/components/common/orgUnits/utils';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { fetchDeviceGroups } from '~/data/fetch-devices';
import { IDeviceGroup, IDeviceGroupList } from '~/data/types/deviceTypes';
import { AssignDeviceGroupTable } from '~/components/assignment/NewAssignmentDeviceGroupTable';
import { DeviceSearch } from '~/components/device/DeviceSearch';
import { IResource } from '~/data/types/resourceTypes';

type LoaderData = {
    deviceGroupList: IDeviceGroupList;
    isAssignedDeviceGroup: IDeviceGroup[];
    basePath: string;
    userTypesKodeverk: IKodeverkUserType[];
    resource: IResource;
};

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const resource = await fetchResourceById(request, params.id);

    const allOrgUnitsTree = await fetchAllOrgUnits(request);
    const allOrgUnits = allOrgUnitsTree.orgUnits;

    const resourceOrgUnitsAsIUnitItems = resource.validForOrgUnits
        .map((val) => allOrgUnits.find((unit) => unit.organisationUnitId === val.orgUnitId))
        .filter((unit): unit is IUnitItem => !!unit);

    const validOrgUnitsExpanded = getOrgUnitAndAllNestedChildren(
        resourceOrgUnitsAsIUnitItems,
        allOrgUnits
    );

    const isTopUnit: boolean = resource.validForOrgUnits?.some((ou) => ou.topOrgunit) ?? false;

    const validOrgUnitIds = isTopUnit
        ? []
        : validOrgUnitsExpanded.map((ou) => ou.organisationUnitId);

    const deviceGroupList = await fetchDeviceGroups(
        request,
        size,
        page,
        search,
        orgUnits,
        validOrgUnitIds
    );

    let filter = '';
    deviceGroupList.deviceGroups.forEach((value) => {
        filter += `&devicegroupfilter=${value.id}`;
    });

    const [assignedDeviceGroupList, userTypesKodeverk] = await Promise.all([
        fetchAssignedDevices(request, params.id, size, '0', '', orgUnits, filter),
        fetchUserTypes(request),
    ]);

    const assignedDeviceMap: Map<number, IDeviceGroup> = new Map(
        assignedDeviceGroupList.deviceGroupAssignments.map((role) => [role.id, role])
    );
    const isAssignedDeviceGroup: IDeviceGroup[] = deviceGroupList.deviceGroups.map(
        (deviceGroup) => {
            return {
                ...deviceGroup,
                assigned: assignedDeviceMap.has(deviceGroup.id),
            };
        }
    );

    return {
        deviceGroupList,
        isAssignedDeviceGroup,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        userTypesKodeverk,
        resource,
    };
}

export default function NewAssignmentForDeviceGroup() {
    const { isAssignedDeviceGroup, deviceGroupList, resource } = useLoaderData<LoaderData>();
    const params = useParams<string>();

    return (
        <Tabs.Panel value="maskingrupper">
            <TableToolbar SearchComponent={<DeviceSearch />} />
            <AssignDeviceGroupTable
                isAssignedDeviceGroup={isAssignedDeviceGroup}
                resourceId={params.id}
                currentPage={deviceGroupList.currentPage}
                totalPages={deviceGroupList.totalPages}
                size={deviceGroupList.totalItems}
                totalItems={deviceGroupList.totalItems}
                resourceStatus={resource.status}
            />
        </Tabs.Panel>
    );
}

export const handle = {
    breadcrumb: ({ params }: BreadcrumbParams) => (
        <Link to={`/assignment/resource/${params.id}/devicegroup`} className={'breadcrumb-link'}>
            Maskingruppetildeling
        </Link>
    ),
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
