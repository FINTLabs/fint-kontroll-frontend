import { Button } from '@navikt/ds-react';
import { PlusIcon } from '@navikt/aksel-icons';
import React from 'react';

export const SecondaryAddNewLinkButton = ({
    id,
    label,
    handleOnClick,
}: {
    id?: string;
    label: string;
    handleOnClick: () => void;
}) => {
    return (
        <Button
            id={id}
            role="link"
            className={'no-underline-button'}
            variant={'secondary'}
            iconPosition="right"
            icon={<PlusIcon aria-hidden />}
            onClick={handleOnClick}>
            {label}
        </Button>
    );
};
