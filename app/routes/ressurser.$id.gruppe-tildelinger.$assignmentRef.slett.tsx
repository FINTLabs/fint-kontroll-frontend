import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {Form, useNavigate, useNavigation, useParams, useSearchParams} from "@remix-run/react";
import type {ActionFunctionArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {deleteAssignment} from "~/data/fetch-assignments";
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {getResourceRoleAssignmentsUrl} from "~/data/paths";

export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);

    const response = await deleteAssignment(request.headers.get("Authorization"), request, data.get("assignmentRef") as string)

    return redirect(`${getResourceRoleAssignmentsUrl(Number(data.get("resourceRef")))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)
}

export default function DeleteRoleAssignment() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const response = useNavigation()

    return (
        <>
            <Modal
                open={true}
                onClose={() => navigate(`${getResourceRoleAssignmentsUrl(Number(params.id))}?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
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
                        onClick={() => navigate(`${getResourceRoleAssignmentsUrl(Number(params.id))}?page=${searchParams.get("page")}&search=${searchParams.get("search")}`)}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}