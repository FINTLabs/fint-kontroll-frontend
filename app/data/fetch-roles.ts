export const fetchRoles = async (token: string | null, size: string, page: string, search: string) => {
    const response = await fetch(`http://localhost:8064/beta/fintlabs-no/api/roles?size=${size}&page=${page}&search=${search}`, {
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