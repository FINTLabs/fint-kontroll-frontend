import logger from '~/logging/logger';

export const handleResponse = async (response: Response, errorMessage: string) => {
    if (response.ok) return response.json();
    if (response.status === 403)
        throw new Error('Det ser ut som om du mangler rettigheter i løsningen');
    if (response.status === 401) throw new Error('Påloggingen din er utløpt');
    throw new Error(errorMessage);
};

export const fetchData = async (
    url: string,
    request: Request,
    defaultErrorMessage = 'En feil oppstod under henting av data'
) => {
    const response = await fetch(url, { headers: request.headers });
    return handleResponse(response, defaultErrorMessage);
};

export const sendRequest = async (
    url: string,
    method: string,
    token: string | null,
    body: object
) => {
    logger.info(`${method} request to url:`, url, ' with body ', JSON.stringify(body));
    return await fetch(url, {
        headers: {
            Authorization: token ?? '',
            'content-type': 'application/json',
        },
        method,
        body: JSON.stringify(body),
    });
};

// Helper function to convert Headers instance to plain object
const headersToObject = (headers: Headers): Record<string, string> => {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
        result[key] = value;
    });
    return result;
};

export const changeAppTypeInHeadersAndReturnHeaders = (
    headers: Headers
): Record<string, string> => {
    const headersObject = headersToObject(headers);
    headersObject['content-type'] = 'application/json';
    return headersObject;
};
