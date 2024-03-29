export const fetchRoles = async (token: string | null, size: string, page: string, search: string, orgunits: string[]) => {
    const response = await fetch(`http://localhost:8064/beta/fintlabs-no/api/roles?size=${size}&page=${page}&search=${search}&${orgunits.length > 0 ? 'orgunits=' + orgunits : ""}`, {
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
    const response = await fetch(`http://localhost:8064/beta/fintlabs-no/api/roles/${id}`, {
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
    const response = await fetch(`http://localhost:8064/beta/fintlabs-no/api/roles/${id}/members?size=${size}&page=${page}&search=${search}`, {
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
