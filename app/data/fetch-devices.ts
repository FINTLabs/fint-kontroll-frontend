import { fetchData } from '~/data/helpers';
import { BASE_PATH, DEVICE_API_URL } from '../../environment';
import {
    IDeviceGroup,
    IDeviceGroupList,
    IDeviceItem,
    IDeviceItemList,
} from '~/data/types/deviceTypes';

export const fetchDeviceGroups = async (
    request: Request,
    size: string,
    page: string
): Promise<IDeviceGroupList> => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    return fetchData(
        `${DEVICE_API_URL}${BASE_PATH}/api/devicegroups?${sizeFilter}${pageFilter}`,
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
