import { ASSIGNMENT_API_URL, BASE_PATH, ROLE_API_URL } from '../../environment';
import { IMemberPage, IRole, IRoleList } from '~/data/types/userTypes';
import { IAssignedResourcesList } from '~/data/types/resourceTypes';
import { fetchData } from '~/data/helpers';

export const fetchRoles = async (
    request: Request,
    size: string,
    page: string,
    search: string,
    orgUnits: string[],
    validOrgUnitIds: string[] = [],
    userTypes?: string[]
): Promise<IRoleList> => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    const searchFilter = search ? `&search=${search}` : '';
    const orgUnitsFilter = orgUnits?.length > 0 ? `&orgunits=${orgUnits.join(',')}` : '';
    const validOrgUnitsFilter =
        validOrgUnitIds.length > 0 ? `&validorgunits=${validOrgUnitIds.join(',')}` : '';
    const userTypeFilter =
        userTypes && userTypes.length > 0 ? `&roletype=${userTypes.join(',')}` : '';

    return fetchData(
        `${ROLE_API_URL}${BASE_PATH}/api/roles?${sizeFilter}${pageFilter}${searchFilter}${orgUnitsFilter}${validOrgUnitsFilter}${userTypeFilter}`,
        request
    );
};

export const fetchRoleById = async (request: Request, id: string | undefined): Promise<IRole> =>
    fetchData(`${ROLE_API_URL}${BASE_PATH}/api/roles/${id}`, request);

export const fetchMembers = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    name: string
): Promise<IMemberPage> =>
    fetchData(
        `${ROLE_API_URL}${BASE_PATH}/api/roles/${id}/members?size=${size}&page=${page}&name=${name}`,
        request
    );

export const fetchAssignedResourcesRole = async (
    request: Request,
    id: string | undefined,
    size: string,
    page: string,
    resourceType: string,
    resourceFilter: string
): Promise<IAssignedResourcesList> =>
    fetchData(
        `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/role/${id}/resources?size=${size}&page=${page}&resourceType=${resourceType}${resourceFilter}`,
        request
    );
