import {
    ActionFunctionArgs,
    Form,
    LoaderFunctionArgs,
    redirect,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
    useRouteError,
    useSearchParams,
} from 'react-router';
import { BodyShort, Button, ConfirmationPanel, Heading, Modal, VStack } from '@navikt/ds-react';
import { createRoleAssignment } from '~/data/fetch-assignments';
import { fetchResourceById } from '~/data/fetch-resources';
import React, { useState } from 'react';
import { getResourceNewRoleAssignmentUrl } from '~/data/paths';
import { IResource } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const resource = await fetchResourceById(request, params.id);

    return {
        resource,
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);

    const response = await createRoleAssignment(
        request.headers.get('Authorization'),
        parseInt(data.get('resourceRef') as string),
        parseInt(data.get('roleRef') as string),
        data.get('organizationUnitId') as string
    );
    // const responseCode = response !== undefined ? response.status : 0

    return redirect(
        `${getResourceNewRoleAssignmentUrl(Number(data.get('resourceRef')))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status : '?responseCode=' + response.status}`
    );
}

export default function NewAssignment1() {
    const params = useParams<string>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const response = useNavigation();
    const [checked, setChecked] = useState(false);

    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource;

    function SaveButton() {
        if (response.state === 'submitting') {
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
                onClose={() =>
                    navigate(
                        `${getResourceNewRoleAssignmentUrl(Number(params.id))}${prepareQueryParamsWithResponseCode(searchParams)}`
                    )
                }
                header={{
                    heading: 'Fullfør tildelingen',
                    size: 'small',
                    closeButton: false,
                }}
                width="medium">
                <Modal.Body>
                    <VStack gap="4">
                        <BodyShort>{resource.resourceName}</BodyShort>
                        {resource.hasCost ? (
                            <ConfirmationPanel
                                checked={checked}
                                label="Jeg bekrefter at jeg har fått nødvendig godkjenning."
                                onChange={() => setChecked((checked) => !checked)}
                                size="small">
                                <Heading level="2" size="xsmall">
                                    Denne tildelingen krever godkjenning fra leder!
                                </Heading>
                            </ConfirmationPanel>
                        ) : null}
                        <BodyShort>Trykk lagre for å bekrefte tildeling av ressursen</BodyShort>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={'POST'}>
                        <input value={params.id} type="hidden" name="resourceRef" />
                        <input value={params.roleId} type="hidden" name="roleRef" />
                        <input value={params.orgId} type="hidden" name="organizationUnitId" />
                        {SaveButton()}
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                `${getResourceNewRoleAssignmentUrl(Number(params.id))}${prepareQueryParams(searchParams)}`
                            )
                        }>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
