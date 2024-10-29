import {BASE_PATH, RESOURCE_API_URL} from "../../environment";
import logger from "~/logging/logger";
import {
    IKodeverkApplicationCategory,
    IKodeverkLicenseEnforcement,
    IKodeverkLicenseModel,
    IKodeverkUserType
} from "~/data/types";


// TODO: Move this to a common place
const handleResponse = async (response: Response, errorMessage: string) => {
    if (response.ok) return response.json();
    if (response.status === 403) throw new Error("Det ser ut som om du mangler rettigheter i løsningen");
    if (response.status === 401) throw new Error("Påloggingen din er utløpt");
    throw new Error(errorMessage);
};

// TODO: Move this to a common place and use it in all post, put and delete functions
const sendRequest = async (url: string, method: string, token: string | null, body: object) => {
    logger.info(`${method} request to url:`, url, " with body ", JSON.stringify(body));
    return await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method,
        body: JSON.stringify(body)
    });
};

// TODO: Move this to a common place and use it in all fetch functions that expects json
const fetchData = async (url: string, request: Request) => {
    const response = await fetch(url, {headers: request.headers});
    return handleResponse(response, "En feil oppstod under henting av data");
};


export const fetchResourceDataSource = async (request: Request): Promise<string> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/admin/source/v1`, {
        headers: request.headers
    });
    if (response.ok) return response.text();
    return handleResponse(response, "En feil oppstod under henting av ressurskilder");
};

export const fetchApplicationCategories = (request: Request): Promise<IKodeverkApplicationCategory[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`, request);

export const fetchApplicationCategory = (request: Request, id: string): Promise<IKodeverkApplicationCategory> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`, request);


export const createApplicationCategory = (token: string | null, name: string, description: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`, 'POST', token, {
        name,
        description
    });

export const editApplicationCategory = (token: string | null, id: string, name: string, description: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`, 'PUT', token, {
        id,
        name,
        description
    });

export const deleteApplicationCategory = (token: string | null, id: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`, 'DELETE', token, {});

export const fetchUserTypes = (request: Request): Promise<IKodeverkUserType[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1`, request);

export const editUserType = (token: string | null, id: string, label: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1/${id}`, 'PATCH', token, {fkLabel: label});

export const fetchLicenseModels = (request: Request): Promise<IKodeverkLicenseModel[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`, request);

export const fetchLicenseModel = (request: Request, id: string): Promise<IKodeverkLicenseModel> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1/${id}`, request);

export const editLicenseModel = (token: string | null, id: string, name: string, description: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`, 'PUT', token, {
        id,
        name,
        description
    });

export const createLicenseModel = (token: string | null, name: string, description: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`, 'POST', token, {
        name,
        description
    });

export const deleteLicenseModel = (token: string | null, id: string) =>
    sendRequest(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1/${id}`, 'DELETE', token, {});


export const fetchLicenseEnforcements = (request: Request): Promise<IKodeverkLicenseEnforcement[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/handhevingstype/v1`, request);
