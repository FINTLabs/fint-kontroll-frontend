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