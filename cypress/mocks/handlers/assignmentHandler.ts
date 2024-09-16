import {http, HttpResponse} from "msw";

export const assignmentHandlers = [
    http.post('http://localhost:8061/beta/fintlabs-no/api/assignments', () => {
        return HttpResponse.json({}, {status: 201})
    }),

    http.delete('http://localhost:8061/beta/fintlabs-no/api/assignments/:id', () => {
        return HttpResponse.json({}, {status: 410})
    }),

    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/resource/:id/roles', () => {
        return HttpResponse.json({
            currentPage: 0,
            totalPages: 3,
            size: 50,
            roles: [
                {
                    id: 3,
                    roleName: 'Ansatt - OKO System- og fellestjenester',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '35',
                    organisationUnitName: 'OKO System- og fellestjenester'
                },
                {
                    id: 4,
                    roleName: 'Ansatt - DIGIT Lokasjonssupport sone Fylkeshus',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '1178',
                    organisationUnitName: 'DIGIT Lokasjonssupport sone Fylkeshus'
                },
                {
                    id: 5,
                    roleName: 'Ansatt - INFRA Avdeling for mobilitet og samfunn',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '85',
                    organisationUnitName: 'INFRA Avdeling for mobilitet og samfunn'
                },
                {
                    id: 6,
                    roleName: 'Ansatt - DIGIT Lokasjonssupport',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '50',
                    organisationUnitName: 'DIGIT Lokasjonssupport'
                },
                {
                    id: 7,
                    roleName: 'Ansatt - VGMIDT Administrasjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '195',
                    organisationUnitName: 'VGMIDT Administrasjon'
                },
                {
                    id: 8,
                    roleName: 'Ansatt - DIGIT Fagtjenester',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '47',
                    organisationUnitName: 'DIGIT Fagtjenester'
                },
                {
                    id: 9,
                    roleName: 'Ansatt - VGMIDT Realfag',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '204',
                    organisationUnitName: 'VGMIDT Realfag'
                },
                {
                    id: 10,
                    roleName: 'Ansatt - VGSTOR Administrasjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '205',
                    organisationUnitName: 'VGSTOR Administrasjon'
                },
                {
                    id: 11,
                    roleName: 'Ansatt - DIGIT Arbeidsflate',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '1163',
                    organisationUnitName: 'DIGIT Arbeidsflate'
                },
                {
                    id: 12,
                    roleName: 'Ansatt - Vår fylkeskommune',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '1',
                    organisationUnitName: 'Vår fylkeskommune'
                },
                {
                    id: 13,
                    roleName: 'Ansatt - VGSTOR Tekno',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '218',
                    organisationUnitName: 'VGSTOR Tekno'
                },
                {
                    id: 14,
                    roleName: 'Ansatt - DIGIT Digitaliseringsavdeling',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '36',
                    organisationUnitName: 'DIGIT Digitaliseringsavdeling'
                },
                {
                    id: 15,
                    roleName: 'Ansatt - INFRA Samferdsel',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '8',
                    organisationUnitName: 'INFRA Samferdsel'
                },
                {
                    id: 16,
                    roleName: 'Ansatt - KOMP Fag- og yrkesopplæring',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '161',
                    organisationUnitName: 'KOMP Fag- og yrkesopplæring'
                },
                {
                    id: 17,
                    roleName: 'Ansatt - KOMP Utdanning og kompetanse',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '6',
                    organisationUnitName: 'KOMP Utdanning og kompetanse'
                },
                {
                    id: 18,
                    roleName: 'Ansatt - OKO Regnskapsseksjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '30',
                    organisationUnitName: 'OKO Regnskapsseksjon'
                },
                {
                    id: 19,
                    roleName: 'Ansatt - INFRA Mobilitetsseksjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '93',
                    organisationUnitName: 'INFRA Mobilitetsseksjon'
                },
                {
                    id: 20,
                    roleName: 'Ansatt - DIGIT Tjenesteforvaltning',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '40',
                    organisationUnitName: 'DIGIT Tjenesteforvaltning'
                },
                {
                    id: 21,
                    roleName: 'Ansatt - INFRA Fagavdeling',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '84',
                    organisationUnitName: 'INFRA Fagavdeling'
                },
                {
                    id: 22,
                    roleName: 'Ansatt - FAK Finans og administrasjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '5',
                    organisationUnitName: 'FAK Finans og administrasjon'
                },
                {
                    id: 23,
                    roleName: 'Ansatt - VGMIDT Språk/Økonomi',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '207',
                    organisationUnitName: 'VGMIDT Språk/Økonomi'
                },
                {
                    id: 24,
                    roleName: 'Ansatt - DIGIT Basistjenester',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '46',
                    organisationUnitName: 'DIGIT Basistjenester'
                },
                {
                    id: 25,
                    roleName: 'Ansatt - DIGIT Teknologiseksjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '38',
                    organisationUnitName: 'DIGIT Teknologiseksjon'
                },
                {
                    id: 26,
                    roleName: 'Ansatt - KOMP Forvaltningsutvikling',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '150',
                    organisationUnitName: 'KOMP Forvaltningsutvikling'
                },
                {
                    id: 27,
                    roleName: 'Ansatt - OKO Økonomiavdeling',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '26',
                    organisationUnitName: 'OKO Økonomiavdeling'
                },
                {
                    id: 28,
                    roleName: 'Ansatt - DIGIT Plattform og Kommunikasjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '48',
                    organisationUnitName: 'DIGIT Plattform og Kommunikasjon'
                },
                {
                    id: 29,
                    roleName: 'Ansatt - OKO Budsjett- og finansseksjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '27',
                    organisationUnitName: 'OKO Budsjett- og finansseksjon'
                },
                {
                    id: 30,
                    roleName: 'Ansatt - INFRA Vei- og geofag',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '89',
                    organisationUnitName: 'INFRA Vei- og geofag'
                },
                {
                    id: 31,
                    roleName: 'Ansatt - KOMP Statistikk, analyse, system og administrativ støtte',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '157',
                    organisationUnitName: 'KOMP Statistikk, analyse, system og administrativ støtte'
                },
                {
                    id: 32,
                    roleName: 'Ansatt - DIGIT Lokasjonssupport sone 2',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '1120',
                    organisationUnitName: 'DIGIT Lokasjonssupport sone 2'
                },
                {
                    id: 33,
                    roleName: 'Ansatt - VGMIDT Midtbyen videregående skole',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '194',
                    organisationUnitName: 'VGMIDT Midtbyen videregående skole'
                },
                {
                    id: 34,
                    roleName: 'Ansatt - VGSTOR Storskog videregående skole',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '198',
                    organisationUnitName: 'VGSTOR Storskog videregående skole'
                },
                {
                    id: 35,
                    roleName: 'Ansatt - DIGIT Lokasjonssupport sone 1',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '1119',
                    organisationUnitName: 'DIGIT Lokasjonssupport sone 1'
                },
                {
                    id: 36,
                    roleName: 'Ansatt - VGSTOR Entreprenørskap',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '211',
                    organisationUnitName: 'VGSTOR Entreprenørskap'
                },
                {
                    id: 37,
                    roleName: 'Ansatt - INFRA Fremtidens transporter',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '92',
                    organisationUnitName: 'INFRA Fremtidens transporter'
                },
                {
                    id: 38,
                    roleName: 'Ansatt - KOMP Kompetanseutvikling',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '151',
                    organisationUnitName: 'KOMP Kompetanseutvikling'
                },
                {
                    id: 39,
                    roleName: 'Ansatt - DIGIT Serviceseksjon',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '37',
                    organisationUnitName: 'DIGIT Serviceseksjon'
                },
                {
                    id: 40,
                    roleName: 'Ansatt - KOMP Område sørvest',
                    roleType: 'ansatt',
                    roleSubType: 'ansatt',
                    aggregatedRole: false,
                    organisationUnitId: '153',
                    organisationUnitName: 'KOMP Område sørvest'
                },
                {
                    id: 41,
                    roleName: 'Ansatt - KOMP Område sørvest - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '153',
                    organisationUnitName: 'KOMP Område sørvest'
                },
                {
                    id: 42,
                    roleName: 'Ansatt - DIGIT Teknologiseksjon - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '38',
                    organisationUnitName: 'DIGIT Teknologiseksjon'
                },
                {
                    id: 43,
                    roleName: 'Ansatt - INFRA Samferdsel - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '8',
                    organisationUnitName: 'INFRA Samferdsel'
                },
                {
                    id: 44,
                    roleName: 'Ansatt - INFRA Avdeling for mobilitet og samfunn - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '85',
                    organisationUnitName: 'INFRA Avdeling for mobilitet og samfunn'
                },
                {
                    id: 45,
                    roleName: 'Ansatt - FAK Finans og administrasjon - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '5',
                    organisationUnitName: 'FAK Finans og administrasjon'
                },
                {
                    id: 46,
                    roleName: 'Ansatt - OKO Økonomiavdeling - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '26',
                    organisationUnitName: 'OKO Økonomiavdeling'
                },
                {
                    id: 47,
                    roleName: 'Ansatt - VGMIDT Midtbyen videregående skole - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '194',
                    organisationUnitName: 'VGMIDT Midtbyen videregående skole'
                },
                {
                    id: 48,
                    roleName: 'Ansatt - KOMP Kompetanseutvikling - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '151',
                    organisationUnitName: 'KOMP Kompetanseutvikling'
                },
                {
                    id: 49,
                    roleName: 'Ansatt - Vår fylkeskommune - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '1',
                    organisationUnitName: 'Vår fylkeskommune'
                },
                {
                    id: 50,
                    roleName: 'Ansatt - DIGIT Digitaliseringsavdeling - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '36',
                    organisationUnitName: 'DIGIT Digitaliseringsavdeling'
                },
                {
                    id: 51,
                    roleName: 'Ansatt - KOMP Utdanning og kompetanse - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '6',
                    organisationUnitName: 'KOMP Utdanning og kompetanse'
                },
                {
                    id: 52,
                    roleName: 'Ansatt - OKO Regnskapsseksjon - Aggregert',
                    roleType: 'ansatt',
                    roleSubType: 'organisasjonselement aggregert',
                    aggregatedRole: true,
                    organisationUnitId: '30',
                    organisationUnitName: 'OKO Regnskapsseksjon'
                }
            ],
            totalItems: 130
        })

    })

]