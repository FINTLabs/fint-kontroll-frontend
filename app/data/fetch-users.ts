import {BASE_PATH, USER_API_URL} from "../../environment";

export const fetchUsers = async (request: Request, size: string, page: string, search: string, userTypes: string[], orgUnits: string[]) => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    const searchFilter = search ? `&search=${search}` : '';
    const userTypeFilter = userTypes.length > 0 ? `&userType=${userTypes.join(",")}` : "";
    const orgUnitsFilter = orgUnits.length > 0 ? `&orgUnits=${orgUnits.join(",")}` : '';

    const response = await fetch(`${USER_API_URL}${BASE_PATH}/api/users?${sizeFilter}${pageFilter}${searchFilter}${userTypeFilter}${orgUnitsFilter}`, {
        headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")

}

export const fetchUserById = async (request: Request, id: string | undefined) => {
    const response = await fetch(`${USER_API_URL}${BASE_PATH}/api/users/${id}`, {
        headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")

}