import styles from '../components/resource/resource.css?url';
import { Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { Link as RemixLink, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchResourceById } from '~/data/fetch-resources';
import { ResourceDetailTable } from '~/components/service-admin/ResourceDetailTable';
import { ArrowRightIcon, PencilIcon } from '@navikt/aksel-icons';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import {
    fetchLicenseEnforcements,
    fetchResourceDataSource,
    fetchUserTypes,
} from '~/data/fetch-kodeverk';
import { ResourceInfoBox } from '~/components/common/ResourceInfoBox';
import React from 'react';
import {
    getEditResourceUrl,
    getEditValidForOrgUnitsUrl,
    getResourceByIdUrl,
    SERVICE_ADMIN,
} from '~/data/paths';
import { IResource } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const [resource, source, userTypesKodeverk, licenseEnforcementKodeverk] = await Promise.all([
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request),
        fetchUserTypes(request),
        fetchLicenseEnforcements(request),
    ]);

    return {
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        resource,
        source,
        userTypesKodeverk,
        licenseEnforcementKodeverk,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <RemixLink to={SERVICE_ADMIN} className={'breadcrumb-link'}>
                    Ressursadministrasjon
                </RemixLink>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <RemixLink to={getResourceByIdUrl(params.id)} className={'breadcrumb-link'}>
                    Ressursinfo
                </RemixLink>
            </HStack>
        </HStack>
    ),
};

export default function ResourceById() {
    const loaderData = useLoaderData<typeof loader>();
    const { userTypesKodeverk, source, licenseEnforcementKodeverk } = loaderData;
    const resource: IResource = loaderData.resource;
    const responseCode: string | undefined = loaderData.responseCode;
    const navigate = useNavigate();

    return (
        <section className={'content'}>
            <VStack gap="12">
                <VStack gap="4">
                    {source === 'gui' && (
                        <HStack justify={'end'} align={'end'}>
                            <Button
                                role="link"
                                className={'no-underline-button'}
                                variant={'secondary'}
                                iconPosition="right"
                                icon={<PencilIcon aria-hidden />}
                                onClick={() => navigate(getEditResourceUrl(resource.id))}>
                                Rediger ressurs
                            </Button>
                        </HStack>
                    )}

                    <ResponseAlert
                        responseCode={responseCode}
                        successText={'Ressursen ble oppdatert!'}
                        deleteText={'Ressursen ble slettet!'}
                    />

                    <ResourceInfoBox
                        resource={resource}
                        userTypeKodeverk={userTypesKodeverk}
                        isAdmin={true}
                        licenseEnforcementKodeverk={licenseEnforcementKodeverk}
                    />
                </VStack>

                <VStack gap="4">
                    <Heading level="2" size="large" align={'center'} spacing>
                        Tilgjengelig for følgende organisasjonsenheter
                    </Heading>
                    {source === 'gui' && (
                        <HStack justify={'end'} align={'end'}>
                            <Button
                                role="link"
                                className={'no-underline-button'}
                                variant={'secondary'}
                                iconPosition="right"
                                icon={<PencilIcon aria-hidden />}
                                onClick={() => navigate(getEditValidForOrgUnitsUrl(resource.id))}>
                                Rediger organisasjonsenheter
                            </Button>
                        </HStack>
                    )}
                    <ResourceDetailTable resource={resource} />
                </VStack>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
