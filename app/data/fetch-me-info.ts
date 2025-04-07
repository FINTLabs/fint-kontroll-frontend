import { BASE_PATH, USER_API_URL } from '../../environment';
import { IMeInfo } from '~/data/types/userTypes';
import { fetchData, sendRequest } from '~/data/helpers';

export const fetchMeInfo = async (request: Request): Promise<IMeInfo> => {
    return fetchData(
        `${USER_API_URL}${BASE_PATH}/api/users/me`,
        request,
        'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
    );
};

export const postMyAccessRequest = async (
    request: Request,
    requestUrls: {
        url: string;
        method: string;
    }[]
): Promise<{ url: string; access: boolean }[]> => {
    const response = await sendRequest({
        url: `${USER_API_URL}${BASE_PATH}/api/users/me/hasaccess`,
        method: 'POST',
        token: request.headers.get('Authorization'),
        body: {
            accessRequests: requestUrls.map((url) => ({
                url: url.url,
                method: url.method,
            })),
        },
    });
    return response.json();
};
