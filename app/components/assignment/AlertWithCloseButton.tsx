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

    const handleClose = () => {
        setShow(false);

        searchParams.delete('responseCode');
        searchParams.delete('correlationId');
        setSearchParams(searchParams);
    };

    React.useEffect(() => {
        if (errorMessage) return;
        const timer = setTimeout(() => {
            setShow(false);
            searchParams.delete('responseCode');
            searchParams.delete('correlationId');
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorMessage]);

    if (!show) return null;

    return (
        <>
            <LocalAlert status={variant}>
                <LocalAlert.Header>
                    <LocalAlert.Title>{title}</LocalAlert.Title>
                    <LocalAlert.CloseButton onClick={() => handleClose()} />
                </LocalAlert.Header>
                {errorMessage && <LocalAlert.Content>{errorMessage}</LocalAlert.Content>}
            </LocalAlert>
        </>
    );
};
