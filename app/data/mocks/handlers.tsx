import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        return HttpResponse.json({
            "firstName": "test",
            "lastName": "testesen",
            "organisationId": "novari.no",
            "mail": "linda.loftsgarden@novari.no"
        } );
    }),
    http.get('http://localhost:8062/beta/fintlabs-no/api/users?size=3&page=0&search=Ada', () => {
        return HttpResponse.json({
            "users": [
            {
                "id": 1129,
                "fullName": "Ada Andersen",
                "organisationUnitName": "INFRA Vei- og geofag",
                "organisationUnitId": "89",
                "userType": "EMPLOYEE"
            },
            {
                "id": 945,
                "fullName": "Adam Hanssen",
                "organisationUnitName": "OKO Budsjett- og finansseksjon",
                "organisationUnitId": "27",
                "userType": "EMPLOYEE"
            }
        ],
            "currentPage": 0,
            "totalPages": 1,
            "totalItems": 2
        } );
    }),
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources?size=3&page=0&search=Adobe', () => {
        return HttpResponse.json({
            "resources": [
                {
                    "id": 1,
                    "resourceId": "adobek12",
                    "resourceName": "Adobe K12 Utdanning",
                    "resourceType": "ApplicationResource",
                    "resourceLimit": 1000
                },
                {
                    "id": 2,
                    "resourceId": "msproject",
                    "resourceName": "Microsoft Project Enterprise",
                    "resourceType": "ApplicationResource",
                    "resourceLimit": 100
                },
                {
                    "id": 3,
                    "resourceId": "mskabal",
                    "resourceName": "Microsoft Kabal",
                    "resourceType": "ApplicationResource",
                    "resourceLimit": 300
                },
                {
                    "id": 4,
                    "resourceId": "f887f35a0fab01f3e3e2c5c2",
                    "resourceName": "Creative Cloud All Apps for K-12 - Shared Device",
                    "resourceType": "ApplicationResource",
                    "resourceLimit": 25
                },
                {
                    "id": 5,
                    "resourceId": "ff75076c4ce53f5ca51b1cbb",
                    "resourceName": "Creative Cloud All Apps for K-12 - User License",
                    "resourceType": "ApplicationResource",
                    "resourceLimit": 10000
                }
            ],
            "currentPage": 0,
            "totalPages": 1,
            "totalItems": 5
        } );
    }),
];



