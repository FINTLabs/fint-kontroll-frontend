import React from 'react';
import { BodyShort, Button, Loader, Modal } from '@navikt/ds-react';
import { Form, useNavigate, useNavigation, useParams, useSearchParams } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { deleteAssignment } from '~/data/fetch-assignments';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/components/common/CommonFunctions';
import { getRoleAssignmentsUrl } from '~/data/paths';

export async function action({ params, request }: ActionFunctionArgs) {
    const { searchParams } = new URL(request.url);
    const response = await deleteAssignment(
        request.headers.get('Authorization'),
        request,
        params.assignmentRef as string
    );
    searchParams.set('responseCode', String(response.status));

    return redirect(
        `${getRoleAssignmentsUrl(Number(params.id))}${prepareQueryParamsWithResponseCode(searchParams)}`
    );
}

export default function DeleteRoleAssignment() {
    const params = useParams<string>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const response = useNavigation();

    if (response.state === 'loading') {
        return (
            <div className={'spinner'}>
                <Loader size="3xlarge" title="Venter..." />
            </div>
        );
    }

    return (
        <Modal
            open={true}
            onClose={() =>
                navigate(
                    `${getRoleAssignmentsUrl(Number(params.id))}${prepareQueryParamsWithResponseCode(searchParams)}`
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
                <Form method={'POST'}>
                    {response.state === 'submitting' ? (
                        <Button loading>Slett</Button>
                    ) : (
                        <Button type="submit" variant="primary">
                            Slett
                        </Button>
                    )}
                </Form>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                        navigate(
                            `${getRoleAssignmentsUrl(Number(params.id))}${prepareQueryParams(searchParams)}`
                        )
                    }>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
