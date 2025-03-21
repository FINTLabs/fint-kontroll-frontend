import { IAccessRole, IMenuItem } from '~/data/types/userTypes';
import { ACCESS_MANAGEMENT_API_URL, BASE_PATH } from '../../environment';
import { fetchData, handleResponse, sendRequest } from '~/data/helpers';

export const fetchAllMenuItems = async (request: Request): Promise<IMenuItem[]> => {
    return fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/menu`,
        request
    );
};

export const fetchMenuItemsForRole = async (
    request: Request,
    roleId?: string
): Promise<IAccessRole> => {
    return fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/menu/role/${roleId}`,
        request
    );
};

export const postMenuItemsForRole = async (
    reqest: Request,
    roleId: string,
    menuItemId: string
): Promise<IAccessRole> => {
    const response = await sendRequest({
        url: `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/menu/addtorole`,
        method: 'POST',
        token: reqest.headers.get('Authorization'),
        body: {
            roleId,
            menuItemId,
        },
    });

    return handleResponse(response, 'Kunne ikke oppdatere rollens menytilgang');
};

export const deleteMenuItemsForRole = async (
    reqest: Request,
    roleId: string,
    menuItemId: string
): Promise<Response> => {
    return sendRequest({
        url: `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/menu/removefromrole`,
        method: 'DELETE',
        token: reqest.headers.get('Authorization'),
        body: {
            roleId,
            menuItemId,
        },
    });
};
