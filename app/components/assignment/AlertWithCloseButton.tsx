import React from 'react';
import { LocalAlert, LocalAlertProps } from '@navikt/ds-react';
import { useSearchParams } from 'react-router';

export const AlertWithCloseButton = ({
    title,
    errorMessage,
    variant,
}: {
    title: string;
    errorMessage?: React.ReactNode;
    variant: LocalAlertProps['status'];
}) => {
    const [show, setShow] = React.useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        setShow(true);
    }, [title, errorMessage]);

    const handleClose = () => {
        setShow(false);

        const params = new URLSearchParams(searchParams);
        params.delete('responseCode');
        params.delete('correlationId');
        setSearchParams(params);
    };

    React.useEffect(() => {
        if (errorMessage || !show) return;

        const timer = setTimeout(() => {
            setShow(false);

            const params = new URLSearchParams(searchParams);
            params.delete('responseCode');
            params.delete('correlationId');
            setSearchParams(params);
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorMessage, show, searchParams, setSearchParams]);

    if (!show) return null;

    return (
        <LocalAlert status={variant}>
            <LocalAlert.Header>
                <LocalAlert.Title>{title}</LocalAlert.Title>
                <LocalAlert.CloseButton onClick={handleClose} />
            </LocalAlert.Header>

            {errorMessage && <LocalAlert.Content>{errorMessage}</LocalAlert.Content>}
        </LocalAlert>
    );
};
