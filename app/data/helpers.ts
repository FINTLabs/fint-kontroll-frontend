import logger from '~/logging/logger';

const statusMessages: Record<number, string> = {
    400: 'Ugyldig forespørsel. Kontroller input.',
    401: 'Påloggingen din er utløpt, vennligst logg inn på nytt.',
    403:
        'Noe gikk galt under henting av data. Det kan skyldes manglende rettigheter i løsningen, ' +
        'eller en feil i FINT Kontroll.',
    404: 'Beklager, kan ikke finne det du ønsker å se.',
    409: 'Det oppstod en konflikt med eksisterende data.',
    422: 'Handlingen kunne ikke gjennomføres. Kan skyldes feil i data.',
};

export const handleResponse = async (
    response: Response,
    defaultErrorMessage: string,
    correlationId?: string | null,
    requestUrl?: string
) => {
    if (response.ok) {
        return response.json();
    }

    const message = statusMessages[response.status] ?? defaultErrorMessage;
    const errorCode = response.status >= 400 ? response.status : response.statusText;

    throw {
        message,
        status: response.status,
        correlationId: correlationId ?? null,
        url: requestUrl,
        errorCode,
        timestamp: new Date().toISOString(),
    };
};

export const fetchData = async (
    url: string,
    request: Request,
    defaultErrorMessage = 'En feil oppstod under henting av data'
) => {
    try {
        const response = await fetch(url, { headers: request.headers });

        const correlationId = response.headers.get('x-correlation-id');
        if (correlationId) {
            logger.info('Correlation ID:', correlationId);
            // logger.debug('Correlation ID:', correlationId);
        }

        return handleResponse(response, defaultErrorMessage, correlationId, url);
    } catch (error: any) {
        throw {
            message: 'Kunne ikke kontakte tjenesten. Vennligst vent litt og prøv igjen.',
            correlationId: null,
            status: 0,
            url,
            timestamp: new Date().toISOString(),
        };
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
            body: stringifiedBody ?? (body ? JSON.stringify(body) : undefined),
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
