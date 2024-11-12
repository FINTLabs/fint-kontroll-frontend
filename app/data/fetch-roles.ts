import {ASSIGNMENT_API_URL, BASE_PATH, ROLE_API_URL} from "../../environment";
import {IMemberPage} from "~/data/types";

export const fetchRoles = async (request: Request, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgunits=' + orgUnits : ""}`, {
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

export const fetchAssignedResourcesRole = async (request: Request, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/role/${id}/resources?size=${size}&page=${page}`,
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