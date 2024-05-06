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
                "totalPages": 1,
                "currentPage": 0,
                "totalItems": 3,
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
                        "id": 6,
                        "resourceId": "ff75076c4ce53f5ca518989",
                        "resourceName": "Solid Works Edu",
                        "resourceType": "ApplicationResource",
                        "resourceLimit": 50
                    }
                ]
            }
        )
    })

    // --------------------------------------------------------------------------------------------------------------------------------
]