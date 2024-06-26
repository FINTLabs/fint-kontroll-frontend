import {BASE_PATH, ORG_UNIT_API_URL, RESOURCE_API_URL} from "../../environment";

export const fetchResources = async (request: Request, size: string, page: string, search: string, orgUnits: string[], applicationCategory: string, accessType: string) => {

    const applicationCategoryParameter = applicationCategory.length > 0 ? `applicationcategory=${applicationCategory}` : undefined
    const accesstypeParameter = accessType.length > 0 ? `accesstype=${accessType}` : undefined

    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/v1?${applicationCategoryParameter}&size=${size}&page=${page}&search=${search}${orgUnits.length > 0 ? '&orgunits=' + orgUnits : ""}&${accesstypeParameter}`, {
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

export const fetchResourceById = async (request: Request, id: string | undefined) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/${id}`, {
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

export const fetchApplicationCategory = async (request: Request) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/applicationcategories`, {
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

export const fetchAccessType = async (request: Request) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/accesstypes`, {
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

export const fetchOrgUnits = async (request: Request) => {
    const response = await fetch(`${ORG_UNIT_API_URL}${BASE_PATH}/api/orgunits`, {
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
