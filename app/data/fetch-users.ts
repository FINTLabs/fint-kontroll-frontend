export const fetchUsers = async (token: string | null, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`http://localhost:8062/beta/fintlabs-no/api/users?size=${size}&page=${page}${search ? '&search=' + search : ""}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {

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
    const response = await fetch(`http://localhost:8062/beta/fintlabs-no/api/users/${id}`, {
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