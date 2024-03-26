export const fetchAssignedUsers = async (token: string | null, id: string | undefined, size: string, page: string, search: string, orgUnits: string[]) => {
    const response = await fetch
    (`http://localhost:8061/beta/fintlabs-no/api/assignments/resource/${id}/users?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`,
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
    const response = await fetch(`http://localhost:8061/beta/fintlabs-no/api/assignments/user/${id}/resources?size=${size}&page=${page}`, {
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
    const response = await fetch(`http://localhost:8061/beta/fintlabs-no/api/assignments/resource/${id}/roles?size=${size}&page=${page}&search=${search}&${orgUnits.length > 0 ? 'orgUnits=' + orgUnits : ""}`, {
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
    const response = await fetch(`http://localhost:8061/beta/fintlabs-no/api/assignments/role/${id}/resources?size=${size}&page=${page}`, {
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

export const createAssignment = async (token: string | null, resourceRef: number, userRef: number, organizationUnitId: string) => {
    const response = await fetch('http://localhost:8061/beta/fintlabs-no/api/assignments', {
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

    if (response.ok) {
        return response;
    }
    throw new Error("Nokko gjekk gale!")
}