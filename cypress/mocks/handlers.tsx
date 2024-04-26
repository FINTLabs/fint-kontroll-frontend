import { http, HttpResponse } from 'msw'
import {ASSIGNMENT_API_URL, BASE_PATH} from "../../environment";

export const handlers = [
    // Handlers for KontrollAdmin and RessursModulAdministrasjon
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
                "firstName": "Mock",
                "lastName": "Name",
                "mail": "mock@novari.no",
                "organisationId": "mock.no"
            }
        )
    }),

    http.get('http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/user*', () => {
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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
        // ...and respond to them using this JSON response.
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

    http.get('http://localhost:8062/beta/fintlabs-no/api/users*', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
        {
                "totalItems": 55,
                "size": 5,
                "totalPages": 11,
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
                        "fullName": "Karen Bergen",
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
    }),





    http.get(`http://localhost:8061/beta/fintlabs-no/api/assignments/user/:id/resources*`, () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
        )
    }),

    // --------------------------------------------------------------------------------------------------------------------------------
]
