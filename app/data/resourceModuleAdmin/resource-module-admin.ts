// This is potentially deprecated. Consider removing
import {ACCESS_MANAGEMENT_API_URL, BASE_PATH} from "../../../environment";
import {changeAppTypeInHeadersAndReturnHeaders} from "~/data/helpers";

export const fetchAssignmentUsers = async (currentPage: number, itemsPerPage: number, orgUnitIds: string[], searchString: string, roleFilter: string) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/users`, {
        body: JSON.stringify({
            currentPage: currentPage, itemsPerPage: itemsPerPage, orgUnitIds: orgUnitIds, searchString: searchString, roleFilter: roleFilter
        })
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

export const postNewTildelingForUser = async (request: Request, resourceId: string, accessRoleId: string, scopeId: string, orgUnitIds: string[], includeSubOrgUnits: boolean) => {

    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment`;

    const response = await fetch(url, {
        method: "POST",
        headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        body: JSON.stringify({
            // userId instead of resourceId - this is because resourceId the actual unique ID for the user, while userId is a table ID.
            accessRoleId: accessRoleId, scopeId: Number(scopeId), userId: resourceId, orgUnitIds: orgUnitIds, includeSubOrgUnits: includeSubOrgUnits
        })
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

export const fetchUsersWhoCanGetAssignments = async (request: Request, currentPage: number, itemsPerPage: number, orgUnitIds: string[], name: string, roleFilter: string) => {

    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString()
    });

    roleFilter ? queryParams.append("accessroleid", roleFilter) : null
    name ? queryParams.append("name", name) : null
    orgUnitIds ? queryParams.append("orgunitid", orgUnitIdsArray.join(",")) : null


    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user?${queryParams}`;

    const response = await fetch(url, {
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

export const fetchUsersWithAssignment = async (request: Request, currentPage: number, itemsPerPage: number, orgUnitIds: string[], name: string, roleFilter: string) => {

    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString()
    });

    roleFilter ? queryParams.append("accessroleid", roleFilter) : null
    name ? queryParams.append("name", name) : null
    orgUnitIds ? queryParams.append("orgunits", orgUnitIdsArray.join(",")) : null


    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/with-assignments?${queryParams}`;

    const response = await fetch(url, {
       headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchUserDetails = async (request: Request, resourceId: string) => {


    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/${resourceId}`;

    const response = await fetch(url, {
        headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchUserAssignments = async (request: Request, resourceId: string, accessRoleId: string, objectType: string, orgUnitName: string, page: number, size: number) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString()
    });

    accessRoleId ? queryParams.append("accessRoleId", accessRoleId) : null
    orgUnitName ? queryParams.append("orgUnitName", orgUnitName) : null
    objectType ? queryParams.append("objectType", objectType) : null

    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/user/${resourceId}/orgunits${queryParams ? '?'+queryParams : ""}`;

    const response = await fetch(url, {
        headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}


export const fetchObjectTypesForUser = async (request: Request, resourceId: string) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}/objecttypes`;

    const response = await fetch(url, {
        headers: request.headers
    });

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const deleteAllAssignmentsOnUser = async (request: Request, resourceId: string) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}`

    const response = await fetch(url, {
        headers: request.headers,
        method: "delete"
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

export const deleteUserAssignmentByAccessRoleId = async (request: Request, resourceId: string, accessRoleId: string, objectTypeToDelete: string) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/user/${resourceId}/role/${accessRoleId}${objectTypeToDelete ? "?objectType=" + objectTypeToDelete : ""}`

    const response = await fetch(url, {
        headers: request.headers,
        method: "delete"
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

export const deleteOrgUnitFromAssignment = async (request: Request, scopeId: string, orgUnitId: string) => {
    const url = `${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessassignment/scope/${scopeId}/orgunit/${orgUnitId}`

    const response = await fetch(url, {
        headers: request.headers,
        method: "delete"
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

const generalErrorResponse = (response: Response) => {
    if (response.status === 500) {
        throw new Error("Noe gikk galt. Feilkode 500")
    }
    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}