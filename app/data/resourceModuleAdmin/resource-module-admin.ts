// This is potentially deprecated. Consider removing
export const fetchAssignmentUsers = async (currentPage: number, itemsPerPage: number, orgUnitIds: string[], searchString: string, roleFilter: string) => {
    const response = await fetch(`http://localhost:8062/beta/fintlabs-no/api/accessmanagement/v1/users`, {
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

export const postNewTildelingForUser = async (token: string | null, resourceId: string, accessRoleId: string, scopeId: string, orgUnitIds: string[], includeSubOrgUnits: boolean) => {

    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment`;

    console.log(scopeId)

    const response = await fetch(url, {
        method: "POST",
        headers: ({
            Authorization: token || "",
            'content-type': 'application/json'
        }),
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

export const fetchUsersWhoCanGetAssignments = async (token: string | null, currentPage: number, itemsPerPage: number, orgUnitIds: string[], name: string, roleFilter: string) => {

    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString()
    });

    roleFilter ? queryParams.append("accessroleid", roleFilter) : null
    name ? queryParams.append("name", name) : null
    orgUnitIds ? queryParams.append("orgunitid", orgUnitIdsArray.join(",")) : null


    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user?${queryParams}`;

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
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

export const fetchUsersWithAssignment = async (token: string | null, currentPage: number, itemsPerPage: number, orgUnitIds: string[], name: string, roleFilter: string) => {

    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString()
    });

    roleFilter ? queryParams.append("accessroleid", roleFilter) : null
    name ? queryParams.append("name", name) : null
    orgUnitIds ? queryParams.append("orgunits", orgUnitIdsArray.join(",")) : null


    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user/with-assignments?${queryParams}`;

    const response = await fetch(url, {
       headers: ({
           Authorization: token || ""
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

export const fetchUserDetails = async (token: string | null, resourceId: string) => {


    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user/${resourceId}`;

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
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

export const fetchUserAssignments = async (token: string | null, resourceId: string, accessRoleId: string, objectType: string, orgUnitName: string, page: number, size: number) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString()
    });

    accessRoleId ? queryParams.append("accessRoleId", accessRoleId) : null
    orgUnitName ? queryParams.append("orgUnitName", orgUnitName) : null
    objectType ? queryParams.append("objectType", objectType) : null

    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user/${resourceId}/orgunits${queryParams ? '?'+queryParams : ""}`;

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
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


export const fetchObjectTypesForUser = async (token: string | null, resourceId: string) => {
    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment/user/${resourceId}/objecttypes`;

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
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

export const deleteAllAssignmentsOnUser = async (token: string | null, resourceId: string) => {
    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment/user/${resourceId}`

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
        }),
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

export const deleteUserAssignmentByAccessRoleId = async (token: string | null, resourceId: string, accessRoleId: string, objectTypeToDelete: string) => {
    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment/user/${resourceId}/role/${accessRoleId}${objectTypeToDelete ? "?objectType=" + objectTypeToDelete : ""}`

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
        }),
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

export const deleteOrgUnitFromAssignment = async (token: string | null, scopeId: string, orgUnitId: string) => {
    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment/scope/${scopeId}/orgunit/${orgUnitId}`

    const response = await fetch(url, {
        headers: ({
            Authorization: token || ""
        }),
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