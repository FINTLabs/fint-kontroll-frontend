import React from 'react';
import { BodyShort, Button, Loader, Modal } from '@navikt/ds-react';
import { Form, useNavigate, useNavigation, useParams, useSearchParams } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { deleteAssignment } from '~/data/fetch-assignments';
import { getUserByIdUrl } from '~/data/paths';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';
import { TrashIcon } from '@navikt/aksel-icons';

export async function action({ params, request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);

    const response = await deleteAssignment(
        request.headers.get('Authorization'),
        data.get('assignmentRef') as string
    );

    return redirect(
        `${getUserByIdUrl(Number(params.id), params.orgId)}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status : '?responseCode=' + response.status}`
    );
    // return redirect(`/users/${data.get("userRef")}/orgunit/${params.orgId}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)
}

export default function DeleteUserAssignment() {
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
        <>
            <Modal
                open={true}
                onClose={() =>
                    navigate(
                        `${getUserByIdUrl(Number(params.id), params.orgId)}${prepareQueryParamsWithResponseCode(searchParams)}`
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
                        <input value={params.assignmentRef} type="hidden" name="assignmentRef" />
                        <input value={params.id} type="hidden" name="userRef" />
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
                                `${getUserByIdUrl(Number(params.id), params.orgId)}${prepareQueryParams(searchParams)}`
                            )
                        }>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
