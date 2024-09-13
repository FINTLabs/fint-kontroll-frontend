import {http, HttpResponse} from "msw";

export const assignmentHandlers = [
    http.post('http://localhost:8061/beta/fintlabs-no/api/assignments', () => {
        return HttpResponse. json({}, { status: 201 })
    }),

    // TODO: This api returns 410 on succsess, but should maybe return 204?
    http.delete('http://localhost:8061/beta/fintlabs-no/api/assignments/:id', () => {
        return HttpResponse. json({}, { status: 410 })
    })
]