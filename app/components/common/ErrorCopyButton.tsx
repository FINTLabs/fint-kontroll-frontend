import { CopyButton } from '@navikt/ds-react';
import React from 'react';

export const ErrorCopyButton = ({
    correlationId,
    errorUrl,
    errorCode,
    timestamp,
    basePath,
}: {
    correlationId?: string | undefined;
    errorUrl?: string;
    errorCode: string;
    timestamp: string;
    basePath?: string;
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
