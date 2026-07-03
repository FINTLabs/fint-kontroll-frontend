import {
    ActionFunctionArgs,
    Link,
    LoaderFunctionArgs,
    redirect,
    useLoaderData,
} from 'react-router';
import React from 'react';
import { Heading, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { editUserTypes, fetchUserTypes } from '~/data/fetch-kodeverk';
import { ArrowRightIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { SETTINGS, SETTINGS_USER_TYPES } from '~/data/paths';
import { MappingList } from '~/components/settings/KodeverkMappingList/MappingList';
import { BASE_PATH } from '../../environment';
import { ResponseAlert } from '~/components/common/ResponseAlert';

export const handle = {
    breadcrumb: () => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={SETTINGS} className={'breadcrumb-link'}>
                    Innstillinger
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={SETTINGS_USER_TYPES} className={'breadcrumb-link'}>
                    Brukertyper
                </Link>
            </HStack>
        </HStack>
    ),
};
export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);

    return {
        userTypes: await fetchUserTypes(request),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        correlationId: url.searchParams.get('correlationId') ?? undefined,
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const updates: { id: number; fkLabel: string }[] = [];

    for (const [key, value] of form.entries()) {
        if (key.startsWith('fkLabel_')) {
            updates.push({
                id: Number(key.replace('fkLabel_', '')),
                fkLabel: value as string,
            });
        }
    }

    const response = await editUserTypes(request.headers.get('Authorization'), updates);

    const params = new URLSearchParams();
    params.set('responseCode', String(response.status));
    params.set('correlationId', response.headers.get('x-correlation-id') ?? '');

    return redirect(`${SETTINGS_USER_TYPES}?${params.toString()}`);
}

export default function SettingsUserTypes() {
    const { userTypes, basePath, responseCode, correlationId } = useLoaderData<typeof loader>();

    return (
        <div className="content">
            <VStack gap="space-24">
                <Heading level="1" size="large">
                    Brukertyper
                </Heading>

                <InfoCard data-color="info">
                    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                        <InfoCard.Title>Informasjon</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        FINT Kontroll har et sett ferdigdefinerte brukertyper. Disse brukes til å
                        kontrollere hvem som kan få tilgang til de ulike ressursene. Her kan du
                        endre navnet på disse brukertypene som vises i FINT Kontroll.
                    </InfoCard.Content>
                </InfoCard>

                <ResponseAlert
                    key={correlationId}
                    responseCode={responseCode}
                    correlationId={correlationId}
                    basepath={basePath}
                    successText="Oppdateringen var vellykket!"
                />

                <MappingList
                    listItems={userTypes}
                    name="Brukertype"
                    duplicateErrorText="En brukertype med samme navn eksisterer allerede."
                />
            </VStack>
        </div>
    );
}
