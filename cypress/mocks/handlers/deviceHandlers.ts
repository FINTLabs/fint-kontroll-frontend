import { http, HttpResponse } from 'msw';

export const deviceHandlers = [
    http.get('http://localhost:8065/fintlabs-no/api/devicegroups', ({ request }) => {
        const search = new URL(request.url).searchParams.get('search') ?? '';

        if (search === 'Group 5') {
            return HttpResponse.json({
                deviceGroups: [
                    {
                        id: 5,
                        sourceId: '5',
                        name: 'Device Group 5',
                        orgUnitId: '1',
                        orgUnitName: 'Vår fylkeskommune',
                        platform: 'Windows',
                        deviceType: 'Ipad',
                    },
                ],
                currentPage: 0,
                totalPages: 1,
                totalItems: 1,
                itemsInPage: 1,
            });
        }

        return HttpResponse.json({
            deviceGroups: [
                {
                    id: 1,
                    sourceId: '2',
                    name: 'Device Group 2',
                    orgUnitId: '5',
                    orgUnitName: 'FAK Finans og administrasjon',
                    platform: 'Windows',
                    deviceType: 'Mobile phone',
                },
                {
                    id: 2,
                    sourceId: '3',
                    name: 'Device Group 3',
                    orgUnitId: '27',
                    orgUnitName: 'OKO Budsjett- og finansseksjon',
                    platform: 'Android',
                    deviceType: 'Laptop',
                },
                {
                    id: 4,
                    sourceId: '1',
                    name: 'Device Group 1',
                    orgUnitId: '1',
                    orgUnitName: 'Vår fylkeskommune',
                    platform: 'Windows',
                    deviceType: 'Ipad',
                },
                {
                    id: 3,
                    sourceId: '4',
                    name: 'Device Group 4',
                    orgUnitId: '27',
                    orgUnitName: 'OKO Budsjett- og finansseksjon',
                    platform: 'Windows',
                    deviceType: 'Mobile phone',
                },
                {
                    id: 5,
                    sourceId: '5',
                    name: 'Device Group 5',
                    orgUnitId: '1',
                    orgUnitName: 'Vår fylkeskommune',
                    platform: 'Windows',
                    deviceType: 'Ipad',
                },
            ],
            currentPage: 0,
            totalPages: 1,
            totalItems: 5,
            itemsInPage: 5,
        });
    }),
];
