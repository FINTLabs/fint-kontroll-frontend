import { http, HttpResponse } from 'msw'

export const resourceHandlers = [
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources', () => {
        return HttpResponse.json(
            {
                "totalPages": 1,
                "currentPage": 0,
                "totalItems": 7,
                "size": 10,
                "resources": [
                    {
                        "id": 5,
                        "resourceId": "ff75076c4ce53f5ca51b1cbb",
                        "resourceName": "Creative Cloud All Apps for K-12 - User License",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 10000
                    },
                    {
                        "id": 4,
                        "resourceId": "f887f35a0fab01f3e3e2c5c2",
                        "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 25
                    },
                    {
                        "id": 62,
                        "resourceId": "ff75076c4ce53f5ca518989",
                        "resourceName": "Solid Works Edu",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50
                    },
                    {
                        "id": 53,
                        "resourceId": "ff75076c4ce53f5ca51b1ccb",
                        "resourceName": "TOtally LegIt textbooks",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 10000
                    },
                    {
                        "id": 44,
                        "resourceId": "f887f35a0fab01f3e3e2c5c3",
                        "resourceName": "Flash Media Player",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 25
                    },
                    {
                        "id": 61,
                        "resourceId": "ff75076c4ce53f5ca518949",
                        "resourceName": "Powerpoint",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50
                    },
                    {
                        "id": 66,
                        "resourceId": "ff75076c4ce53f5ca513989",
                        "resourceName": "Runekit",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50
                    },
                ]
            }
        )
    }),

    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/:id', () => {
        return HttpResponse.json(
        {
                "id": 5,
                "resourceId": "ff75076c4ce53f5ca51b1cbb",
                "resourceName": "Creative Cloud All Apps for K-12 - User License",
                "resourceType": "ApplicationResource",
                "identityProviderGroupName": "-pre-app-creative.cloud.all.apps.for.k-12.-.user.license-suff-",
                "applicationAccessType": null,
                "applicationAccessRole": null,
                "platform": [
                    "win",
                    "mac"
                ],
                "accessType": "Device based license",
                "resourceLimit": 10000,
                "resourceOwnerOrgUnitId": "153",
                "resourceOwnerOrgUnitName": "KOMP Område sørvest",
                "validForOrgUnits": [
                    {
                        "id": 172,
                        "resourceId": "ff75076c4ce53f5ca51b1cbb",
                        "orgUnitId": "198",
                        "orgUnitName": "VGSTOR Storskog videregående skole",
                        "resourceLimit": 200
                    },
                    {
                        "id": 173,
                        "resourceId": "ff75076c4ce53f5ca51b1cbb",
                        "orgUnitId": "153",
                        "orgUnitName": "KOMP Område sørvest",
                        "resourceLimit": 300
                    },
                    {
                        "id": 174,
                        "resourceId": "ff75076c4ce53f5ca51b1cbb",
                        "orgUnitId": "1178",
                        "orgUnitName": "DIGIT Lokasjonssupport sone Fylkeshus",
                        "resourceLimit": 500
                    }
                ],
                "validForRoles": [
                    "Elev",
                    "Ansatt skole"
                ],
                "applicationCategory": [
                    "Pedagogisk programvare"
                ],
                "basePath": "/beta/fintlabs-no"
            },
        )
    }),

    // For fetching Brukere
    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/resource/:id/users', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10"
        const page = new URL(request.url).searchParams.get('page') ?? "0"
        const search = new URL(request.url).searchParams.get('search') ?? "0"
        const userType = new URL(request.url).searchParams.get('userType') ?? "0"

        if(userType === "STUDENT") {
            return HttpResponse.json(
                {
                    "totalItems": 7,
                    "size": 10,
                    "totalPages": 1,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 1266,
                            "firstName": "Bente",
                            "lastName": "Nordli",
                            "userType": "STUDENT",
                            "assignmentRef": 398,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1308,
                            "firstName": "Brit",
                            "lastName": "Holm",
                            "userType": "STUDENT",
                            "assignmentRef": 410,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1286,
                            "firstName": "Egil",
                            "lastName": "Nordby",
                            "userType": "STUDENT",
                            "assignmentRef": 400,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1284,
                            "firstName": "Emil",
                            "lastName": "Jacobsen",
                            "userType": "STUDENT",
                            "assignmentRef": 399,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1248,
                            "firstName": "Guro",
                            "lastName": "Danielsen",
                            "userType": "STUDENT",
                            "assignmentRef": 404,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1232,
                            "firstName": "Joanna",
                            "lastName": "Kristoffersen",
                            "userType": "STUDENT",
                            "assignmentRef": 356,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1258,
                            "firstName": "Jorun",
                            "lastName": "Jacobsen",
                            "userType": "STUDENT",
                            "assignmentRef": 397,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        if(search === "Bente") {
            return HttpResponse.json(
                {
                    "totalItems": 1,
                    "size": 1,
                    "totalPages": 1,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 1266,
                            "firstName": "Bente",
                            "lastName": "Nordli",
                            "userType": "STUDENT",
                            "assignmentRef": 398,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        if(size === "5" && page === "0") {
            return HttpResponse.json(
            {
                    "totalItems": 17,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 1044,
                            "firstName": "Test",
                            "lastName": "Testesen",
                            "userType": "EMPLOYEESTAFF",
                            "assignmentRef": 407,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "161",
                            "organisationUnitName": "KOMP Fag- og yrkesopplæring"
                        },
                        {
                            "id": 1266,
                            "firstName": "Bente",
                            "lastName": "Nordli",
                            "userType": "STUDENT",
                            "assignmentRef": 398,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1308,
                            "firstName": "Brit",
                            "lastName": "Holm",
                            "userType": "STUDENT",
                            "assignmentRef": 410,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1147,
                            "firstName": "Egil",
                            "lastName": "Johnsen",
                            "userType": "EMPLOYEEFACULTY",
                            "assignmentRef": 406,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 884,
                            "firstName": "Egil",
                            "lastName": "Martinsen",
                            "userType": "EMPLOYEEFACULTY",
                            "assignmentRef": 405,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "204",
                            "organisationUnitName": "VGMIDT Realfag"
                        }
                    ]
                }
            )
        }

        if(size === "5" && page === "1") {
            return HttpResponse.json(
                {
                    "totalItems": 17,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 1,
                    "users": [
                        {
                            "id": 1286,
                            "firstName": "Egil",
                            "lastName": "Nordby",
                            "userType": "STUDENT",
                            "assignmentRef": 400,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1284,
                            "firstName": "Emil",
                            "lastName": "Jacobsen",
                            "userType": "STUDENT",
                            "assignmentRef": 399,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1248,
                            "firstName": "Guro",
                            "lastName": "Danielsen",
                            "userType": "STUDENT",
                            "assignmentRef": 404,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1232,
                            "firstName": "Joanna",
                            "lastName": "Kristoffersen",
                            "userType": "STUDENT",
                            "assignmentRef": 356,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "id": 1258,
                            "firstName": "Jorun",
                            "lastName": "Jacobsen",
                            "userType": "STUDENT",
                            "assignmentRef": 397,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "organisationUnitId": "198",
                            "organisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        return HttpResponse.json(
        {
                "totalItems": 17,
                "size": 10,
                "totalPages": 2,
                "currentPage": 0,
                "users": [
                    {
                        "id": 442,
                        "firstName": "Karen",
                        "lastName": "Berg",
                        "userType": "STUDENT",
                        "assignmentRef": 407,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "194",
                        "organisationUnitName": "VGMIDT Midtbyen videregående skole"
                    },
                    {
                        "id": 1266,
                        "firstName": "Bente",
                        "lastName": "Nordli",
                        "userType": "STUDENT",
                        "assignmentRef": 398,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1308,
                        "firstName": "Brit",
                        "lastName": "Holm",
                        "userType": "STUDENT",
                        "assignmentRef": 410,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1147,
                        "firstName": "Egil",
                        "lastName": "Johnsen",
                        "userType": "EMPLOYEEFACULTY",
                        "assignmentRef": 406,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 884,
                        "firstName": "Egil",
                        "lastName": "Martinsen",
                        "userType": "EMPLOYEEFACULTY",
                        "assignmentRef": 405,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "204",
                        "organisationUnitName": "VGMIDT Realfag"
                    },
                    {
                        "id": 1286,
                        "firstName": "Egil",
                        "lastName": "Nordby",
                        "userType": "STUDENT",
                        "assignmentRef": 400,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1284,
                        "firstName": "Emil",
                        "lastName": "Jacobsen",
                        "userType": "STUDENT",
                        "assignmentRef": 399,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1248,
                        "firstName": "Guro",
                        "lastName": "Danielsen",
                        "userType": "STUDENT",
                        "assignmentRef": 404,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1232,
                        "firstName": "Joanna",
                        "lastName": "Kristoffersen",
                        "userType": "STUDENT",
                        "assignmentRef": 356,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "id": 1258,
                        "firstName": "Jorun",
                        "lastName": "Jacobsen",
                        "userType": "STUDENT",
                        "assignmentRef": 397,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "198",
                        "organisationUnitName": "VGSTOR Storskog videregående skole"
                    }
                ]
            }
        )
    }),


    // For fetching Grupper
    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/role/${id}/resources', () => {
        return HttpResponse.json(
        {
                "currentPage": 0,
                "size": 10,
                "totalItems": 9,
                "totalPages": 1,
                "roles": [
                    {
                        "id": 5,
                        "roleName": "Ansatt - INFRA Avdeling for mobilitet og samfunn",
                        "roleType": "ansatt",
                        "assignmentRef": 358,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "85",
                        "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
                    },
                    {
                        "id": 15,
                        "roleName": "Ansatt - INFRA Samferdsel",
                        "roleType": "ansatt",
                        "assignmentRef": 401,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "8",
                        "organisationUnitName": "INFRA Samferdsel"
                    },
                    {
                        "id": 16,
                        "roleName": "Ansatt - KOMP Fag- og yrkesopplæring",
                        "roleType": "ansatt",
                        "assignmentRef": 402,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "161",
                        "organisationUnitName": "KOMP Fag- og yrkesopplæring"
                    },
                    {
                        "id": 26,
                        "roleName": "Ansatt - KOMP Forvaltningsutvikling",
                        "roleType": "ansatt",
                        "assignmentRef": 408,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "150",
                        "organisationUnitName": "KOMP Forvaltningsutvikling"
                    },
                    {
                        "id": 3,
                        "roleName": "Ansatt - OKO System- og fellestjenester",
                        "roleType": "ansatt",
                        "assignmentRef": 385,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "35",
                        "organisationUnitName": "OKO System- og fellestjenester"
                    },
                    {
                        "id": 7,
                        "roleName": "Ansatt - VGMIDT Administrasjon",
                        "roleType": "ansatt",
                        "assignmentRef": 390,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "195",
                        "organisationUnitName": "VGMIDT Administrasjon"
                    },
                    {
                        "id": 23,
                        "roleName": "Ansatt - VGMIDT Språk/Økonomi",
                        "roleType": "ansatt",
                        "assignmentRef": 411,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "207",
                        "organisationUnitName": "VGMIDT Språk/Økonomi"
                    },
                    {
                        "id": 10,
                        "roleName": "Ansatt - VGSTOR Administrasjon",
                        "roleType": "ansatt",
                        "assignmentRef": 386,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "205",
                        "organisationUnitName": "VGSTOR Administrasjon"
                    },
                    {
                        "id": 13,
                        "roleName": "Ansatt - VGSTOR Tekno",
                        "roleType": "ansatt",
                        "assignmentRef": 387,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "organisationUnitId": "218",
                        "organisationUnitName": "VGSTOR Tekno"
                    }
                ],
            }
        )
    }),



    // Fetching assigned users to a resource
    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/resource/:id/users', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10"
        const page = new URL(request.url).searchParams.get('page') ?? "0"
        const search = new URL(request.url).searchParams.get('search') ?? "0"
        const userType = new URL(request.url).searchParams.get('userType') ?? "0"
        const orgUnits = new URL(request.url).searchParams.get('orgUnits').split(',') ?? []

        return HttpResponse.json(
            {
                "userList": {
                    "totalPages": 1,
                    "totalItems": 10,
                    "currentPage": 0,
                    "size": 10,
                    "users": [
                        {
                            "id": 1232,
                            "fullName": "Joanna Kristoffersen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1234,
                            "fullName": "Lars Martinsen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1241,
                            "fullName": "Marius Johansen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1243,
                            "fullName": "Isak Rud",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1247,
                            "fullName": "Maria Nilsen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1248,
                            "fullName": "Guro Danielsen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1250,
                            "fullName": "Åse Nilssen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1252,
                            "fullName": "Elsa Kristoffersen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1253,
                            "fullName": "Linda Pedersen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 1258,
                            "fullName": "Jorun Jacobsen",
                            "organisationUnitName": "VGSTOR Storskog videregående skole",
                            "organisationUnitId": "198",
                            "userType": "STUDENT"
                        }
                    ]
                }
            }
        )
    }),
]