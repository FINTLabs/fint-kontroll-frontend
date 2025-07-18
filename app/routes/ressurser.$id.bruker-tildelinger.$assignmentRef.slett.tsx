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
import { getResourceUserAssignmentsUrl } from '~/data/paths';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';
import { TrashIcon } from '@navikt/aksel-icons';
import React from 'react';

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);
    const response = await deleteAssignment(
        request.headers.get('Authorization'),
        data.get('assignmentRef') as string
    );
    searchParams.set('responseCode', String(response.status));
    return redirect(
        `${getResourceUserAssignmentsUrl(Number(data.get('resourceRef')))}${prepareQueryParamsWithResponseCode(searchParams)}`
    );
}

export default function DeleteUserAssignment() {
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
                        `${getResourceUserAssignmentsUrl(Number(params.id))}${prepareQueryParams(searchParams)}`
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
                                `${getResourceUserAssignmentsUrl(Number(params.id))}${prepareQueryParams(searchParams)}`
                            )
                        }>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
