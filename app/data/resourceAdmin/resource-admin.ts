import { ACCESS_MANAGEMENT_API_URL, BASE_PATH } from '../../../environment';
import { fetchData, sendRequest } from '~/data/helpers';
import {
    IResourceModuleUser,
    IResourceModuleUserAssignmentsPaginated,
    IResourceModuleUsersPage,
} from '~/data/types/resourceTypes';

export const postNewTildelingForUser = async (
    token: string | null,
    resourceId: string,
    accessRoleId: string,
    scopeId: string,
    orgUnitIds: string[],
    includeSubOrgUnits: boolean
) =>
    sendRequest({
        url: `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment`,
        method: 'POST',
        token: token,
        body: {
            accessRoleId: accessRoleId,
            scopeId: Number(scopeId),
            userId: resourceId,
            orgUnitIds: orgUnitIds,
            includeSubOrgUnits: includeSubOrgUnits,
        },
    });

export const fetchUsersWhoCanGetAssignments = async (
    request: Request,
    currentPage: number,
    itemsPerPage: number,
    orgUnitIds: string[],
    name: string,
    roleFilter: string
): Promise<IResourceModuleUsersPage> => {
    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString(),
    });

    roleFilter ? queryParams.append('accessroleid', roleFilter) : null;
    name ? queryParams.append('name', name) : null;
    orgUnitIds ? queryParams.append('orgunitid', orgUnitIdsArray.join(',')) : null;

    return fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user?${queryParams}`,
        request
    );
};

export const fetchUsersWithAssignment = async (
    request: Request,
    currentPage: number,
    itemsPerPage: number,
    orgUnitIds: string[],
    name: string,
    roleFilter: string
): Promise<IResourceModuleUsersPage> => {
    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString(),
    });

    roleFilter ? queryParams.append('accessroleid', roleFilter) : null;
    name ? queryParams.append('name', name) : null;
    orgUnitIds ? queryParams.append('orgunits', orgUnitIdsArray.join(',')) : null;

    return fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/with-assignments?${queryParams}`,
        request
    );
};

export const fetchUserDetails = async (
    request: Request,
    resourceId: string
): Promise<IResourceModuleUser> =>
    fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/${resourceId}`,
        request
    );

export const fetchUserAssignments = async (
    request: Request,
    resourceId: string,
    accessRoleId: string,
    objectType: string,
    orgUnitName: string,
    page: number,
    size: number
): Promise<IResourceModuleUserAssignmentsPaginated> => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
    });

    accessRoleId ? queryParams.append('accessRoleId', accessRoleId) : null;
    orgUnitName ? queryParams.append('orgUnitName', orgUnitName) : null;
    objectType ? queryParams.append('objectType', objectType) : null;

    return fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/${resourceId}/orgunits${queryParams ? '?' + queryParams : ''}`,
        request
    );
};

export const fetchObjectTypesForUser = async (
    request: Request,
    resourceId: string
): Promise<string[]> =>
    fetchData(
        `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}/objecttypes`,
        request
    );

export const deleteAllAssignmentsOnUser = async (request: Request, resourceId: string) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}`;
    return sendRequest({
        url,
        method: 'DELETE',
        token: request.headers.get('Authorization'),
    });
};

export const deleteUserAssignmentByAccessRoleId = async (
    request: Request,
    resourceId: string,
    accessRoleId: string,
    objectTypeToDelete: string
) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}/role/${accessRoleId}${objectTypeToDelete ? '?objectType=' + objectTypeToDelete : ''}`;
    return sendRequest({
        url,
        method: 'DELETE',
        token: request.headers.get('Authorization'),
    });
};

export const deleteOrgUnitFromAssignment = async (
    request: Request,
    scopeId: string,
    orgUnitId: string
) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/scope/${scopeId}/orgunit/${orgUnitId}`;
    return sendRequest({
        url,
        method: 'DELETE',
        token: request.headers.get('Authorization'),
    });
};
