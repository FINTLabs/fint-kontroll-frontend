import { HelpText, HStack, Tag } from '@navikt/ds-react';
import React from 'react';
import { TertiaryDeleteButton } from '~/components/common/Buttons/TertiaryDeleteButton';

export const DeleteButtonOrTagComponent = ({
    directAssignment,
    deletableAssignment,
    href,
}: {
    directAssignment: boolean;
    deletableAssignment: boolean;
    href: string;
}) => {
    if (!directAssignment) {
        return (
            <Tag variant="neutral-moderate" size="small" className="navds-tag-in-table">
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
        return <TertiaryDeleteButton url={href} />;
    }
};
