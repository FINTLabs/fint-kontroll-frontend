import {ASSIGNMENT_API_URL, BASE_PATH} from "../../environment";
import logger from "~/logging/logger";

export const fetchAssignedUsers = async (token: string | null, id: string | undefined, size: string, page: string, search: string, userType: string, orgUnits: string[]) => {
    const response = await fetch
    (`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/resource/${id}/users?size=${size}&page=${page}&search=${search}&userType=${userType}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`,
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

export const fetchAssignedResourcesUser = async (token: string | null, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/user/${id}/resources?size=${size}&page=${page}`,
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


export const fetchAssignmentsForUser = async (token: string | null, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/user/${id}/resources?size=${size}&page=${page}`, {
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

export const fetchAssignedRoles = async (token: string | null, id: string | undefined, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/resource/${id}/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {
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

export const fetchAssignmentsForRole = async (token: string | null, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/role/${id}/resources?size=${size}&page=${page}`, {
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

export const createUserAssignment = async (token: string | null, resourceRef: number, userRef: number, organizationUnitId: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            resourceRef: resourceRef,
            userRef: userRef,
            organizationUnitId: organizationUnitId,
        })
    });
        return response;
}

export const createRoleAssignment = async (token: string | null, resourceRef: number, roleRef: number, organizationUnitId: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            resourceRef: resourceRef,
            roleRef: roleRef,
            organizationUnitId: organizationUnitId,
        })
    });
    return response;
}

export const deleteAssignment = async (token: string | null, assignmentRef: string) => {

    const url = `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/${assignmentRef}`
    logger.debug("Delete assignment ", url);
    const response = await fetch(url, {
        headers: {
            Authorization: token ?? ""
        },
        method: 'DELETE'
    });
    logger.debug("Response from deleteAssignments", url, response.status);

    return response;

    /*if (response.status === 410) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    throw new Error("Noe gikk galt!")*/
}