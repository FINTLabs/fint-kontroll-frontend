import { ASSIGNMENT_API_URL, BASE_PATH } from '../../environment';
import { fetchData, sendRequest } from '~/data/helpers';
import { IAssignedResourcesList, IAssignmentPage } from '~/data/types/resourceTypes';
import { IAssignedRoles, IAssignedUsers } from '~/data/types/userTypes';

export const fetchAssignedUsers = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    search: string,
    userType: string,
    orgUnits: string[],
    userFilter?: string
): Promise<IAssignedUsers> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/resource/${id}/users?size=${size}&page=${page}&search=${search}&userType=${userType}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ''}${userFilter}`,
        request
    );

export const fetchAssignedResourcesForUser = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    resourceType: string,
    resourceFilter: string
): Promise<IAssignedResourcesList> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/user/${id}/resources?size=${size}&page=${page}&resourceType=${resourceType}${resourceFilter}`,
        request
    );

export const fetchAssignmentsForUser = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string
): Promise<IAssignmentPage> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/user/${id}/resources?size=${size}&page=${page}`,
        request
    );

export const fetchAssignedRoles = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    search: string,
    orgUnits: string[],
    roleFilter?: string
): Promise<IAssignedRoles> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/resource/${id}/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ''}${roleFilter}`,
        request
    );

export const fetchAssignmentsForRole = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string
): Promise<IAssignmentPage> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/role/${id}/resources?size=${size}&page=${page}`,
        request
    );

export const createUserAssignment = async (
    token: string | null,
    resourceRef: number,
    userRef: number,
    organizationUnitId: string
) =>
    sendRequest({
        url: `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`,
        method: 'POST',
        token: token,
        body: {
            resourceRef: resourceRef,
            userRef: userRef,
            organizationUnitId: organizationUnitId,
        },
    });

export const createRoleAssignment = async (
    token: string | null,
    resourceRef: number,
    roleRef: number,
    organizationUnitId: string
) =>
    sendRequest({
        url: `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`,
        method: 'POST',
        token: token,
        body: {
            resourceRef: resourceRef,
            roleRef: roleRef,
            organizationUnitId: organizationUnitId,
        },
    });

export const deleteAssignment = async (token: string | null, assignmentRef: string) =>
    sendRequest({
        url: `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/${assignmentRef}`,
        method: 'DELETE',
        token: token,
    });
