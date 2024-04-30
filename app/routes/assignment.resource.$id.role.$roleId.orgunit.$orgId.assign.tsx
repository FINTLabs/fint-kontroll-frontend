import {Form, Links, Meta, Scripts, useNavigate, useParams, useRouteError} from "@remix-run/react";
import React from "react";
import {Alert, BodyShort, Box, Button, Modal} from "@navikt/ds-react";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {createRoleAssignment} from "~/data/fetch-assignments";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    await createRoleAssignment(request.headers.get("Authorization"),
        parseInt(data.get("resourceRef") as string),
        parseInt(data.get("roleRef") as string),
        data.get("organizationUnitId") as string)

    return redirect(`/assignment/resource/${data.get("resourceRef")}/role?page=${searchParams.get("page")}`)
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
                        <input value={params.roleId} type="hidden" name="roleRef"/>
                        <input value={params.orgunitId} type="hidden" name="organizationUnitId"/>

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