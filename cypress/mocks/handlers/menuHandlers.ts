import { http, HttpResponse } from 'msw';

export const menuHandlers = [
    http.get('http://localhost:53989/fintlabs-no/api/accessmanagement/v1/menu', () => {
        return HttpResponse.json([
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
        ]);
    }),
];
