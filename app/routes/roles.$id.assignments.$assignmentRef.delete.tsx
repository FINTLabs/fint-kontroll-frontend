import React from 'react';
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {Form, useNavigate, useParams, useSearchParams} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";

export async function action({params, request}: ActionFunctionArgs) {
    const {searchParams} = new URL(request.url)

    const response = await deleteAssignment(request.headers.get("Authorization"), params.assignmentRef as string)

    return redirect(`/roles/${params.id}/assignments?page=${searchParams.get("page")}&search=${searchParams.get("search")}&responseCode=${response.status}`)
}

export default function DeleteRoleAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    return (
        <Modal
            open={true}
            onClose={() => navigate(`/roles/${params.id}/assignments?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
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
                    <Button type="submit" variant="primary">
                        Slett
                    </Button>
                </Form>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(`/roles/${params.id}/assignments?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
                >
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}