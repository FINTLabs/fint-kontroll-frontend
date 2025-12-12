import { fetchData } from '~/data/helpers';
import { BASE_PATH, DEVICE_API_URL } from '../../environment';
import { IDeviceGroup, IDeviceItem } from '~/data/types/deviceTypes';

export const fetchDeviceGroups = async (request: Request): Promise<IDeviceGroup> => {
    return fetchData(`${DEVICE_API_URL}${BASE_PATH}/api/devicegroups`, request);
};

export const fetchDeviceGroupById = async (
    request: Request,
    id: string | undefined
): Promise<IDeviceGroup> =>
    fetchData(`${DEVICE_API_URL}${BASE_PATH}/api/devicegroups/${id}`, request);

export const fetchDeviceMembersById = async (
    request: Request,
    id: string | undefined
): Promise<IDeviceItem> =>
    fetchData(`${DEVICE_API_URL}${BASE_PATH}/api/devicegroups/${id}/members`, request);
