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

export const fetchUsersWithAssignment = async (token: string | null, currentPage: number, itemsPerPage: number, orgUnitIds: string[], searchString: string, roleFilter: string) => {

    const orgUnitIdsArray = Array.isArray(orgUnitIds) ? orgUnitIds : [orgUnitIds];
    const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        size: itemsPerPage.toString()
    });

    roleFilter ? queryParams.append("role", roleFilter) : null
    searchString ? queryParams.append("search", searchString) : null
    orgUnitIds ? queryParams.append("orgUnits", orgUnitIdsArray.join(",")) : null


    const url = `http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user/with-assignments?${queryParams}`;
    console.log(url)

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