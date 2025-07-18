import { BodyShort, Button, Modal } from '@navikt/ds-react';
import type { ActionFunctionArgs } from 'react-router';
import {
    Form,
    redirect,
    useNavigate,
    useNavigation,
    useParams,
    useSearchParams,
} from 'react-router';
import { deleteAssignment } from '~/data/fetch-assignments';
import { getResourceRoleAssignmentsUrl } from '~/data/paths';
import { prepareQueryParamsWithResponseCode } from '~/utils/searchParamsHelpers';
import { TrashIcon } from '@navikt/aksel-icons';
import React from 'react';

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);

    const response = await deleteAssignment(
        request.headers.get('Authorization'),
        data.get('assignmentRef') as string
    );

    return redirect(
        `${getResourceRoleAssignmentsUrl(Number(data.get('resourceRef')))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status : '?responseCode=' + response.status}`
    );
}

export default function DeleteRoleAssignment() {
    const params = useParams<string>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const response = useNavigation();

    return (
        <>
            <Modal
                open={true}
                onClose={() =>
                    navigate(
                        `${getResourceRoleAssignmentsUrl(Number(params.id))}?page=${searchParams.get('page')}&search=${searchParams.get('search')}`
                    )
                }
                header={{
                    heading: 'Ønsker du å trekke tilgangen?',
                    size: 'small',
                    closeButton: false,
                }}
                width="small">
                <Modal.Body>
                    <BodyShort>
                        Er du sikker på at du ønsker å trekke tilgangen til denne ressursen?
                    </BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={'DELETE'}>
                        <input value={params.assignmentRef} type="hidden" name="assignmentRef" />
                        <input value={params.id} type="hidden" name="resourceRef" />
                        {response.state === 'submitting' ? (
                            <Button loading>Slett</Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="danger"
                                icon={<TrashIcon title="søppelbøtte" />}
                                iconPosition={'right'}>
                                Slett
                            </Button>
                        )}
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                `${getResourceRoleAssignmentsUrl(Number(params.id))}?page=${searchParams.get('page')}&search=${searchParams.get('search')}`
                            )
                        }>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
