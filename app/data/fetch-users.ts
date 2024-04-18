import {BASE_PATH, USER_API_URL} from "../../environment";

export const fetchUsers = async (token: string | null, size: string, page: string, search: string, userType: string, orgUnits: string[]) => {
    const response = await fetch(`${USER_API_URL}${BASE_PATH}/api/users?size=${size}&page=${page}${search ? '&search=' + search : ""}&userType=${userType}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {

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

export const fetchUserById = async (token: string | null, id: string | undefined) => {
    const response = await fetch(`${USER_API_URL}${BASE_PATH}/api/users/${id}`, {
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