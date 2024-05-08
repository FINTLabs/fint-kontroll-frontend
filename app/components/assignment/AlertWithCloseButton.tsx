import React from "react";
import {Alert, AlertProps} from "@navikt/ds-react";

export const AlertWithCloseButton = ({children, variant,}: {
    children?: React.ReactNode;
    variant: AlertProps["variant"];
}) => {
    const [show, setShow] = React.useState(true);

    setTimeout(() => {
        setShow(false)
    }, 5000)

    return show ? (
        <Alert variant={variant} closeButton onClose={() => setShow(false)}>
            {children || "Content"}
        </Alert>
    ) : null;

};