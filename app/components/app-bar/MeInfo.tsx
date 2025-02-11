import { Buildings3Icon, PersonCircleIcon } from '@navikt/aksel-icons';
import React from 'react';
import { BodyShort, HStack } from '@navikt/ds-react';
import appStyles from './appBar.css?url';
import { IMeInfo } from '~/data/types/userTypes';

export function links() {
    return [{ rel: 'stylesheet', href: appStyles }];
}

function MeInfo({ me }: { me?: IMeInfo }) {
    return (
        <>
            {me && (
                <HStack gap={'8'} justify={'center'}>
                    <HStack gap={'1'} align={'center'}>
                        <Buildings3Icon fontSize="1.5rem" />
                        <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                            {me?.organisationId}
                        </BodyShort>
                    </HStack>
                    <HStack gap={'1'} align={'center'}>
                        <PersonCircleIcon fontSize="1.5rem" />
                        <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                            {me?.firstName} {me?.lastName}
                        </BodyShort>
                    </HStack>
                </HStack>
            )}
        </>
    );
}

export default MeInfo;
