import { fetchData } from '~/data/helpers';
import { ASSIGNMENT_API_URL, BASE_PATH, DEVICE_API_URL } from '../../environment';
import { IDeviceGroup, IDeviceGroupList, IDeviceItemList } from '~/data/types/deviceTypes';
import { IAssignedResourcesList } from '~/data/types/resourceTypes';

export const fetchDeviceGroups = async (
    request: Request,
    size: string,
    page: string,
    search: string,
    orgUnits: string[]
): Promise<IDeviceGroupList> => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    const searchFilter = search ? `&search=${search}` : '';
    const orgUnitsFilter = orgUnits?.length > 0 ? `&orgUnits=${orgUnits.join(',')}` : '';
    return fetchData(
        `${DEVICE_API_URL}${BASE_PATH}/api/devicegroups?${sizeFilter}${pageFilter}${searchFilter}${orgUnitsFilter}`,
        request
    );
};

export const fetchDeviceGroupById = async (
    request: Request,
    id: string | undefined
): Promise<IDeviceGroup> =>
    fetchData(`${DEVICE_API_URL}${BASE_PATH}/api/devicegroups/${id}`, request);

export const fetchDeviceMembersById = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string
): Promise<IDeviceItemList> => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    return fetchData(
        `${DEVICE_API_URL}${BASE_PATH}/api/devicegroups/${id}/members?${sizeFilter}${pageFilter}`,
        request
    );
};

export const fetchAssignedResourcesDeviceGroups = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    resourceType: string,
    resourceFilter: string
): Promise<IAssignedResourcesList> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/devicegroup/${id}/resources?size=${size}&page=${page}&resourceType=${resourceType}${resourceFilter}`,
        request
    );
