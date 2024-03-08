export const fetchResources = async (token: string | null, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch(`http://localhost:8063/beta/fintlabs-no/api/resources?size=${size}&page=${page}&search=${search}${orgUnits.length > 0 ? '&orgUnits=' + orgUnits : ""}`, {
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


export const fetchResourceById = async (token: string | null, id: string | undefined) => {
    const response = await fetch(`http://localhost:8063/beta/fintlabs-no/api/resources/${id}`, {
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

export const fetchOrgUnits = async (token: string | null) => {
    const response = await fetch(`http://localhost:8060/beta/fintlabs-no/api/orgunits`, {
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
