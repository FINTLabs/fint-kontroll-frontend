import React, { useMemo } from 'react';
import { useNavigate, useNavigation } from 'react-router';
import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';

type TertiaryDeleteButtonProps = {
    id?: string;
    url: string;
    title?: string;
    size?: 'small' | 'medium' | 'xsmall';
};

export const DeleteButton = ({
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
            className={'nowrap'}
            id={id}
            icon={<TrashIcon title="søppelbøtte" />}
            iconPosition={'right'}
            onClick={() => navigate(url)}
            variant={'secondary-neutral'}
            role="link"
            loading={isLoading}
            size={size}>
            {title}
        </Button>
    );
};
