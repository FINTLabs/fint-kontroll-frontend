import {http, HttpResponse} from "msw";

export const usersHandlers = [
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


    http.get('http://localhost:8062/beta/fintlabs-no/api/users', ({request, cookies}) => {
        const size = cookies.size ?? null
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
                    "totalItems": 10,
                    "size": 25,
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


    http.get(`http://localhost:8061/beta/fintlabs-no/api/assignments/v2/user/:id/resources*`, ({request, cookies}) => {
        const size = cookies.size ?? null

        const page = new URL(request.url).searchParams.get('page') ?? "0";

        if(size === "25" && page === "0") {
            return HttpResponse.json(
                {
                    "size": 25,
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

]