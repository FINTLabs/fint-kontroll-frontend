import { ACCESS_MANAGEMENT_API_URL, BASE_PATH } from '../../../environment';
import { IAccessRole, IFeature, IPermissionData } from '~/data/types/userTypes';
import { fetchData, sendRequest } from '~/data/helpers';

export const fetchAllFeatures = async (request: Request): Promise<IFeature[]> =>
    fetchData(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/feature`, request);

export const fetchAccessRoles = async (request: Request): Promise<IAccessRole[]> =>
    fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessrole`,
        request
    );

export const fetchFeaturesInRole = async (
    request: Request,
    roleId: string | undefined
): Promise<IPermissionData> =>
    fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`,
        request
    );

export const putPermissionDataForRole = async (request: Request, updatedPermissionRole: string) => {
    return sendRequest({
        url: `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission`,
        method: 'PUT',
        token: request.headers.get('Authorization'),
        stringifiedBody: updatedPermissionRole,
    });
};
