import React, { useMemo } from 'react';
import { useNavigate, useNavigation } from 'react-router';
import { Button } from '@navikt/ds-react';
import { PlusIcon } from '@navikt/aksel-icons';

type SeeInfoButtonProps = {
    id: string;
    url: string;
    title?: string;
    size?: 'small' | 'medium' | 'xsmall';
};

export const AssignButton = ({ id, url, title = 'Tildel', size = 'small' }: SeeInfoButtonProps) => {
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
            icon={<PlusIcon aria-hidden />}
            iconPosition={'right'}
            onClick={() => navigate(url)}
            variant={'secondary'}
            role="link"
            loading={isLoading}
            size={size}>
            {title}
        </Button>
    );
};
