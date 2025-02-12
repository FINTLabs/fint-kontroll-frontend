import { BASE_PATH, USER_API_URL } from '../../environment';
import logger from '~/logging/logger';
import { IMeInfo } from '~/data/types/userTypes';

export const fetchMeInfo = async (request: Request): Promise<IMeInfo> => {
    const url = `${USER_API_URL}${BASE_PATH}/api/users/me`;
    const response = await fetch(url, {
        headers: request.headers,
    });

    logger.debug('Response from ', url, response);

    if (response.ok) {
        return response.json();
    }

    if (response.status === 403) {
        throw new Error('Det ser ut som om du mangler rettigheter i løsningen');
    }
    if (response.status === 401) {
        throw new Error('Påloggingen din er utløpt');
    }
    throw new Error('Det virker ikke som om du er pålogget');
};
