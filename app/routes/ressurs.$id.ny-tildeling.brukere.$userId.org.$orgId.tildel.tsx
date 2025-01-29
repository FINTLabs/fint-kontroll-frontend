import {
    Form,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
    useRouteError,
    useSearchParams
} from "@remix-run/react";
import {useState} from "react";
import {Alert, BodyShort, Box, Button, ConfirmationPanel, Heading, Modal, VStack} from "@navikt/ds-react";
import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {createUserAssignment} from "~/data/fetch-assignments";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {prepareQueryParams, prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {getResourceNewUserAssignmentUrl} from "~/data/paths";
import {IResource} from "~/data/types/resourceTypes";

export async function loader({request, params}: LoaderFunctionArgs) {

    const [responseResource] = await Promise.all([
        fetchResourceById(request, params.id),
    ]);
    const resource: IResource = await responseResource.json()

    return json({
        resource,
    })
}

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    const response = await createUserAssignment(request.headers.get("Authorization"),
        parseInt(data.get("resourceRef") as string),
        parseInt(data.get("userRef") as string),
        data.get("organizationUnitId") as string)

    return redirect(`${getResourceNewUserAssignmentUrl(Number(data.get("resourceRef")))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)
}

export default function NewAssignment1() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const response = useNavigation()
    const [checked, setChecked] = useState(false);


    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource

    function SaveButton() {
        if (response.state === "submitting") {
            return <Button loading>Lagre</Button>;
        } else if (resource.hasCost && !checked) {
            return <Button disabled={true}>Lagre</Button>;
        } else {
            return (
                <Button type="submit" variant="primary">
                    Lagre
                </Button>
            );
        }
    }

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(`${getResourceNewUserAssignmentUrl(Number(params.id))}${prepareQueryParamsWithResponseCode(searchParams)}`)}
                header={{
                    heading: "Fullfør tildelingen",
                    size: "small",
                    closeButton: false,
                }}
                width="medium"
            >
                <Modal.Body>
                    <VStack gap="4">
                        <BodyShort>
                            {resource.resourceName}
                        </BodyShort>
                        {resource.hasCost ?
                            <ConfirmationPanel
                                checked={checked}
                                label="Jeg bekrefter at jeg har fått nødvendig godkjenning."
                                onChange={() => setChecked((x) => !x)}
                                size="small"
                            >
                                <Heading level="2" size="xsmall">
                                    Denne tildelingen krever godkjenning fra leder!
                                </Heading>
                            </ConfirmationPanel>
                            : null}
                        <BodyShort>
                            Trykk lagre for å bekrefte tildelingen
                        </BodyShort>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={"POST"}>
                        <input value={params.id} type="hidden" name="resourceRef"/>
                        <input value={params.userId} type="hidden" name="userRef"/>
                        <input value={params.orgId} type="hidden" name="organizationUnitId"/>
                        {SaveButton()}
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`${getResourceNewUserAssignmentUrl(Number(params.id))}${prepareQueryParams(searchParams)}`)}
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
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
}