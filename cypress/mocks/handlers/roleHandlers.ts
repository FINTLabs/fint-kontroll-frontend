import {http, HttpResponse} from "msw";

export const roleHandlers = [
    http.get('http://localhost:8064/beta/fintlabs-no/api/roles', ({request, cookies}) => {
        const size = cookies.size ?? null
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

        else if(size === "25" && page === "0") {
            return HttpResponse.json(
                {
                    "totalItems": 11,
                    "size": 25,
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
                        },
                        {
                            "id": 11,
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
        else if (size === "5" && (page === "1" || page === "0")) {
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
                    "size": 25,
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

    http.get('http://localhost:8064/beta/fintlabs-no/api/roles/:id/members', ({request, cookies}) => {
        const size = cookies.size ?? null

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
                    "size": 25,
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

    http.get('http://localhost:8061/beta/fintlabs-no/api/assignments/role/:id/resources', ({request, cookies}) => {
        const size = cookies.size ?? null

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
                    "size": 25,
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
    }),
]