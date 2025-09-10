import logger from '~/logging/logger';

export const handleResponse = async (response: Response, errorMessage: string) => {
    /*logger.info('Request to url: ', response.url, 'returned status: ', response.status);*/
    if (response.ok) return response.json();
    if (response.status === 403)
        throw new Error(
            'Det ser ut som om du mangler rettigheter til den dataen du prøver å hente.'
        );
    if (response.status === 401)
        throw new Error('Påloggingen din er utløpt, vennligst logg inn på nytt.');
    throw new Error(errorMessage);
};

export const fetchData = async (
    url: string,
    request: Request,
    defaultErrorMessage = 'En feil oppstod under henting av data'
) => {
    try {
        const response = await fetch(url, { headers: request.headers });
        return handleResponse(response, defaultErrorMessage);
    } catch (error) {
        throw new Error('Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.');
    }
};

export const sendRequest = async ({
    url,
    method,
    token,
    body,
    stringifiedBody,
}: {
    url: string;
    method: string;
    token: string | null;
    body?: object;
    stringifiedBody?: string;
}) => {
    try {
        logger.info(
            `${method} request to url:`,
            url,
            body ? `with body ${JSON.stringify(body)}` : ''
        );
        return await fetch(url, {
            headers: {
                Authorization: token ?? '',
                'content-type': 'application/json',
            },
            method,
            body: stringifiedBody ?? JSON.stringify(body ?? {}),
        });
    } catch (error) {
        logger.error('Error sending request:', error);
        throw new Error('Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.');
    }
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

export const getErrorTextFromResponse = async (response: Response): Promise<string> => {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('text/plain')) {
        return response.text();
    }
    return 'Ukjent feil';
};
