import React from 'react';
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {Form, useNavigate, useParams, useSearchParams} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";

export async function action({params, request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    const response = await deleteAssignment(request.headers.get("Authorization"), data.get("assignmentRef") as string)

    return redirect(`/users/${data.get("userRef")}/orgunit/${params.orgId}?page=${searchParams.get("page")}&search=${searchParams.get("search")}&responseCode=${response.status}`)
}

export default function DeleteUserAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(`/users/${params.id}/orgunit/${params.orgId}?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
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
                        <input value={params.id} type="hidden" name="userRef"/>

                        <Button type="submit" variant="primary">
                            Slett
                        </Button>
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`/users/${params.id}/orgunit/${params.orgId}?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}