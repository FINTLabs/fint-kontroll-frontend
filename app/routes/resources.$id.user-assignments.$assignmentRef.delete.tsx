import React from 'react';
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {Form, useNavigate, useParams, useSearchParams} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";
import {prepareQueryParams} from "~/components/common/CommonFunctions";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    const response = await deleteAssignment(request.headers.get("Authorization"), data.get("assignmentRef") as string)

    return redirect(`/resources/${data.get("resourceRef")}/user-assignments?page=${searchParams.get("page")}&search=${searchParams.get("search")}&responseCode=${response.status}`)
}

export default function DeleteUserAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(`/resources/${params.id}/user-assignments${prepareQueryParams(searchParams)}`)}
                header={{
                    heading: "Ønsker du å trekke tilgangen?",
                    size: "small",
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyShort>
                        Er du sikker på at du ønsker å trekke tilgangen til denne ressursen?
                    </BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={"POST"}>
                        <input value={params.assignmentRef} type="hidden" name="assignmentRef"/>
                        <input value={params.id} type="hidden" name="resourceRef"/>

                        <Button type="submit" variant="primary">
                            Slett
                        </Button>
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`/resources/${params.id}/user-assignments${prepareQueryParams(searchParams)}`)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}