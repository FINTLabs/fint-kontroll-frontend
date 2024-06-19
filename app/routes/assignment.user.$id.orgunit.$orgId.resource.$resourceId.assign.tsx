import {
    Form,
    Links,
    Meta,
    Scripts,
    useNavigate,
    useNavigation,
    useParams,
    useRouteError,
    useSearchParams
} from "@remix-run/react";
import {Alert, BodyShort, Box, Button, Loader, Modal} from "@navikt/ds-react";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {createUserAssignment} from "~/data/fetch-assignments";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    const response = await createUserAssignment(request.headers.get("Authorization"),
        parseInt(data.get("resourceRef") as string),
        parseInt(data.get("userRef") as string),
        data.get("organizationUnitId") as string)

    return redirect(`/assignment/user/${data.get("userRef")}/orgunit/${data.get("organizationUnitId")}?page=${searchParams.get("page")}&responseCode=${response.status}`)
}

export default function NewAssignment1() {
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
                onClose={() => navigate(`/assignment/user/${params.id}/orgunit/${params.orgId}?page=${searchParams.get("page")}`)}
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
                        <input value={params.resourceId} type="hidden" name="resourceRef"/>
                        <input value={params.id} type="hidden" name="userRef"/>
                        <input value={params.orgId} type="hidden" name="organizationUnitId"/>
                        {response.state === "submitting" ?
                            <Button loading>Lagre</Button>
                            :
                            <Button type="submit" variant="primary">
                                Lagre
                            </Button>
                        }
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`/assignment/user/${params.id}/orgunit/${params.orgId}?page=${searchParams.get("page")}`)}
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