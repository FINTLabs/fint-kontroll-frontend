import {ASSIGNMENT_API_URL, BASE_PATH} from "../../environment";
import logger from "~/logging/logger";
import {changeAppTypeInHeadersAndReturnHeaders} from "~/data/helpers";

export const fetchAssignedUsers = async (request: Request, id: string | undefined, size: string, page: string, search: string, userType: string, orgUnits: string[]) => {
    const response = await fetch
    (`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/resource/${id}/users?size=${size}&page=${page}&search=${search}&userType=${userType}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`,
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

export const fetchAssignedResourcesUser = async (request: Request, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/user/${id}/resources?size=${size}&page=${page}`,
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


export const fetchAssignmentsForUser = async (request: Request, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/v2/user/${id}/resources?size=${size}&page=${page}`, {
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

export const fetchAssignedRoles = async (request: Request, id: string | undefined, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/resource/${id}/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {
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

export const fetchAssignmentsForRole = async (request: Request, id: string | undefined, size: string, page: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/role/${id}/resources?size=${size}&page=${page}`, {
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

export const createUserAssignment = async (request: Request, resourceRef: number, userRef: number, organizationUnitId: string) => {
    const url = `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`
    logger.info("POST user assignment to ", url, " with body ", JSON.stringify({
        resourceRef: resourceRef,
        userRef: userRef,
        organizationUnitId: organizationUnitId,
    }));
    const cookies = request.headers.get("cookie");
    logger.info("Cookie: ", cookies);
    const response = await fetch(url, {
        headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        method: 'POST',
        body: JSON.stringify({
            resourceRef: resourceRef,
            userRef: userRef,
            organizationUnitId: organizationUnitId,
        })
    });
    logger.debug("Response from CRETE USER Assignments????", url, response.status);
    return response;
}

/* Dette er opprinnelig
export const createRoleAssignment = async (request: Request, resourceRef: number, roleRef: number, organizationUnitId: string) => {
    const response = await fetch(`${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`, {
        headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        method: 'POST',
        body: JSON.stringify({
            resourceRef: resourceRef,
            roleRef: roleRef,
            organizationUnitId: organizationUnitId,
        })
    });
    return response;
}*/

/* Dette er med masse logger for feilsøking
export const createRoleAssignment = async (request: Request, resourceRef: number, roleRef: number, organizationUnitId: string) => {
    try {
        const url = `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`

        logger.info("POST user assignment to ", url, " with body ", JSON.stringify({
            resourceRef: resourceRef,
            roleRef: roleRef,
            organizationUnitId: organizationUnitId,
        }));
        const cookies = request.headers.get("cookie");
        logger.info("Cookie: ", cookies);

        const response = await fetch(url, {
            headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),

            method: 'POST',
            body: JSON.stringify({
                resourceRef: resourceRef,
                roleRef: roleRef,
                organizationUnitId: organizationUnitId,
            })

        });
        if (response.ok) {
            logger.info("Response from CREATEROLE AASSIGNMENTS!!!", url, response.status);
            return response;
        }

    } catch (error) {

        console.log("Error Fetching data ", error);
        logger.info("Error in CreateRoleAssignment", error)
    }
}
*/
export const createRoleAssignment = async (token: string | null, resourceRef: number, roleRef: number, organizationUnitId: string) => {

    const url = `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments`

    logger.info("POST Role assignment to url:", url, " with body ", JSON.stringify({
        resourceRef: resourceRef,
        roleRef: roleRef,
        organizationUnitId: organizationUnitId,
    }));


    const response = await fetch(url, {
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
    return response
}


export const deleteAssignment = async (request: Request, assignmentRef: string) => {

    const url = `${ASSIGNMENT_API_URL}${BASE_PATH}/api/assignments/${assignmentRef}`
    logger.debug("Delete assignment ", url);
    const response = await fetch(url, {
        headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        method: 'DELETE'
    });
    logger.debug("Response from deleteAssignments", url, response.status);

    return response;
}