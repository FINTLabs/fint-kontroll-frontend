import { BASE_PATH, RESOURCE_API_URL } from '../../environment';
import { fetchData, handleResponse, sendRequest } from '~/data/helpers';
import {
    IKodeverkApplicationCategory,
    IKodeverkLicenceEnforcement,
    IKodeverkLicenseModel,
    IKodeverkUserType,
} from '~/data/types/kodeverkTypes';

export const fetchResourceDataSource = async (request: Request): Promise<string> => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/admin/source/v1`, {
        headers: request.headers,
    });
    if (response.ok) return response.text();
    return handleResponse(response, 'En feil oppstod under henting av ressurskilder');
};

export const fetchApplicationCategories = (
    request: Request
): Promise<IKodeverkApplicationCategory[]> =>
    fetchData(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`,
        request
    );

export const fetchApplicationCategory = (
    request: Request,
    id: string
): Promise<IKodeverkApplicationCategory> =>
    fetchData(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`,
        request
    );

export const createApplicationCategory = (
    token: string | null,
    name: string,
    description: string
) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`,
        'POST',
        token,
        {
            name,
            description,
        }
    );

export const editApplicationCategory = (
    token: string | null,
    id: string,
    name: string,
    description: string
) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1`,
        'PUT',
        token,
        {
            id,
            name,
            description,
        }
    );

export const deleteApplicationCategory = (token: string | null, id: string) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/applikasjonskategori/v1/${id}`,
        'DELETE',
        token,
        {}
    );

export const fetchUserTypes = (request: Request): Promise<IKodeverkUserType[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1`, request);

export const editUserType = (token: string | null, id: string, label: string) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/brukertype/v1/${id}`,
        'PATCH',
        token,
        { fkLabel: label }
    );

export const fetchLicenseModels = (request: Request): Promise<IKodeverkLicenseModel[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`, request);

export const fetchLicenseModel = (request: Request, id: string): Promise<IKodeverkLicenseModel> =>
    fetchData(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1/${id}`,
        request
    );

export const editLicenseModel = (
    token: string | null,
    id: string,
    name: string,
    description: string
) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`,
        'PUT',
        token,
        {
            id,
            name,
            description,
        }
    );

export const createLicenseModel = (token: string | null, name: string, description: string) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1`,
        'POST',
        token,
        {
            name,
            description,
        }
    );

export const deleteLicenseModel = (token: string | null, id: string) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/lisensmodell/v1/${id}`,
        'DELETE',
        token,
        {}
    );

export const fetchLicenseEnforcements = (
    request: Request
): Promise<IKodeverkLicenceEnforcement[]> =>
    fetchData(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/handhevingstype/v1`, request);

export const editLicenseEnforcement = (token: string | null, id: string, label: string) =>
    sendRequest(
        `${RESOURCE_API_URL}${BASE_PATH}/api/resources/kodeverk/handhevingstype/v1/${id}`,
        'PATCH',
        token,
        { fkLabel: label }
    );
