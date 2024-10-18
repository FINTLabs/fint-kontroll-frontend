import {http, HttpResponse} from "msw";

export const applicationCategoryHandlers = [
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
                    "description": "heierferferrefeferf egea gea",
                    "category": null
                }
            ]
        )
    })]
