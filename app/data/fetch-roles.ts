import {ASSIGNMENT_API_URL, BASE_PATH, ROLE_API_URL} from "../../environment";
import {IMemberPage} from "~/data/types";

export const fetchRoles = async (request: Request, size: string, page: string, search: string, orgUnits: string[], userTypes?: string[]) => {
    const sizeFilter = size ? `&size=${size}` : '';
    const pageFilter = page ? `&page=${page}` : '';
    const searchFilter = search ? `&search=${search}` : '';
    const orgUnitsFilter = orgUnits?.length > 0 ? `&orgUnits=${orgUnits.join(",")}` : '';
    const userTypeFilter = userTypes && userTypes.length > 0 ? `&userType=${userTypes.join(",")}` : "";

    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles?${sizeFilter}${pageFilter}${searchFilter}${orgUnitsFilter}${userTypeFilter}`, {
        headers: request.headers,
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

export const fetchRoleById = async (request: Request, id: string | undefined) => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles/${id}`, {
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

export const fetchMembers = async (request: Request, id: string | undefined, size: string, page: string, name: string): Promise<IMemberPage> => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles/${id}/members?size=${size}&page=${page}&name=${name}`, {
        headers: request.headers
    });

    if (response.ok) {
        return response.json()
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")

}

export const fetchAssignedResourcesRole = async (request: Request, id: string | undefined, size: string, page: string, resourceType: string, resourceFilter: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/role/${id}/resources?size=${size}&page=${page}&resourceType=${resourceType}${resourceFilter}`,
        {
            headers: request.headers
        });

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen?")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt!")
    }
    throw new Error("Det virker ikke som om du er pålogget?")

}