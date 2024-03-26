import {Form, useNavigate, useParams} from "@remix-run/react";
import React from "react";
import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {createUserAssignment} from "~/data/fetch-assignments";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const { searchParams } = new URL(request.url);
    console.log("request", request)

     createUserAssignment(request.headers.get("Authorization"),
        parseInt(data.get("resourceRef") as string),
        parseInt(data.get("userRef") as string),
        data.get("organizationUnitId") as string)

    return redirect(`/assignment/resource/${data.get("resourceRef")}/user?page=${searchParams.get("page")}`)
}

export default function NewAssignment1() {
    const params = useParams<string>()
    const navigate = useNavigate()

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(-1)}
                header={{
                    heading: "Fullfør tildelingen",
                    size: "small",
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyShort>
                        Trykk lagre for å bekrefte tildeling av ressursen
                    </BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={"POST"}>
                        <input value={params.id} type="hidden" name="resourceRef"/>
                        <input value={params.userId} type="hidden" name="userRef"/>
                        <input value={params.orgId} type="hidden" name="organizationUnitId"/>

                        <Button type="submit" variant="primary">
                            Lagre
                        </Button>
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}