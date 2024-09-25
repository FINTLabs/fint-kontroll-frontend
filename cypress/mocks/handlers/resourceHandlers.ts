import {http, HttpResponse} from 'msw'

export const createNewResourceHandlers = [
    http.post('http://localhost:8063/beta/fintlabs-no/api/resources/v1', () => {
        return HttpResponse.json({}, {status: 201})
    })]

export const deleteResourceHandlers = [
    http.delete('http://localhost:8063/beta/fintlabs-no/api/resources/v1/:id', () => {
        return HttpResponse.json({}, {status: 204})
    })]

export const resourceAdminHandlers = [
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/admin/v1', () => {
        return HttpResponse.json({
                "totalPages": 1,
                "currentPage": 0,
                "totalItems": 7,
                "size": 25,
                "resources": [
                    {
                        "id": 5,
                        "resourceId": "ff75076c4ce53f5ca51b1cbb",
                        "resourceName": "Creative Cloud All Apps for K-12 - User License",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 10000,
                        "status": "ACTIVE",
                        "identityProviderGroupObjectId": "96f6d0ac-64ef-4c3b-bb1f-91db7b39426d"
                    },
                    {
                        "id": 4,
                        "resourceId": "f887f35a0fab01f3e3e2c5c2",
                        "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 25,
                        "status": "ACTIVE",
                        "identityProviderGroupObjectId": "df6b0f04-3dac-489c-abcf-31313d9b85c2"
                    },
                    {
                        "id": 62,
                        "resourceId": "ff75076c4ce53f5ca518989",
                        "resourceName": "Solid Works Edu",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50,
                        "status": "DELETED",
                        "identityProviderGroupObjectId": "6b75d8f8-83e7-483c-92f1-19c620cd7571"
                    },
                    {
                        "id": 53,
                        "resourceId": "ff75076c4ce53f5ca51b1ccb",
                        "resourceName": "TOtally LegIt textbooks",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 10000,
                        "status": "DELETED",
                        "identityProviderGroupObjectId": "6b75d8f8-83e7-483c-92f1-19c620cd7571"
                    },
                    {
                        "id": 44,
                        "resourceId": "f887f35a0fab01f3e3e2c5c3",
                        "resourceName": "Flash Media Player",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 25,
                        "status": "DELETED",
                        "identityProviderGroupObjectId": "6b75d8f8-83e7-483c-92f1-19c620cd7571"
                    },
                    {
                        "id": 61,
                        "resourceId": "ff75076c4ce53f5ca518949",
                        "resourceName": "Powerpoint",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50,
                        "status": "DELETED",
                        "identityProviderGroupObjectId": "6b75d8f8-83e7-483c-92f1-19c620cd7571"
                    },
                    {
                        "id": 66,
                        "resourceId": "ff75076c4ce53f5ca513989",
                        "resourceName": "Runekit",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50,
                        "status": "DELETED",
                        "identityProviderGroupObjectId": "6b75d8f8-83e7-483c-92f1-19c620cd7571"
                    },
                ]
            }
        )
    })]

export const resourceHandlers = [
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/v1', ({request}) => {
        const search = new URL(request.url).searchParams.get('search') ?? "";

        if (search === "solid") {
            return HttpResponse.json(
                {
                    "totalPages": 1,
                    "currentPage": 0,
                    "totalItems": 7,
                    "size": 25,
                    "resources": [
                        {
                            "id": 62,
                            "resourceId": "ff75076c4ce53f5ca518989",
                            "resourceName": "Solid Works Edu",
                            "resourceType": "ApplicationResource",
                            "resourceLimit": 50
                        }
                    ]
                }
            )
        }

        return HttpResponse.json(
            {
                "totalPages": 1,
                "currentPage": 0,
                "totalItems": 7,
                "size": 25,
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

    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/applicationcategories', () => {
        return HttpResponse.json(
            [
                "Fagsystemer",
                "Pedagogisk programvare"
            ]
        )
    }),

    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/accesstypes', () => {
        return HttpResponse.json(
            [
                "device",
                "Device based license"
            ]
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
    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/v2/resource/:id/users', ({
                                                                                                  request,
                                                                                                  cookies
                                                                                              }) => {
        const size = cookies.size ?? null
        const page = new URL(request.url).searchParams.get('page') ?? "0"
        const search = new URL(request.url).searchParams.get('search') ?? "0"
        const userType = new URL(request.url).searchParams.get('userType') ?? "0"

        if (userType === "STUDENT") {
            return HttpResponse.json(
                {
                    "totalItems": 7,
                    "size": 25,
                    "totalPages": 1,
                    "currentPage": 0,
                    "users": [
                        {
                            "assigneeRef": 1266,
                            "assigneeFirstName": "Bente",
                            "assigneeLastName": "Nordli",
                            "assigneeUsername": "niaa0101@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assigneeassigneeUserType": "STUDENT",
                            "assignmentRef": 398,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeassigneeOrganisationUnitId": "198",
                            "assigneeassigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1308,
                            "assigneeFirstName": "Brit",
                            "assigneeLastName": "Holm",
                            "assigneeUsername": "brit@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 410,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1286,
                            "assigneeFirstName": "Egil",
                            "assigneeLastName": "Nordby",
                            "assigneeUsername": "Bold@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 400,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1284,
                            "assigneeFirstName": "Emil",
                            "assigneeLastName": "Jacobsen",
                            "assigneeUsername": "emil@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 399,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1248,
                            "assigneeFirstName": "Guro",
                            "assigneeLastName": "Danielsen",
                            "assigneeUsername": "guro@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 404,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1232,
                            "assigneeFirstName": "Joanna",
                            "assigneeLastName": "Kristoffersen",
                            "assigneeUsername": "joa@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 356,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1258,
                            "assigneeFirstName": "Jorun",
                            "assigneeLastName": "Jacobsen",
                            "assigneeUsername": "joru@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 397,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        if (search === "Bente") {
            return HttpResponse.json(
                {
                    "totalItems": 1,
                    "size": 1,
                    "totalPages": 1,
                    "currentPage": 0,
                    "users": [
                        {
                            "assigneeRef": 1266,
                            "assigneeFirstName": "Bente",
                            "assigneeLastName": "Nordli",
                            "assigneeUsername": "niaa0101@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assigneeassigneeUserType": "STUDENT",
                            "assignmentRef": 398,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeassigneeOrganisationUnitId": "198",
                            "assigneeassigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        if (size === "5" && page === "0") {
            return HttpResponse.json(
                {
                    "totalItems": 17,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 0,
                    "users": [
                        {
                            "assigneeRef": 1044,
                            "assigneeFirstName": "Test",
                            "assigneeLastName": "Testesen",
                            "assigneeUsername": "testetsen@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "EMPLOYEESTAFF",
                            "assignmentRef": 407,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "161",
                            "assigneeOrganisationUnitName": "KOMP Fag- og yrkesopplæring"
                        },
                        {
                            "assigneeRef": 1266,
                            "assigneeFirstName": "Bente",
                            "assigneeLastName": "Nordli",
                            "assigneeUsername": "niaa0101@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 398,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1308,
                            "assigneeFirstName": "Brit",
                            "assigneeLastName": "Holm",
                            "assigneeUsername": "brit@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 410,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1286,
                            "assigneeFirstName": "Egil",
                            "assigneeLastName": "Nordby",
                            "assigneeUsername": "Bold@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 400,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 884,
                            "assigneeFirstName": "Egil",
                            "assigneeLastName": "Martinsen",
                            "assigneeUsername": "egilegil@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "EMPLOYEEFACULTY",
                            "assignmentRef": 405,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "204",
                            "assigneeOrganisationUnitName": "VGMIDT Realfag"
                        }
                    ]
                }
            )
        }

        if (size === "5" && page === "1") {
            return HttpResponse.json(
                {
                    "totalItems": 17,
                    "size": 5,
                    "totalPages": 2,
                    "currentPage": 1,
                    "users": [
                        {
                            "assigneeRef": 1286,
                            "assigneeFirstName": "Egil",
                            "assigneeLastName": "Nordby",
                            "assigneeUsername": "Bold@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 400,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1284,
                            "assigneeFirstName": "Emil",
                            "assigneeLastName": "Jacobsen",
                            "assigneeUsername": "emjac@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 399,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1248,
                            "assigneeFirstName": "Guro",
                            "assigneeLastName": "Danielsen",
                            "assigneeUsername": "guro@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 404,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1232,
                            "assigneeFirstName": "Joanna",
                            "assigneeLastName": "Kristoffersen",
                            "assigneeUsername": "jokri@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 356,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        },
                        {
                            "assigneeRef": 1258,
                            "assigneeFirstName": "Jorun",
                            "assigneeLastName": "Jacobsen",
                            "assigneeUsername": "jorja@testvigoiks.onmicrosoft.com",
                            "assigneeUserType": "STUDENT",
                            "assignmentRef": 397,
                            "directAssignment": true,
                            "assignmentViaRoleRef": null,
                            "assignmentViaRoleName": null,
                            "assignerUsername": "linda.loftsgarden@novari.no",
                            "assignerDisplayname": null,
                            "assigneeOrganisationUnitId": "198",
                            "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                        }
                    ]
                }
            )
        }

        return HttpResponse.json(
            {
                "totalItems": 17,
                "size": 25,
                "totalPages": 2,
                "currentPage": 0,
                "users": [
                    {
                        "assigneeRef": 442,
                        "assigneeFirstName": "Karen",
                        "assigneeLastName": "Berg",
                        "assigneeUsername": "karbe@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 407,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "194",
                        "assigneeOrganisationUnitName": "VGMIDT Midtbyen videregående skole"
                    },
                    {
                        "assigneeRef": 1266,
                        "assigneeFirstName": "Bente",
                        "assigneeLastName": "Nordli",
                        "assigneeUsername": "niaa0101@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 398,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1308,
                        "assigneeFirstName": "Brit",
                        "assigneeLastName": "Holm",
                        "assigneeUsername": "brit@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 410,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1147,
                        "assigneeFirstName": "Egil",
                        "assigneeLastName": "Johnsen",
                        "assigneeUsername": "egjo@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "EMPLOYEEFACULTY",
                        "assignmentRef": 406,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 884,
                        "assigneeFirstName": "Egil",
                        "assigneeLastName": "Martinsen",
                        "assigneeUsername": "egilegil@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "EMPLOYEEFACULTY",
                        "assignmentRef": 405,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "204",
                        "assigneeOrganisationUnitName": "VGMIDT Realfag"
                    },
                    {
                        "assigneeRef": 1286,
                        "assigneeFirstName": "Egil",
                        "assigneeLastName": "Nordby",
                        "assigneeUsername": "Bold@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 400,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1284,
                        "assigneeFirstName": "Emil",
                        "assigneeLastName": "Jacobsen",
                        "assigneeUsername": "emil@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 399,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1248,
                        "assigneeFirstName": "Guro",
                        "assigneeLastName": "Danielsen",
                        "assigneeUsername": "guro@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 404,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1232,
                        "assigneeFirstName": "Joanna",
                        "assigneeLastName": "Kristoffersen",
                        "assigneeUsername": "jokri@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 356,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    },
                    {
                        "assigneeRef": 1258,
                        "assigneeFirstName": "Jorun",
                        "assigneeLastName": "Jacobsen",
                        "assigneeUsername": "jorja@testvigoiks.onmicrosoft.com",
                        "assigneeUserType": "STUDENT",
                        "assignmentRef": 397,
                        "directAssignment": true,
                        "assignmentViaRoleRef": null,
                        "assignmentViaRoleName": null,
                        "assignerUsername": "linda.loftsgarden@novari.no",
                        "assignerDisplayname": null,
                        "assigneeOrganisationUnitId": "198",
                        "assigneeOrganisationUnitName": "VGSTOR Storskog videregående skole"
                    }
                ]
            }
        )
    }),


    // For fetching Grupper
    // http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/role/${id}/resources', () => {
    //     return HttpResponse.json(
    //     {
    //             "currentPage": 0,
    //             "size": 10,
    //             "totalItems": 9,
    //             "totalPages": 1,
    //             "roles": [
    //                 {
    //                     "id": 5,
    //                     "roleName": "Ansatt - INFRA Avdeling for mobilitet og samfunn",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 358,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "85",
    //                     "organisationUnitName": "INFRA Avdeling for mobilitet og samfunn"
    //                 },
    //                 {
    //                     "id": 15,
    //                     "roleName": "Ansatt - INFRA Samferdsel",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 401,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "8",
    //                     "organisationUnitName": "INFRA Samferdsel"
    //                 },
    //                 {
    //                     "id": 16,
    //                     "roleName": "Ansatt - KOMP Fag- og yrkesopplæring",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 402,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "161",
    //                     "organisationUnitName": "KOMP Fag- og yrkesopplæring"
    //                 },
    //                 {
    //                     "id": 26,
    //                     "roleName": "Ansatt - KOMP Forvaltningsutvikling",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 408,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "150",
    //                     "organisationUnitName": "KOMP Forvaltningsutvikling"
    //                 },
    //                 {
    //                     "id": 3,
    //                     "roleName": "Ansatt - OKO System- og fellestjenester",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 385,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "35",
    //                     "organisationUnitName": "OKO System- og fellestjenester"
    //                 },
    //                 {
    //                     "id": 7,
    //                     "roleName": "Ansatt - VGMIDT Administrasjon",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 390,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "195",
    //                     "organisationUnitName": "VGMIDT Administrasjon"
    //                 },
    //                 {
    //                     "id": 23,
    //                     "roleName": "Ansatt - VGMIDT Språk/Økonomi",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 411,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "207",
    //                     "organisationUnitName": "VGMIDT Språk/Økonomi"
    //                 },
    //                 {
    //                     "id": 10,
    //                     "roleName": "Ansatt - VGSTOR Administrasjon",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 386,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "205",
    //                     "organisationUnitName": "VGSTOR Administrasjon"
    //                 },
    //                 {
    //                     "id": 13,
    //                     "roleName": "Ansatt - VGSTOR Tekno",
    //                     "roleType": "ansatt",
    //                     "assignmentRef": 387,
    //                     "assignerUsername": "linda.loftsgarden@novari.no",
    //                     "assignerDisplayname": null,
    //                     "organisationUnitId": "218",
    //                     "organisationUnitName": "VGSTOR Tekno"
    //                 }
    //             ],
    //         }
    //     )
    // }),


    // Fetching assigned users to a resource
    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/v2/resource/:id/users', ({
                                                                                                  request,
                                                                                                  cookies
                                                                                              }) => {
        // These queryParams will be used for later testing
        const size = cookies.size ?? null
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
                    "size": 25,
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