import { http, HttpResponse } from 'msw';
import {
    createNewResourceHandlers,
    deleteResourceHandlers,
    resourceAdminHandlers,
    resourceHandlers,
} from './handlers/resourceHandlers';
import { roleHandlers } from './handlers/roleHandlers';
import { usersHandlers } from './handlers/usersHandlers';
import { kontrollAdminHandlers } from './handlers/kontrollAdminHandlers';
import { resourceModulAdminHandlers } from './handlers/resourceModulAdminHandlers';
import { assignmentHandlers } from './handlers/assignmentHandler';
import { applicationCategoriesHandlers } from './handlers/kodeverkHandlers';
import { menuHandlers } from './handlers/menuHandlers';

export const handlers = [
    // Common handlers
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', ({ cookies }) => {
        if (cookies.cypresstestuser === 'ra') {
            return HttpResponse.json({
                firstName: 'Mock',
                lastName: 'Name',
                mail: 'mock@novari.no',
                organisationId: 'mock.no',
                roles: [
                    {
                        id: 'ra',
                        name: 'Ressursadministrator',
                    },
                ],
            });
        } else if (cookies.cypresstestuser === 'ta') {
            return HttpResponse.json({
                firstName: 'Mock',
                lastName: 'Name',
                mail: 'mock@novari.no',
                organisationId: 'mock.no',
                roles: [
                    {
                        id: 'ta',
                        name: 'Tjenesteadministrator',
                    },
                ],
            });
        } else if (cookies.cypresstestuser === 'td') {
            return HttpResponse.json({
                firstName: 'Mock',
                lastName: 'Name',
                mail: 'mock@novari.no',
                organisationId: 'mock.no',
                roles: [
                    {
                        id: 'td',
                        name: 'Tildeler',
                    },
                ],
            });
        } else {
            return HttpResponse.json({
                firstName: 'Mock',
                lastName: 'Name',
                mail: 'mock@novari.no',
                organisationId: 'mock.no',
                roles: [
                    {
                        id: 'pa',
                        name: 'Portaladmin',
                    },
                    {
                        id: 'l',
                        name: 'Leder',
                    },
                    {
                        id: 'sa',
                        name: 'Systemadministrator',
                    },
                    {
                        id: 'sb',
                        name: 'Sluttbruker',
                    },
                    {
                        id: 'ta',
                        name: 'Tjenesteadministrator',
                    },
                    {
                        id: 'td',
                        name: 'Tildeler',
                    },
                ],
            });
        }
    }),

    http.get('http://localhost:8060/beta/fintlabs-no/api/orgunits', () => {
        return HttpResponse.json({
            totalItems: 3,
            orgUnits: [
                {
                    id: 1,
                    name: 'org1',
                    organisationUnitId: '1',
                    parentRef: '1',
                    parentName: null,
                    childrenRef: ['2'],
                },
                {
                    id: 2,
                    name: 'org2',
                    organisationUnitId: '2',
                    parentRef: '1',
                    parentName: null,
                    childrenRef: [''],
                },
                {
                    id: 3,
                    name: 'org3',
                    organisationUnitId: '3',
                    parentRef: '',
                    parentName: null,
                    childrenRef: [''],
                },
            ],
        });
    }),
    ...resourceModulAdminHandlers,
    ...kontrollAdminHandlers,
    ...usersHandlers,
    ...roleHandlers,
    ...resourceHandlers,
    ...assignmentHandlers,
    ...resourceAdminHandlers,
    ...createNewResourceHandlers,
    ...deleteResourceHandlers,
    ...applicationCategoriesHandlers,
    ...menuHandlers,
];
