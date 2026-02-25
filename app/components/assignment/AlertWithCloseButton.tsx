import React from 'react';
import { LocalAlert, LocalAlertProps } from '@navikt/ds-react';

export const AlertWithCloseButton = ({
    children,
    variant,
}: {
    children?: React.ReactNode;
    variant: LocalAlertProps['status'];
}) => {
    const [show, setShow] = React.useState(true);

    setTimeout(() => {
        setShow(false);
    }, 5000);

    return show ? (
        <LocalAlert status={variant}>
            <LocalAlert.Header>
                <LocalAlert.Title>{children || 'Content'}</LocalAlert.Title>
                <LocalAlert.CloseButton onClick={() => setShow(false)} />
            </LocalAlert.Header>
        </LocalAlert>
    ) : null;
};
