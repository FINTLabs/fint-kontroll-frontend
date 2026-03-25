import { BodyShort, Box, Heading, LocalAlert, VStack } from '@navikt/ds-react';
import React from 'react';
import { Link, useLocation } from 'react-router';
import { ErrorCopyButton } from '~/components/common/ErrorCopyButton';

export const ErrorMessage = ({ error }: { error: any }) => {
    if (!error?.message) {
        return (
            <VStack gap="4" align="start" marginBlock={'12 0'}>
                <Heading level="1" size="large" spacing>
                    Beklager, vi fant ikke det du ser etter.
                </Heading>
                <BodyShort>
                    Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                </BodyShort>
                <Link to={'/'}>Gå til forsiden</Link>
            </VStack>
        );
    }
    const isConnectionRefused = error?.message?.includes('ECONNREFUSED');
    const correlationId = error?.correlationId;
    const location = useLocation();
    const basePath = error.url.split('/').filter(Boolean)[2] ?? '';
    const errorUrl = location.pathname + location.search;
    const errorCode = error?.errorCode;
    const errorTime = error?.timestamp;
    /* const errorApiUrl = error.url;*/

    return (
        <Box paddingBlock="8">
            <LocalAlert status="error">
                <LocalAlert.Header>
                    <LocalAlert.Title>Det oppsto en feil {errorCode ?? errorCode}</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    <Box padding="space-12">
                        {isConnectionRefused
                            ? 'Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.'
                            : error.message}
                    </Box>

                    {correlationId && (
                        <Box
                            marginBlock="4"
                            padding="space-12"
                            borderWidth="1"
                            borderRadius={{ md: '8' }}>
                            <BodyShort>Feilkode: {errorCode}</BodyShort>
                            <BodyShort>Organisasjon: {basePath}</BodyShort>
                            <BodyShort>URL: {errorUrl}</BodyShort>
                            {/* <BodyShort>API: {errorApiUrl}</BodyShort>*/}
                            <BodyShort>
                                Tidspunkt: {new Date(errorTime).toLocaleString('no-NO')}
                            </BodyShort>
                            <BodyShort spacing>Korrelasjon-ID: {correlationId}</BodyShort>
                            <BodyShort weight={'semibold'}>
                                Klikk på knappen for å kopiere informasjon som du sender med i
                                feilrapporteringen. Dette vil hjelpe til med å effektivisere
                                feilsøkingen.
                            </BodyShort>
                            <ErrorCopyButton
                                correlationId={correlationId}
                                errorUrl={errorUrl}
                                errorCode={errorCode}
                                timestamp={errorTime}
                                basePath={basePath}
                            />
                        </Box>
                    )}
                </LocalAlert.Content>
            </LocalAlert>
        </Box>
    );
};
