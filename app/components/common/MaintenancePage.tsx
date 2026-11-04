import { BodyShort, Heading, HStack, VStack } from '@navikt/ds-react';
import React from 'react';
import { RobotSmileIcon } from '@navikt/aksel-icons';

export function MaintenancePage() {
    return (
        <div className="maintenance-page">
            <VStack gap="space-4" align="start">
                <Heading level="1" size="large" spacing>
                    Vi utfører nødvendig vedlikehold.
                </Heading>
                <BodyShort>
                    FINT Kontroll er midlertidig utilgjengelig, grunnet planlagt vedlikehold.
                </BodyShort>
                <BodyShort>Vi slipper deg inn så snart vi er ferdige!</BodyShort>
            </VStack>
            <HStack align={'center'} marginBlock={'space-24'}>
                <RobotSmileIcon title="a11y-title" fontSize="3rem" />
            </HStack>
        </div>
    );
}
