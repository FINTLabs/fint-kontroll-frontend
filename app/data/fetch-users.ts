import { BASE_PATH, USER_API_URL } from '../../environment';
import { IUserDetails, IUserPage } from '~/data/types/userTypes';
import { fetchData } from '~/data/helpers';

export const fetchUsers = async (
    request: Request,
    size: string,
    page: string,
    search: string,
    userTypes: string[],
    orgUnits: string[]
): Promise<IUserPage> => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    const searchFilter = search ? `&search=${search}` : '';
    const userTypeFilter = userTypes.length > 0 ? `&userType=${userTypes.join(',')}` : '';
    const orgUnitsFilter = orgUnits.length > 0 ? `&orgUnits=${orgUnits.join(',')}` : '';

    return fetchData(
        `${USER_API_URL}${BASE_PATH}/api/users?${sizeFilter}${pageFilter}${searchFilter}${userTypeFilter}${orgUnitsFilter}`,
        request
    );
};

export const fetchUserById = async (
    request: Request,
    id: string | undefined
): Promise<IUserDetails> => fetchData(`${USER_API_URL}${BASE_PATH}/api/users/${id}`, request);
