import { http, HttpResponse } from 'msw'
import {BASE_PATH, ROLE_API_URL} from "../../environment";

export const handlers = [
    // Handlers for KontrollAdmin and RessursModulAdministrasjon
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        return HttpResponse.json({
                "firstName": "Mock",
                "lastName": "Name",
                "mail": "mock@novari.no",
                "organisationId": "mock.no"
            }
        )
    }),

    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user*', () => {
        return HttpResponse.json(
            {
                "totalItems": 3,
                "currentPage": 0,
                "totalPages": 1,
                "users": [
                    {
                        "id": "1",
                        "resourceId": "1",
                        "firstName": "Petter",
                        "lastName": "Pettersen",
                        "userType": "STUDENT",
                        "userName": "petter@petter.com"
                    },
                    {
                        "id": "2",
                        "resourceId": "2",
                        "firstName": "Lurifaks",
                        "lastName": "Bodilsen",
                        "userType": "ADMIN",
                        "userName": "bodilsen@luri.no"
                    }
                ]
            }

        )
    }),

    http.get('http://localhost:8060/beta/fintlabs-no/api/orgunits', () => {
        return HttpResponse.json(
            {
                "totalItems": 3,
                "orgUnits": [
                    {
                        "id": 1,
                        "name": "org1",
                        "organisationUnitId": "1",
                        "parentRef": "1",
                        "parentName": null,
                        "childrenRef": [
                            "2"
                        ]
                    },
                    {
                        "id": 2,
                        "name": "org2",
                        "organisationUnitId": "2",
                        "parentRef": "1",
                        "parentName": null,
                        "childrenRef": [
                            ""
                        ]
                    },
                    {
                        "id": 3,
                        "name": "org3",
                        "organisationUnitId": "3",
                        "parentRef": "",
                        "parentName": null,
                        "childrenRef": [
                            ""
                        ]
                    }
                ]
            }

        )
    }),

    // THIS DOES NOT YET WORK
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources*', () => {
        return HttpResponse.json(
            [
                {
                    "currentPage": 0,
                    "totalItems": 3,
                    "totalPages": 1,
                    "resources": [
                        {
                            "id": 1,
                            "resourceId": "ff75076c4ce53f5ca51b1cbb",
                            "resourceName": "Ressurs 1",
                            "resourceType": "ApplicationResource",
                            "resourceLimit": 10000
                        },
                        {
                            "id": 2,
                            "resourceId": "f887f35a0fab01f3e3e2c5c2",
                            "resourceName": "Ressurs 2",
                            "resourceType": "ApplicationResource",
                            "resourceLimit": 25
                        },
                        {
                            "id": 3,
                            "resourceId": "ff75076c4ce53f5ca518989",
                            "resourceName": "Ressurs 3",
                            "resourceType": "ApplicationResource",
                            "resourceLimit": 50
                        }
                    ]
                }
            ]

        )
    }),

    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessrole', () => {
        return HttpResponse.json(
            [
                {
                    "accessRoleId": "a1",
                    "name": "accessRole1"
                },
                {
                    "accessRoleId": "a2",
                    "name": "accessRole2"
                }
            ]
        )
    }),

    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accesspermission/accessrole/*', () => {
        return HttpResponse.json(
            {
                "accessRoleId": "sb",
                "features": [
                    {
                        "featureId": 1,
                        "featureName": "featureName1",
                        "operations": [
                            "GET",
                            "POST",
                            "DELETE"
                        ]
                    },
                    {
                        "featureId": 2,
                        "featureName": "featureName2",
                        "operations": [
                            "GET",
                            "POST",
                            "DELETE"
                        ]
                    },
                    {
                        "featureId": 3,
                        "featureName": "featureName3",
                        "operations": [
                            "GET",
                            "DELETE"
                        ]
                    }
                ]
            }
        )
    }),

    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/feature', () => {
        return HttpResponse.json(
            [
                {
                    "id": "1",
                    "name": "Alle brukere"
                },
                {
                    "id": "2",
                    "name": "En bruker"
                },
                {
                    "id": "3",
                    "name": "Grupper"
                },
                {
                    "id": "4",
                    "name": "En gruppe"
                },
                {
                    "id": "5",
                    "name": "Ressurser"
                }
            ]

        )
    }),
    // --------------------------------------------------------------------------------------------------------------------------------







    // Handlers for Brukere
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/:id', () => {
        return HttpResponse.json(
        {
                "id": 442,
                "fullName": "Karen Berg",
                "userName": null,
                "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                "mobilePhone": "",
                "email": null
            }
        )
    }),


    http.get('http://localhost:8062/beta/fintlabs-no/api/users', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10";
        const page = new URL(request.url).searchParams.get('page') ?? "0";
        const userType = new URL(request.url).searchParams.get('userType') ?? "";

        if (size === "5" && page === "0") {
            return HttpResponse.json(
                {
                    "totalItems": 10,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 442,
                            "fullName": "Karen Berg",
                            "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                            "organisationUnitId": "194",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 443,
                            "fullName": "Lasse Luft",
                            "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                            "organisationUnitId": "194",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 105,
                            "fullName": "Marie Henriksen",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 109,
                            "fullName": "Hans Berg",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 113,
                            "fullName": "Ingar Johansen",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        }
                    ]
                }
            )
        } else if (size === "5" && page === "1") {
            return HttpResponse.json(
            {
                    "totalItems": 10,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 1,
                    "users": [
                        {
                            "id": 444,
                            "fullName": "Lurifaks",
                            "organisationUnitName": "VGSØR Sørbyen videregående skole",
                            "organisationUnitId": "122",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 103,
                            "fullName": "Markmannen",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "202",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 105,
                            "fullName": "Marie Henriksen",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "202",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 109,
                            "fullName": "Hans Berg",
                            "organisationUnitName": "VGSØR Sørbyen videregående skole",
                            "organisationUnitId": "122",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 113,
                            "fullName": "Ingar Johansen",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "202",
                            "userType": "EMPLOYEE"
                        }
                    ]
                }
            )
        }

        else if (userType === "STUDENT") {
            return HttpResponse.json(
                {
                    "totalItems": 10,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 442,
                            "fullName": "Karen Berg",
                            "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                            "organisationUnitId": "194",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 444,
                            "fullName": "Lurifaks",
                            "organisationUnitName": "VGSØR Sørbyen videregående skole",
                            "organisationUnitId": "122",
                            "userType": "STUDENT"
                        }
                    ]
                }
            )
        }

        else {
            return HttpResponse.json(
                {
                    "totalItems": 55,
                    "size": 10,
                    "totalPages": 1,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 442,
                            "fullName": "Karen Berg",
                            "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                            "organisationUnitId": "194",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 443,
                            "fullName": "Lasse Luft",
                            "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                            "organisationUnitId": "194",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 105,
                            "fullName": "Marie Henriksen",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 109,
                            "fullName": "Hans Berg",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 113,
                            "fullName": "Ingar Johansen",
                            "organisationUnitName": "VGMIDT Realfag",
                            "organisationUnitId": "204",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 444,
                            "fullName": "Lurifaks",
                            "organisationUnitName": "VGSØR Sørbyen videregående skole",
                            "organisationUnitId": "122",
                            "userType": "STUDENT"
                        },
                        {
                            "id": 103,
                            "fullName": "Markmannen",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "202",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 123,
                            "fullName": "Bodil Bodil Bodil Bodil",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "299",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 300,
                            "fullName": "Karl Johan",
                            "organisationUnitName": "VGSØR Sørbyen videregående skole",
                            "organisationUnitId": "154",
                            "userType": "EMPLOYEE"
                        },
                        {
                            "id": 301,
                            "fullName": "Ingunn Gabrielsen",
                            "organisationUnitName": "Vår fylkeskommune",
                            "organisationUnitId": "288",
                            "userType": "EMPLOYEE"
                        }
                    ]
                }
            )
        }
    }),


    http.get(`http://localhost:8061/beta/fintlabs-no/api/assignments/user/:id/resources*`, ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10";

        const page = new URL(request.url).searchParams.get('page') ?? "0";

        if(size === "10" && page === "0") {
            return HttpResponse.json(
                {
                    "size": 10,
                    "totalItems": 6,
                    "currentPage": 0,
                    "totalPages": 1,
                    "resources": [
                        {
                            "id": 1,
                            "resourceId": "f887f35a0fab01f3e3e2c5c2",
                            "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 2,
                            "resourceId": "ff75076c4ce53f5ca51b1cbb",
                            "resourceName": "Creative Cloud All Apps for K-12 - User License",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 356,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 3,
                            "resourceId": "abc",
                            "resourceName": "Ressurs3",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 4,
                            "resourceId": "def",
                            "resourceName": "Ressurs4",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 5,
                            "resourceId": "asd",
                            "resourceName": "Ressurs5",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 6,
                            "resourceId": "d1221",
                            "resourceName": "Ressurs6",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                    ]
                }
            )
        }

        else if (size === "5" && page === "1") {
            return HttpResponse.json(
            {
                    "size": 5,
                    "totalItems": 6,
                    "currentPage": 1,
                    "totalPages": 2,
                    "resources": [
                        {
                            "id": 6,
                            "resourceId": "d1221",
                            "resourceName": "Ressurs6",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        }
                    ]
                }
            )
        }

        else {
            return HttpResponse.json(
                {
                    "size": 5,
                    "totalItems": 6,
                    "currentPage": 0,
                    "totalPages": 2,
                    "resources": [
                        {
                            "id": 1,
                            "resourceId": "f887f35a0fab01f3e3e2c5c2",
                            "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 2,
                            "resourceId": "ff75076c4ce53f5ca51b1cbb",
                            "resourceName": "Creative Cloud All Apps for K-12 - User License",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 356,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 3,
                            "resourceId": "abc",
                            "resourceName": "Ressurs3",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 4,
                            "resourceId": "def",
                            "resourceName": "Ressurs4",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 5,
                            "resourceId": "asd",
                            "resourceName": "Ressurs5",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 354,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                    ]
                }
            )
        }


    }),

    // --------------------------------------------------------------------------------------------------------------------------------






    // Handlers for roles/grupper -----------------------------------------------------------------------------------
    http.get('http://localhost:8064/beta/fintlabs-no/api/roles', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10"

        const page = new URL(request.url).searchParams.get('page') ?? "0"
        const search = new URL(request.url).searchParams.get('search') ?? ""
        const orgUnits = new URL(request.url).searchParams.get('orgUnits') ?? []

        if(search === "oko") {
            return HttpResponse.json(
                {
                    "totalItems": 1,
                    "size": 5,
                    "totalPages": 1,
                    "currentPage": 0,
                    "roles": [
                        {
                            "id": 1,
                            "roleName": "Ansatt - OKO System- og fellestjenester",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "35",
                            "organisationUnitName": "OKO System- og fellestjenester"
                        }
                    ]
                }
            )
        }

        else if(orgUnits.length > 0) {
            return HttpResponse.json(
                {
                    "totalItems": 1,
                    "size": 5,
                    "totalPages": 1,
                    "currentPage": 0,
                    "roles": [
                        {
                            "id": 2,
                            "roleName": "Ansatt - DIGIT Lokasjonssupport sone Fylkeshus",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "1178",
                            "organisationUnitName": "DIGIT Lokasjonssupport sone Fylkeshus"
                        },
                    ]
                }
            )
        }

        else if(size === "10" && page === "0") {
            return HttpResponse.json(
                {
                    "totalItems": 11,
                    "size": 10,
                    "totalPages": 2,
                    "currentPage": 0,
                    "roles": [
                        {
                            "id": 1,
                            "roleName": "Ansatt - OKO System- og fellestjenester",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "35",
                            "organisationUnitName": "OKO System- og fellestjenester"
                        },
                        {
                            "id": 2,
                            "roleName": "Ansatt - DIGIT Lokasjonssupport sone Fylkeshus",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "1178",
                            "organisationUnitName": "DIGIT Lokasjonssupport sone Fylkeshus"
                        },
                        {
                            "id": 3,
                            "roleName": "Ansatt - INFRA Avdeling for mobilitet og samfunn",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "85",
                            "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
                        },
                        {
                            "id": 4,
                            "roleName": "Ansatt - DIGIT Lokasjonssupport",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "50",
                            "organisationUnitName": "DIGIT Lokasjonssupport"
                        },
                        {
                            "id": 5,
                            "roleName": "Ansatt - VGMIDT Administrasjon",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "195",
                            "organisationUnitName": "VGMIDT Administrasjon"
                        },
                        {
                            "id": 6,
                            "roleName": "Elev - OKO System- og fellestjenester",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "35",
                            "organisationUnitName": "OKO System- og fellestjenester"
                        },
                        {
                            "id": 7,
                            "roleName": "Elev - DIGIT Lokasjonssupport sone Fylkeshus",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "1178",
                            "organisationUnitName": "DIGIT Lokasjonssupport sone Fylkeshus"
                        },
                        {
                            "id": 8,
                            "roleName": "Elev - INFRA Avdeling for mobilitet og samfunn",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "85",
                            "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
                        },
                        {
                            "id": 9,
                            "roleName": "Elev - DIGIT Lokasjonssupport",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "50",
                            "organisationUnitName": "DIGIT Lokasjonssupport"
                        },
                        {
                            "id": 10,
                            "roleName": "Elev - VGMIDT Administrasjon",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "195",
                            "organisationUnitName": "VGMIDT Administrasjon"
                        }
                    ]
                }
            )
        }
        else if (size === "5" && page === "1") {
            return HttpResponse.json(
                {
                    "totalItems": 11,
                    "size": 5,
                    "totalPages": 3,
                    "currentPage": 1,
                    "roles": [
                        {
                            "id": 6,
                            "roleName": "Elev - OKO System- og fellestjenester",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "35",
                            "organisationUnitName": "OKO System- og fellestjenester"
                        },
                        {
                            "id": 7,
                            "roleName": "Elev - DIGIT Lokasjonssupport sone Fylkeshus",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "1178",
                            "organisationUnitName": "DIGIT Lokasjonssupport sone Fylkeshus"
                        },
                        {
                            "id": 8,
                            "roleName": "Elev - INFRA Avdeling for mobilitet og samfunn",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "85",
                            "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
                        },
                        {
                            "id": 9,
                            "roleName": "Elev - DIGIT Lokasjonssupport",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "50",
                            "organisationUnitName": "DIGIT Lokasjonssupport"
                        },
                        {
                            "id": 10,
                            "roleName": "Elev - VGMIDT Administrasjon",
                            "roleType": "elev",
                            "roleSubType": "elev",
                            "aggregatedRole": false,
                            "organisationUnitId": "195",
                            "organisationUnitName": "VGMIDT Administrasjon"
                        },
                    ]
                }
            )
        }
        else if(size === "5" && page === "2") {
            return HttpResponse.json(
                {
                    "totalItems": 11,
                    "size": 5,
                    "totalPages": 3,
                    "currentPage": 2,
                    "roles": [{
                        "id": 11,
                        "roleName": "Elev - VGMIDT Administrasjon",
                        "roleType": "elev",
                        "roleSubType": "elev",
                        "aggregatedRole": false,
                        "organisationUnitId": "195",
                        "organisationUnitName": "VGMIDT Administrasjon"
                    }]
                }
            )
        }
        else {
            return HttpResponse.json(
                {
                    "totalItems": 11,
                    "size": 10,
                    "totalPages": 3,
                    "currentPage": 0,
                    "roles": [
                        {
                            "id": 1,
                            "roleName": "Ansatt - OKO System- og fellestjenester",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "35",
                            "organisationUnitName": "OKO System- og fellestjenester"
                        },
                        {
                            "id": 2,
                            "roleName": "Ansatt - DIGIT Lokasjonssupport sone Fylkeshus",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "1178",
                            "organisationUnitName": "DIGIT Lokasjonssupport sone Fylkeshus"
                        },
                        {
                            "id": 3,
                            "roleName": "Ansatt - INFRA Avdeling for mobilitet og samfunn",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "85",
                            "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
                        },
                        {
                            "id": 4,
                            "roleName": "Ansatt - DIGIT Lokasjonssupport",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "50",
                            "organisationUnitName": "DIGIT Lokasjonssupport"
                        },
                        {
                            "id": 5,
                            "roleName": "Ansatt - VGMIDT Administrasjon",
                            "roleType": "ansatt",
                            "roleSubType": "ansatt",
                            "aggregatedRole": false,
                            "organisationUnitId": "195",
                            "organisationUnitName": "VGMIDT Administrasjon"
                        }
                    ]
                }
            )
        }
    }),


    http.get('http://localhost:8064/beta/fintlabs-no/api/roles/:id', () => {
        return HttpResponse.json(
            {
                "id": 3,
                "roleName": "Ansatt - OKO System- og fellestjenester",
                "roleType": "ansatt",
                "roleSubType": "ansatt",
                "aggregatedRole": false,
                "roleSource": "fint",
                "organisationUnitId": "35",
                "organisationUnitName": "OKO System- og fellestjenester"
            }
        )
    }),

    http.get('http://localhost:8064/beta/fintlabs-no/api/roles/:id/members', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10"

        const page = new URL(request.url).searchParams.get('page') ?? "0"

        if(size === "5" && page === "0") {
            return HttpResponse.json(
                {
                    "totalItems": 7,
                    "currentPage": 0,
                    "totalPages": 2,
                    "size": 5,
                    "members": [
                        {
                            "id": 100,
                            "firstName": "MemberA",
                            "lastName": "Brustad",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 104,
                            "firstName": "MemberB",
                            "lastName": "Pettersen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 92,
                            "firstName": "MemberC",
                            "lastName": "Hansen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 97,
                            "firstName": "MemberD",
                            "lastName": "Nordby",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 86,
                            "firstName": "MemberE",
                            "lastName": "Lund",
                            "userType": "EMPLOYEE",
                            "userName": null
                        }
                    ]
                }
            )
        }

        else if (size === "5" && page === "1") {
            return HttpResponse.json(
                {
                    "totalItems": 7,
                    "currentPage": 1,
                    "totalPages": 2,
                    "size": 2,
                    "members": [
                        {
                            "id": 1111,
                            "firstName": "MemberF",
                            "lastName": "Lauritsen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 8222,
                            "firstName": "MemberG",
                            "lastName": "Velmo",
                            "userType": "EMPLOYEE",
                            "userName": null
                        }
                    ]
                }
            )
        }

        else {
            return HttpResponse.json(
                {
                    "totalItems": 7,
                    "currentPage": 0,
                    "totalPages": 1,
                    "size": 10,
                    "members": [
                        {
                            "id": 100,
                            "firstName": "MemberA",
                            "lastName": "Brustad",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 104,
                            "firstName": "MemberB",
                            "lastName": "Pettersen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 92,
                            "firstName": "MemberC",
                            "lastName": "Hansen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 97,
                            "firstName": "MemberD",
                            "lastName": "Nordby",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 86,
                            "firstName": "MemberE",
                            "lastName": "Lund",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 1111,
                            "firstName": "MemberF",
                            "lastName": "Lauritsen",
                            "userType": "EMPLOYEE",
                            "userName": null
                        },
                        {
                            "id": 8222,
                            "firstName": "MemberG",
                            "lastName": "Velmo",
                            "userType": "EMPLOYEE",
                            "userName": null
                        }
                    ]
                }
            )
        }
    }),

    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/role/:id/resources', ({request}) => {
        const size = new URL(request.url).searchParams.get('size') ?? "10"

        const page = new URL(request.url).searchParams.get('page') ?? "0"

        if(size === "5" && page === "0") {
            return HttpResponse.json(
                {
                    "currentPage": 0,
                    "totalItems": 7,
                    "size": 5,
                    "totalPages": 2,
                    "resources": [
                        {
                            "id": 1,
                            "resourceId": "adobek12",
                            "resourceName": "Adobe K12 Utdanning",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 4,
                            "resourceId": "f887f35a0fab01f3e3e2c5c2",
                            "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 368,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 5,
                            "resourceId": "ff75076c4ce53f5ca51b1cbb",
                            "resourceName": "Creative Cloud All Apps for K-12 - User License",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 385,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 2,
                            "resourceId": "msproject",
                            "resourceName": "Microsoft Project Enterprise",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 252,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 6,
                            "resourceId": "ff75076c4ce53f5ca518989",
                            "resourceName": "Solid Works Edu",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 371,
                            "assignerUsername": "morten.solberg@novari.no",
                            "assignerDisplayname": "Morten Solberg (ekstern)"
                        }
                    ]
                }
            )
        }
        else if (size === "5" && page === "1")
            return HttpResponse.json(
                {
                    "currentPage": 1,
                    "totalItems": 7,
                    "size": 5,
                    "totalPages": 2,
                    "resources": [
                        {
                            "id": 33,
                            "resourceId": "Java17 SE",
                            "resourceName": "Java 17 Software Environment",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 41,
                            "resourceId": "adobek12",
                            "resourceName": "Adobe K12 Utdanning",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        }
                    ]
                }
            )
        else {
            return HttpResponse.json(
                {
                    "currentPage": 0,
                    "totalItems": 7,
                    "size": 10,
                    "totalPages": 1,
                    "resources": [
                        {
                            "id": 1,
                            "resourceId": "adobek12",
                            "resourceName": "Adobe K12 Utdanning",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 4,
                            "resourceId": "f887f35a0fab01f3e3e2c5c2",
                            "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 368,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 5,
                            "resourceId": "ff75076c4ce53f5ca51b1cbb",
                            "resourceName": "Creative Cloud All Apps for K-12 - User License",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 385,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 2,
                            "resourceId": "msproject",
                            "resourceName": "Microsoft Project Enterprise",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 252,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 6,
                            "resourceId": "ff75076c4ce53f5ca518989",
                            "resourceName": "Solid Works Edu",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 371,
                            "assignerUsername": "morten.solberg@novari.no",
                            "assignerDisplayname": "Morten Solberg (ekstern)"
                        },
                        {
                            "id": 33,
                            "resourceId": "Java17 SE",
                            "resourceName": "Java 17 Software Environment",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        },
                        {
                            "id": 41,
                            "resourceId": "adobek12",
                            "resourceName": "Adobe K12 Utdanning",
                            "resourceType": "ApplicationResource",
                            "assignmentRef": 238,
                            "assignerUsername": "linda.loftsgarden@vigoiks.no",
                            "assignerDisplayname": null
                        }
                    ]
                }
            )
        }
    })

    // --------------------------------------------------------------------------------------------------------------------------------
]
