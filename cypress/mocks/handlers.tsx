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
import { accessHandlers } from './handlers/accessHandlers';

export const handlers = [
    // Common handlers
    http.get('http://localhost:8062/fintlabs-no/api/users/me', ({ cookies }) => {
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
                menuItems: [
                    {
                        id: 1234,
                        text: 'For systemadministrator',
                        url: '',
                        sortOrder: 0,
                    },
                    {
                        id: 22,
                        url: '/system-admin/definer-rolle',
                        text: 'Definer rolle',
                        sortOrder: 1,
                    },
                    {
                        id: 23,
                        url: '/system-admin/knytt-rettigheter-til-rolle/sa',
                        text: 'Knytt rettigheter til rolle',
                        sortOrder: 2,
                    },
                    {
                        id: 87978,
                        text: 'For ressursadministrator',
                        sortOrder: 2.5,
                        url: '',
                    },
                    {
                        id: 24,
                        url: '/ressurs-admin',
                        text: 'Administrer brukere med rolle',
                        sortOrder: 3,
                    },
                    {
                        id: 25,
                        url: '/ressurs-admin/opprett-ny-tildeling',
                        text: 'Tildel rolle til bruker',
                        sortOrder: 4,
                    },
                    {
                        id: 26,
                        url: '/innstillinger',
                        text: 'Innstillinger',
                        sortOrder: 5,
                    },
                    {
                        id: 56462,
                        text: 'For tjenesteadministrator',
                        sortOrder: 5.5,
                        url: '',
                    },
                    {
                        id: 27,
                        url: '/tjeneste-admin/ressurser',
                        text: 'Ressurser',
                        sortOrder: 6,
                    },
                    {
                        id: 28,
                        url: '/tjeneste-admin/opprett-ny-applikasjonsressurs',
                        text: 'Opprett ny ressurs',
                        sortOrder: 7,
                    },
                    {
                        id: 56575,
                        text: 'For tildeler',
                        url: '',

                        sortOrder: 7.5,
                    },
                    {
                        id: 29,
                        url: '/brukere',
                        text: 'Brukere',
                        sortOrder: 8,
                    },
                    {
                        id: 30,
                        url: '/grupper',
                        text: 'Grupper',
                        sortOrder: 9,
                    },
                    {
                        id: 31,
                        url: '/ressurser',
                        text: 'Ressurser',
                        sortOrder: 10,
                    },
                ],
            });
        }
    }),

    http.get('http://localhost:8060/fintlabs-no/api/orgunits', () => {
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
    ...accessHandlers,
];
