import { Button, Link, Tag } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import React from 'react';

export function DeleteButtonOrTagComponent(
    directAssignment: boolean,
    deletableAssignment: boolean,
    href: string
) {
    if (!directAssignment) {
        return (
            <Tag variant="info" size="small" className="navds-tag-in-table">
                Gruppetildeling
            </Tag>
        );
    } else if (!deletableAssignment) {
        return (
            <Tag
                id={'tag'}
                variant="neutral"
                size="small"
                className="navds-tag-in-table"
                style={{ whiteSpace: 'nowrap' }}>
                Kan ikke slettes
            </Tag>
        );
    } else {
        return (
            <Button
                as={Link}
                className={'button-outlined'}
                variant={'secondary'}
                icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem" />}
                iconPosition={'right'}
                href={href}>
                Slett
            </Button>
        );
    }
}
