import {ASSIGNMENT_API_URL, BASE_PATH, ROLE_API_URL} from "../../environment";

export const fetchRoles = async (token: string | null, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {
        headers: {Authorization: token ?? ""}
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

export const fetchRoleById = async (token: string | null, id: string | undefined) => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles/${id}`, {
        headers: {Authorization: token ?? ""}
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

export const fetchMembers = async (token: string | null, id: string | undefined, size: string, page: string, search: string) => {
    const response = await fetch(`${ROLE_API_URL}${BASE_PATH}/api/roles/${id}/members?size=${size}&page=${page}&search=${search}`, {
        headers: {Authorization: token ?? ""}
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

export const fetchAssignedResourcesRole = async (token: string | null, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/role/${id}/resources?size=${size}&page=${page}`,
        {
            headers: {Authorization: token ?? ""}
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