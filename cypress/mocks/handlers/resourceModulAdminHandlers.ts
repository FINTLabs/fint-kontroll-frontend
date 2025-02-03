import { http, HttpResponse } from 'msw';

export const resourceModulAdminHandlers = [
    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user*', () => {
        return HttpResponse.json({
            totalItems: 3,
            currentPage: 0,
            totalPages: 1,
            users: [
                {
                    id: '1',
                    resourceId: '1',
                    firstName: 'Petter',
                    lastName: 'Pettersen',
                    userType: 'STUDENT',
                    userName: 'petter@petter.com',
                },
                {
                    id: '2',
                    resourceId: '2',
                    firstName: 'Lurifaks',
                    lastName: 'Bodilsen',
                    userType: 'ADMIN',
                    userName: 'bodilsen@luri.no',
                },
            ],
        });
    }),
];
