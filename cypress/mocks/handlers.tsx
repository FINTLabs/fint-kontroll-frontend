import { http, HttpResponse } from 'msw'
import {createNewResourceHandlers, resourceHandlers} from "./handlers/resourceHandlers";
import {roleHandlers} from "./handlers/roleHandlers";
import {usersHandlers} from "./handlers/usersHandlers";
import {kontrollAdminHandlers} from "./handlers/kontrollAdminHandlers";
import {resourceModulAdminHandlers} from "./handlers/resourceModulAdminHandlers";

export const handlers = [
    // Common handlers
    http.get('http://localhost:8062/beta/fintlabs-no/api/users/me', () => {
        return HttpResponse.json(
        {
                "firstName": "Mock",
                "lastName": "Name",
                "mail": "mock@novari.no",
                "organisationId": "mock.no"
            }
        )
    }),

    http.get('http://localhost:8060/beta/fintlabs-no/api/orgunits', () => {
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
    // --------------------------------------------------------------------------------------------------------------------------------

    ...resourceModulAdminHandlers,

    ...kontrollAdminHandlers,

    ...usersHandlers,

    ...roleHandlers,

    ...resourceHandlers,

    ...createNewResourceHandlers,

]
