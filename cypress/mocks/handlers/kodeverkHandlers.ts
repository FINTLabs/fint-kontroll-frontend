import {http, HttpResponse} from "msw";

export const applicationCategoriesHandlers = [
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/kodeverk/applikasjonskategori/v1', () => {
        return HttpResponse.json(
            [
                {
                    "id": 2,
                    "name": "Kontorstøtte",
                    "description": "Beksrivelse vreskrivwelse",
                    "category": null
                },
                {
                    "id": 3,
                    "name": "Fagsystemer",
                    "description": "Bla bla lanjref refnjøer fnweø dwef ØRWIFØ BRHIAL EBAHLFB HRLF BHSFBHWBHL fbhlr bfhjelrf bhjderlf bherf herl fhberf bhjer bgfhjerl bghjelr gber.",
                    "category": null
                },
                {
                    "id": 1,
                    "name": "Pedagogisk programvare",
                    "description": "Kjempefin beskrivelse av pedagogisk programvare.",
                    "category": null
                }
            ]
        )
    }),
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/kodeverk/applikasjonskategori/v1/1', () => {
        return HttpResponse.json(
            {
                "id": 1,
                "name": "Pedagogisk programvare",
                "description": "Kjempefin beskrivelse av pedagogisk programvare.",
                "category": null
            },
        )
    }),
    http.get('http://localhost:8063/beta/fintlabs-no/api/resources/kodeverk/brukertype/v1', () => {
        return HttpResponse.json(
            [
                {
                    "id": 1,
                    "fkLabel": "Ansatt",
                    "label": "EMPLOYEESTAFF"
                },
                {
                    "id": 2,
                    "fkLabel": "Ansatt i utdanning",
                    "label": "EMPLOYEEFACULTY"
                },
                {
                    "id": 3,
                    "fkLabel": "Elev",
                    "label": "STUDENT"
                },
                {
                    "id": 4,
                    "fkLabel": "Ekstern",
                    "label": "EXTERNAL"
                }
            ]
        )
    })
]
