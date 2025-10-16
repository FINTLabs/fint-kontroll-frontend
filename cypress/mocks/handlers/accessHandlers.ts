import { http, HttpResponse } from 'msw';

export const accessHandlers = [
    http.post('http://localhost:8062/fintlabs-no/api/users/me/hasaccess', () => {
        return HttpResponse.json([
            { url: '/api/users/123', access: true },
            { url: '/api/assignments/v2/user/123/resources', access: true },
        ]);
    }),
];
