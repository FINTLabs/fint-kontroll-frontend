import {BASE_PATH, RESOURCE_API_URL} from "../../environment";
import logger from "~/logging/logger";
import {IKodeverkApplicationCategory, IKodeverkUserType} from "~/data/types";

export const fetchResourceDataSource = async (request: Request): Promise<string> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/admin/source/v1`, {
        headers: request.headers
    });

    if (response.ok) {
        return response.text();
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen");
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt");
    }
    throw new Error("En feil oppstod under henting av ressurskilder");
}

export const fetchApplicationCategories = async (request: Request): Promise<IKodeverkApplicationCategory[]> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`, {
        headers: request.headers
    });

    if (response.ok) {
        return response.json();
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen");
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt");
    }
    throw new Error("En feil oppstod under henting av applikasjonskategorier");
}

export const fetchApplicationCategory = async (request: Request, id: string): Promise<IKodeverkApplicationCategory> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`, {
        headers: request.headers
    });

    if (response.ok) {
        return response.json();
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("En feil oppstod under henting av applikasjonskategorien")
}

export const createApplicationCategory = async (
    token: string | null,
    name: string,
    description: string
) => {

    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`

    logger.info("POST New kodeverk - app. category to url:", url, " with body ", JSON.stringify({
        name: name,
        description: description,
    }));

    return await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name: name,
            description: description,
        })

    })
}

export const editApplicationCategory = async (
    token: string | null,
    id: string,
    name: string,
    description: string
) => {

    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`

    logger.info("PUT kodeverk - app. category to url:", url, " with body ", JSON.stringify({
        id: id,
        name: name,
        description: description,
    }));

    return await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            name: name,
            description: description,
        })

    })
}

export const deleteApplicationCategory = async (
    token: string | null,
    id: string
) => {

    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`

    logger.info("DELETE kodeverk - app. category to url:", url);

    return await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'DELETE'

    })
}

export const fetchUserTypes = async (request: Request): Promise<IKodeverkUserType[]> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1`, {
        headers: request.headers
    });

    if (response.ok) {
        return response.json();
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen");
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt");
    }
    throw new Error("En feil oppstod under henting av brukertypene");
}

export const editUserType = async (
    token: string | null,
    id: string,
    label: string,
) => {

    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1/${id}`

    logger.info("PATCH kodeverk - usertype to url:", url, " with body ", JSON.stringify({
        fkLabel: label
    }));

    return await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            fkLabel: label
        })

    })
}
