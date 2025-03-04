import { BASE_PATH, ROLE_API_URL, USER_API_URL } from '../../environment';
import { IMeInfo } from '~/data/types/userTypes';
import { fetchData, sendRequest } from '~/data/helpers';
import { USERS } from '~/data/paths';
import process from 'node:process';

export const fetchMeInfo = async (request: Request): Promise<IMeInfo> => {
    return fetchData(
        `${USER_API_URL}${BASE_PATH}/api/users/me`,
        request,
        'En feil oppstod når vi hentet informasjon om deg, vennligst sjekk at du er logget inn.'
    );
};

// TODO: use this to check if a user can "se more" in the different tabels
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

export const getLandingpageShortcutsAccess = (): { name: string; url: string }[] => [
    { name: 'users', url: `/api/users` },
    { name: 'roles', url: `/api/roles` },
    { name: 'resources', url: `/api/resources/v1` },
    { name: 'adminResource', url: `/api/resources/admin/v1` },

    // { name: 'userAssignments', url: `${process.env.USER_API_URL}${BASE_PATH}/api/users` },
    /*    {
        name: 'userAssignments',
        url: `http://fint-kontroll-user-catalog:8080${BASE_PATH}/api/users`,
    },*/
    // { name: 'resourceAssignments', url: `${basePath}${RESOURCES}` },
    // { name: 'userAssignmentsStudents', url: `${basePath}${USERS}?userType=STUDENT` },
    // { name: 'userAssignmentsEmployees', url: `${basePath}${USERS}?userType=EMPLOYEESTAFF` },
];
