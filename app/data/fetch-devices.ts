import { fetchData } from '~/data/helpers';
import { BASE_PATH, DEVICE_API_URL } from '../../environment';
import { IDeviceGroup } from '~/data/types/deviceTypes';

export const fetchDeviceGroups = async (request: Request): Promise<IDeviceGroup> => {
    return fetchData(`${DEVICE_API_URL}${BASE_PATH}/api/devicegroups`, request);
};
