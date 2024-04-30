import React from 'react';
import {Alert, BodyShort, Box, Button, Modal} from "@navikt/ds-react";
import {Form, Links, Meta, Scripts, useNavigate, useParams, useRouteError} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    await deleteAssignment(request.headers.get("Authorization"), data.get("assignmentRef") as string)

    return redirect(`/resources/${data.get("resourceRef")}/role-assignments?page=${searchParams.get("page")}`)
}

export default function DeleteRoleAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(-1)}
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
                    <Form method={"DELETE"}>
                        <input value={params.assignmentRef} type="hidden" name="assignmentRef"/>
                        <input value={params.id} type="hidden" name="resourceRef"/>

                        <Button type="submit" variant="primary">
                            Slett
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
    );
}
export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}