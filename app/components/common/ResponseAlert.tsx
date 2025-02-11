import { AlertWithCloseButton } from '~/components/assignment/AlertWithCloseButton';
import { Box } from '@navikt/ds-react';

type AlertProps = {
    variant: 'success' | 'error';
    text: string;
};

type ResponseCodeAlerts = Record<string, AlertProps>;

type ResourceAlertProps = {
    responseCode: string | undefined;
    successText?: string;
    deleteText?: string;
    conflictText?: string;
};

export const ResponseAlert = ({
    responseCode,
    successText = 'Tildelingen var vellykket!',
    deleteText = 'Tildelingen ble slettet!',
    conflictText = 'Det oppstod en konflikt under tildelingen. Denne ressursen er allerede tildelt',
}: ResourceAlertProps) => {
    if (!responseCode) return null;

    const alertMessages: ResponseCodeAlerts = {
        '201': { variant: 'success', text: successText },
        '202': { variant: 'success', text: successText },
        '410': { variant: 'success', text: deleteText },
        '204': { variant: 'success', text: deleteText },
        '409': { variant: 'error', text: conflictText },
    };

    const defaultAlertProps: AlertProps = {
        variant: 'error',
        text: `Noe gikk galt under tildelingen! Feilkode: ${responseCode}`,
    };

    const alertProps = alertMessages[responseCode] || defaultAlertProps;

    return (
        <Box id="alert-box">
            <AlertWithCloseButton variant={alertProps.variant}>
                {alertProps.text}
            </AlertWithCloseButton>
        </Box>
    );
};
