import { Button, HelpText, HStack, Link, Tag } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import React from 'react';

export function DeleteButtonOrTagComponent(
    directAssignment: boolean,
    deletableAssignment: boolean,
    href: string
) {
    if (!directAssignment) {
        return (
            <Tag variant="neutral" size="small" className="navds-tag-in-table">
                <HStack gap={'1'} align={'center'} wrap={false}>
                    Begrenset
                    <HelpText title="Hvorfor kan ikke tildelingen slettes?">
                        Denne tildelingen er gjort til en gruppe.
                        <br />
                        Tildelingen kan derfor ikke slettes for en enkelt bruker.
                    </HelpText>
                </HStack>
            </Tag>
        );
    } else if (!deletableAssignment) {
        return (
            <Tag variant="neutral" size="small" className="navds-tag-in-table">
                <HStack gap={'1'} align={'center'} wrap={false}>
                    Begrenset
                    <HelpText title="Hvorfor kan ikke tildelingen slettes?">
                        Du mangler rettigheter til å slette tildelinger for denne ressursen
                    </HelpText>
                </HStack>
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
