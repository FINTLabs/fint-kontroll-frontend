import {http, HttpResponse} from "msw";

export const kontrollAdminHandlers = [
    http.get('http://localhost:8064/beta/fintlabs-no/api/roles', ({request, cookies}) => {
        const size = cookies.size ?? null

        const page = new URL(request.url).searchParams.get('page') ?? "0"
        const search = new URL(request.url).searchParams.get('search') ?? ""
        const orgUnits = new URL(request.url).searchParams.get('orgUnits') ?? []
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
    })
]