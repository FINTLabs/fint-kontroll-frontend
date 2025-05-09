import {
    Form,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
    useRouteError,
    useSearchParams,
} from '@remix-run/react';
import {
    BodyShort,
    Button,
    ConfirmationPanel,
    Heading,
    Loader,
    Modal,
    VStack,
} from '@navikt/ds-react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { createRoleAssignment } from '~/data/fetch-assignments';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchResourceById } from '~/data/fetch-resources';
import React, { useState } from 'react';
import { getRoleNewAssignmentUrl } from '~/data/paths';
import { IResource } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const resource = await fetchResourceById(request, params.resourceId);

    return json({
        resource,
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);

    // const queryParams = new URLSearchParams()

    const response = await createRoleAssignment(
        request.headers.get('Authorization'),
        parseInt(data.get('resourceRef') as string),
        parseInt(data.get('roleRef') as string),
        data.get('organizationUnitId') as string
    );

    return redirect(
        `${getRoleNewAssignmentUrl(Number(data.get('roleRef')))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status : '?responseCode=' + response.status}`
    );
}

export default function AssignResourceToRole() {
    const params = useParams<string>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const response = useNavigation();
    const [checked, setChecked] = useState(false);

    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource;

    if (response.state === 'loading') {
        return (
            <div className={'spinner'}>
                <Loader size="3xlarge" title="Venter..." />
            </div>
        );
    }

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
        <Modal
            open={true}
            onClose={() =>
                navigate(
                    `${getRoleNewAssignmentUrl(Number(params.id))}${prepareQueryParamsWithResponseCode(searchParams)}`
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
                            onChange={() => setChecked((x) => !x)}
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
                    <input value={params.resourceId} type="hidden" name="resourceRef" />
                    <input value={params.id} type="hidden" name="roleRef" />
                    <input value={params.orgId} type="hidden" name="organizationUnitId" />
                    {SaveButton()}
                </Form>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                        navigate(
                            `${getRoleNewAssignmentUrl(Number(params.id))}${prepareQueryParams(searchParams)}`
                        )
                    }>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
