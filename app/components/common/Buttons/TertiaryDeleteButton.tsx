import React, { useMemo } from 'react';
import { useNavigate, useNavigation } from '@remix-run/react';
import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';

type TertiaryDeleteButtonProps = {
    id?: string;
    url: string;
    title?: string;
    size?: 'small' | 'medium' | 'xsmall';
};

export const TertiaryDeleteButton = ({
    id,
    url,
    title = 'Slett',
    size = 'small',
}: TertiaryDeleteButtonProps) => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isLoading = useMemo(
        () => navigation.state === 'loading' && navigation.location.pathname.endsWith(url),
        [navigation, url]
    );

    return (
        <Button
            className={'nowrap delete-icon-button'}
            id={id}
            icon={<TrashIcon title="søppelbøtte" />}
            iconPosition={'left'}
            onClick={() => navigate(url)}
            variant={'tertiary'}
            role="link"
            loading={isLoading}
            size={size}>
            {title}
        </Button>
    );
};
