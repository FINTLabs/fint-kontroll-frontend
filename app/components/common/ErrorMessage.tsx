import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router';

export const ErrorMessage = ({ error }: { error: any }) => {
    console.error(error);
    if (!error?.message) {
        return (
            <VStack gap="4" align="start" marginBlock={'12 0'}>
                <Heading level="1" size="large" spacing>
                    Beklager, vi fant ikke det du så etter
                </Heading>
                <BodyShort>
                    Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                </BodyShort>
                <Link to={'/'}>Gå til forsiden</Link>
            </VStack>
        );
    }
    const isConnectionRefused = error?.message?.includes('ECONNREFUSED');
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>
                    {isConnectionRefused
                        ? 'Kunne ikke kontakte serveren. Vennligst vent litt og prøv igjen.'
                        : error?.message}
                </div>
            </Alert>
        </Box>
    );
};
