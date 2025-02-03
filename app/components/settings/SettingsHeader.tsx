import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import React from 'react';

interface SettingsHeaderProps {
    title: string;
    text: string;
}

export const SettingsHeader = ({ title, text }: SettingsHeaderProps) => {
    return (
        <VStack gap="4">
            <Heading level="1" size="large">
                {title}
            </Heading>
            <BodyShort spacing>{text}</BodyShort>
        </VStack>
    );
};
