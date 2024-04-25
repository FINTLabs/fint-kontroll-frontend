import { http, HttpResponse } from 'msw'

export const handlers = [
    // Intercept "GET http://localhost:8062/beta/fintlabs-no/api/users/me" requests...
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        // ...and respond to them using this JSON response.
        console.log("CAught endpoint")

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

    http.get('http://localhost:53989/beta/fintlabs-no/api/orgunits', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json(
            [
                {
                    "currentPage": 0,
                    "totalItems": 2,
                    "totalPages": 1,
                    "orgUnits": [
                        {
                            "id": "1",
                            "name": "org1",
                            "organisationUnitId": "1",
                            "parentRef": "0",
                            "parentName": null,
                            "childrenRef": [
                                "2"
                            ]
                        },
                        {
                            "id": "2",
                            "name": "org2",
                            "organisationUnitId": "2",
                            "parentRef": "1",
                            "parentName": "org1",
                            "childrenRef": [
                                ""
                            ]
                        },
                        {
                            "id": "3",
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
]
