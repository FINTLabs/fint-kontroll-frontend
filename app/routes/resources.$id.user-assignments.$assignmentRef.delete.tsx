import React from 'react';
import {BodyShort, Button, Loader, Modal} from "@navikt/ds-react";
import {Form, useNavigate, useNavigation, useParams, useSearchParams} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";
import {prepareQueryParams} from "~/components/common/CommonFunctions";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);
    const response = await deleteAssignment(request, data.get("assignmentRef") as string)
    searchParams.set("responseCode", String(response.status))

    return redirect(`/resources/${data.get("resourceRef")}/user-assignments${prepareQueryParams(searchParams)}`)
}

export default function DeleteUserAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const response = useNavigation()

    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }

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
                        {response.state === "submitting" ?
                            <Button loading>Slett</Button>
                            :
                            <Button type="submit" variant="primary">
                                Slett
                            </Button>
                        }
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