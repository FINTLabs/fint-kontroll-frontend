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


export const fetchObjectTypes = async (token: string | null) => {
    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessassignment/objecttypes`;

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
