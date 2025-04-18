import React, { useMemo } from 'react';
import { useNavigate, useNavigation } from '@remix-run/react';
import { Button } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';

type SeeInfoButtonProps = {
    id: string;
    url: string;
    title?: string;
    size?: 'small' | 'medium' | 'xsmall';
};

export const GoToButton = ({ id, url, title = 'Se info', size = 'small' }: SeeInfoButtonProps) => {
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
            icon={<ArrowRightIcon fontSize="1.5rem" />}
            iconPosition={'right'}
            onClick={() => navigate(url)}
            variant={'tertiary'}
            role="link"
            loading={isLoading}
            size={size}>
            {title}
        </Button>
    );
};
