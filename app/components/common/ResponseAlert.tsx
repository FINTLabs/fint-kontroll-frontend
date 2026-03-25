import { AlertWithCloseButton } from '~/components/assignment/AlertWithCloseButton';
import { BodyShort, Box } from '@navikt/ds-react';
import { useLocation } from 'react-router';
import { ErrorCopyButton } from '~/components/common/ErrorCopyButton';

type AlertProps = {
    variant: 'success' | 'error';
    title: string;
    errorMessage?: React.ReactNode;
};

type ResponseCodeAlerts = Record<string, AlertProps>;

type ResourceAlertProps = {
    responseCode: string | undefined;
    correlationId: string | undefined;
    basepath: string;
    successText?: string;
    deleteText?: string;
    conflictText?: string;
};

export const ResponseAlert = ({
    responseCode,
    correlationId,
    basepath,
    successText = 'Tildelingen var vellykket!',
    deleteText = 'Tildelingen ble slettet!',
    conflictText = 'Det oppstod en konflikt under tildelingen. Denne ressursen er allerede tildelt.',
}: ResourceAlertProps) => {
    if (!responseCode) return null;

    const timestamp = new Date().toLocaleString('nb-NO');
    const location = useLocation();
    const errorUrl = location.pathname;

    const alertMessages: ResponseCodeAlerts = {
        '201': { variant: 'success', title: successText },
        '202': { variant: 'success', title: successText },
        '410': { variant: 'success', title: deleteText },
        '204': { variant: 'success', title: deleteText },
        '409': {
            variant: 'error',
            title: conflictText,
            errorMessage: (
                <Box>
                    <BodyShort>Feilkode: {responseCode}</BodyShort>
                    <BodyShort>URL: {errorUrl}</BodyShort>
                    <BodyShort>Tidspunkt: {timestamp}</BodyShort>
                    <BodyShort>Organisasjon: {basepath}</BodyShort>
                    <BodyShort spacing>Korrelasjon-ID: {correlationId}</BodyShort>
                    <BodyShort weight={'semibold'}>
                        Klikk på knappen for å kopiere informasjon som du sender med i
                        feilrapporteringen. Dette vil hjelpe til med å effektivisere feilsøkingen.
                    </BodyShort>
                    <ErrorCopyButton
                        correlationId={correlationId}
                        errorUrl={errorUrl}
                        errorCode={responseCode}
                        timestamp={timestamp}
                        basePath={basepath}
                    />
                </Box>
            ),
        },
    };

    const defaultAlertProps = {
        variant: 'error',
        title: 'Noe gikk galt!',
        errorMessage: (
            <Box>
                <BodyShort>Feilkode: {responseCode}</BodyShort>
                <BodyShort>URL: {errorUrl}</BodyShort>
                <BodyShort>Tidspunkt: {timestamp}</BodyShort>
                <BodyShort>Organisasjon: {basepath}</BodyShort>
                <BodyShort spacing>Korrelasjon-ID: {correlationId}</BodyShort>
                <BodyShort weight={'semibold'}>
                    Klikk på knappen for å kopiere informasjon som du sender med i
                    feilrapporteringen. Dette vil hjelpe til med å effektivisere feilsøkingen.
                </BodyShort>
                <ErrorCopyButton
                    correlationId={correlationId}
                    errorUrl={errorUrl}
                    errorCode={responseCode}
                    timestamp={timestamp}
                    basePath={basepath}
                />
            </Box>
        ),
    };

    const alertProps = alertMessages[responseCode] || defaultAlertProps;

    return (
        <Box id="alert-box">
            <AlertWithCloseButton
                variant={alertProps.variant}
                title={alertProps.title}
                errorMessage={alertProps.errorMessage}
            />
        </Box>
    );
};
