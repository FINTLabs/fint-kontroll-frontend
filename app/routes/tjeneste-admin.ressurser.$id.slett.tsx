import React from 'react';
import { BodyShort, Button, Loader, Modal } from '@navikt/ds-react';
import type { ActionFunctionArgs } from 'react-router';
import {
    Form,
    redirect,
    useNavigate,
    useNavigation,
    useParams,
    useSearchParams,
} from 'react-router';
import { deleteResource } from '~/data/fetch-resources';
import { SERVICE_ADMIN } from '~/data/paths';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';
import { TrashIcon } from '@navikt/aksel-icons';

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);
    const response = await deleteResource(
        request.headers.get('Authorization'),
        request,
        data.get('id') as string
    );
    searchParams.set('responseCode', String(response.status));
    return redirect(`${SERVICE_ADMIN}${prepareQueryParamsWithResponseCode(searchParams)}`);
}

export default function DeleteResource() {
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
                    navigate(`${SERVICE_ADMIN}${prepareQueryParamsWithResponseCode(searchParams)}`)
                }
                header={{
                    heading: 'Ønsker du å slette denne ressursen?',
                    size: 'small',
                    closeButton: false,
                }}
                width="small">
                <Modal.Body>
                    <BodyShort>Er du sikker på at du ønsker å slette denne ressursen?</BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={'DELETE'}>
                        <input value={params.id} type="hidden" name="id" />
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
                            navigate(`${SERVICE_ADMIN}${prepareQueryParams(searchParams)}`)
                        }>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
