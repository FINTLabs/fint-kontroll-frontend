import { http, HttpResponse } from 'msw'

export const resourceHandlers = [
    // Handlers for Ressurser   -------------------------------------------------------------------------------------------------------
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

    http.get('sdsd', () => {
        return HttpResponse.json(
            {
                "assignedUsers": {
                    "totalItems": 17,
                    "size": 10,
                    "totalPages": 2,
                    "currentPage": 0,
                    "users": [
                        {
                            "id": 1044,
                            "firstName": "Andreas",
                            "lastName": "Andersen",
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
                },
                "basePath": "/beta/fintlabs-no"
            }
        )
    })

    // --------------------------------------------------------------------------------------------------------------------------------
]