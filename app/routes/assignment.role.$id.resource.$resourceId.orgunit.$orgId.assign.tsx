import {Form, Links, Meta, Scripts, useNavigate, useParams, useRouteError, useSearchParams} from "@remix-run/react";
import {Alert, BodyShort, Box, Button, Modal} from "@navikt/ds-react";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {createRoleAssignment} from "~/data/fetch-assignments";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url)

    const queryParams = new URLSearchParams()

    const response = await createRoleAssignment(request.headers.get("Authorization"),
        parseInt(data.get("resourceRef") as string),
        parseInt(data.get("roleRef") as string),
        data.get("organizationUnitId") as string)

    searchParams.get("page") ? queryParams.append("page", searchParams.get("page") ?? "0") : ""
    queryParams.append("responseCode", String(response.status))

    return redirect(`/assignment/role/${data.get("roleRef")}?${queryParams}`)
}

export default function AssignResourceToRole() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()


    return (
        <Modal
            open={true}
            onClose={() => navigate(`/assignment/role/${params.id}${searchParams.get("page") ? '?page='+searchParams.get("page") : ""}`)}
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
                    <input value={params.resourceId} type="hidden" name="resourceRef" />
                    <input value={params.id} type="hidden" name="roleRef" />
                    <input value={params.orgId} type="hidden" name="organizationUnitId" />

                    <Button type="submit" variant="primary">
                        Lagre
                    </Button>
                </Form>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(`/assignment/role/${params.id}${searchParams.get("page") ? searchParams.get("page") : ""}`)}
                >
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
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