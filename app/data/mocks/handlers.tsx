import {http, HttpResponse} from 'msw';

export const handlers = [
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        return HttpResponse.json({
            "firstName": "test",
            "lastName": "testesen",
            "organisationId": "novari.no",
            "mail": "linda.loftsgarden@novari.no"
        });
    }),

    http.get('http://localhost:8062/beta/fintlabs-no/api/users*', () => {
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
                    "id": 1044,
                    "fullName": "Andreas Andersen",
                    "organisationUnitName": "KOMP Fag- og yrkesopplæring",
                    "organisationUnitId": "161",
                    "userType": "EMPLOYEE"
                },
                {
                    "id": 1562,
                    "fullName": "Astrid Andersen",
                    "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                    "organisationUnitId": "194",
                    "userType": "STUDENT"
                },
                {
                    "id": 873,
                    "fullName": "Edvard Andersen",
                    "organisationUnitName": "VGSTOR Administrasjon",
                    "organisationUnitId": "205",
                    "userType": "EMPLOYEE"
                },
                {
                    "id": 1505,
                    "fullName": "Elisabeth Andersen",
                    "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                    "organisationUnitId": "194",
                    "userType": "STUDENT"
                },
                {
                    "id": 1223,
                    "fullName": "Elisabeth Andersen",
                    "organisationUnitName": "VGMIDT Midtbyen videregående skole",
                    "organisationUnitId": "194",
                    "userType": "STUDENT"
                },
                {
                    "id": 1056,
                    "fullName": "Gunnar Andersen",
                    "organisationUnitName": "DIGIT Lokasjonssupport sone 1",
                    "organisationUnitId": "1119",
                    "userType": "EMPLOYEE"
                },
                {
                    "id": 834,
                    "fullName": "Håkon Andersen",
                    "organisationUnitName": "VGMIDT Administrasjon",
                    "organisationUnitId": "195",
                    "userType": "EMPLOYEE"
                },
                {
                    "id": 969,
                    "fullName": "Ine Andersen",
                    "organisationUnitName": "FAK Finans og administrasjon",
                    "organisationUnitId": "5",
                    "userType": "EMPLOYEE"
                },
                {
                    "id": 921,
                    "fullName": "Jane Andersen",
                    "organisationUnitName": "OKO Regnskapsseksjon",
                    "organisationUnitId": "30",
                    "userType": "EMPLOYEE"
                },
            ],
            "currentPage": 0,
            "totalPages": 10,
            "totalItems": 100
        });
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
        });
    }),
];



