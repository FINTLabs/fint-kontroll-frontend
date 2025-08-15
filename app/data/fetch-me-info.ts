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

/*export const fetchMeInfo = async (request: Request): Promise<IMeInfo> => {
    const url = `${USER_API_URL}${BASE_PATH}/api/users/me`;

    const res = await fetch(url, {
        credentials: 'include',
        method: request.method,
        headers: request.headers,
        body: request.body,
        signal: request.signal,
    });

    // Logg status
    console.log(`Response fra url fra test på Me ${url}`);
    console.log('Status fra test på Me:', res.status);

    // Logg headers
    for (const [key, value] of res.headers.entries()) {
        console.log(`Header fra test på Me: ${key} = ${value}`);
    }

    // Les body som tekst og logg
    const resClone = res.clone();
    const textBody = await resClone.text();
    console.log('Body fra test på Me:', textBody || '(tom)');

    // Returner som JSON (som før)
    return res.json();
};*/

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
