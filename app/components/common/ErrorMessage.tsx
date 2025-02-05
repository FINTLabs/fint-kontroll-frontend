import { Alert, Box } from '@navikt/ds-react';
import React from 'react';

export const ErrorMessage = ({ error }: { error: Error }) => {
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
};
