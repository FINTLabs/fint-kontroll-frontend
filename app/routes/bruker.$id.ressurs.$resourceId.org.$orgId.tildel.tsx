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
import {
    BodyShort,
    Button,
    Checkbox,
    CheckboxGroup,
    HStack,
    Loader,
    LocalAlert,
    Modal,
    VStack,
} from '@navikt/ds-react';
import { createUserAssignment } from '~/data/fetch-assignments';
import { fetchResourceById } from '~/data/fetch-resources';
import React, { useState } from 'react';
import { getUserNewAssignmentUrl } from '~/data/paths';
import { IResource } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import {
    prepareQueryParams,
    prepareQueryParamsWithResponseCode,
} from '~/utils/searchParamsHelpers';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const resource = await fetchResourceById(request, params.resourceId);

    return {
        resource,
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);

    const response = await createUserAssignment(
        request.headers.get('Authorization'),
        parseInt(data.get('resourceRef') as string),
        parseInt(data.get('userRef') as string),
        data.get('organizationUnitId') as string
    );
    return redirect(
        `${getUserNewAssignmentUrl(parseInt(data.get('userRef') as string), (data.get('organizationUnitId') as string | null) || undefined)}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status + '&correlationId=' + response.headers.get('x-correlation-id') : '?responseCode=' + response.status + '&correlationId=' + response.headers.get('x-correlation-id')}`
    );
}

export default function NewAssignment() {
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
        <>
            <Modal
                open={true}
                onClose={() =>
                    navigate(
                        `${getUserNewAssignmentUrl(Number(params.id), params.orgId)}${prepareQueryParamsWithResponseCode(searchParams)}`
                    )
                }
                header={{
                    heading: 'Fullfør tildelingen',
                    size: 'small',
                    closeButton: false,
                }}
                width="medium">
                <Modal.Body>
                    <VStack gap="space-4">
                        <BodyShort>{resource.resourceName}</BodyShort>

                        {resource.hasCost ? (
                            <LocalAlert status="announcement">
                                <LocalAlert.Header>
                                    <LocalAlert.Title>
                                        Denne tildelingen krever godkjenning fra leder!
                                    </LocalAlert.Title>
                                </LocalAlert.Header>
                                <LocalAlert.Content>
                                    <HStack gap="space-12">
                                        <CheckboxGroup
                                            legend="Transportmiddel"
                                            hideLegend
                                            onChange={() => setChecked((x) => !x)}>
                                            <Checkbox value="public">
                                                Jeg bekrefter at jeg har fått nødvendig godkjenning.
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </HStack>
                                </LocalAlert.Content>
                            </LocalAlert>
                        ) : null}
                        <BodyShort>Trykk lagre for å bekrefte tildeling av ressursen</BodyShort>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Form method={'POST'}>
                        <input value={params.resourceId} type="hidden" name="resourceRef" />
                        <input value={params.id} type="hidden" name="userRef" />
                        <input value={params.orgId} type="hidden" name="organizationUnitId" />
                        {SaveButton()}
                    </Form>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                `${getUserNewAssignmentUrl(Number(params.id), params.orgId)}${prepareQueryParams(searchParams)}`
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
