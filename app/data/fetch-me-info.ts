import { BASE_PATH, USER_API_URL } from '../../environment';
import { IMeInfo } from '~/data/types/userTypes';
import { fetchData } from '~/data/helpers';

export const fetchMeInfo = async (request: Request): Promise<IMeInfo> => {
    return fetchData(
        `${USER_API_URL}${BASE_PATH}/api/users/me`,
        request,
        'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
    );
};
