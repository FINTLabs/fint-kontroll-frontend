import { CopyButton } from '@navikt/ds-react';
import React from 'react';

export const ErrorCopyButton = ({
    correlationId,
    errorUrl,
    errorCode,
    timestamp,
    basePath,
}: {
    correlationId: string;
    errorUrl: string;
    errorCode: string;
    timestamp: number;
    basePath: string;
}) => {
    return (
        <CopyButton
            copyText={`CorrelationId: ${correlationId} | 
            Route: ${errorUrl} | 
            Status: ${errorCode} | 
            Tidspunkt: ${timestamp} | 
            Org: ${basePath}`}
            text="Kopier"
        />
    );
};
