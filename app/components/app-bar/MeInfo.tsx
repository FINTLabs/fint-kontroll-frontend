import { Buildings3Icon, PersonCircleIcon } from '@navikt/aksel-icons';
import React from 'react';
import { BodyShort, HStack } from '@navikt/ds-react';
import appStyles from './appBar.css?url';
import { IMeInfo } from '~/data/types/userTypes';

export function links() {
    return [{ rel: 'stylesheet', href: appStyles }];
}

function MeInfo(props: { me: IMeInfo }) {
    return (
        <>
            {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*    <ExclamationmarkTriangleIcon title="a11y-title" fontSize="1rem"/>*/}
            {/*    <p style={{margin: "1em"}}>*/}
            {/*        Det ser ut som du mangler rettigheter i løsningen*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*:*/}

            <HStack gap={'8'} justify={'center'}>
                <HStack gap={'1'} align={'center'}>
                    <Buildings3Icon fontSize="1.5rem" />
                    <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                        {props.me?.organisationId}
                    </BodyShort>
                </HStack>
                <HStack gap={'1'} align={'center'}>
                    <PersonCircleIcon fontSize="1.5rem" />
                    <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                        {props.me?.firstName} {props.me?.lastName}
                    </BodyShort>
                </HStack>
            </HStack>
        </>
    );
}

export default MeInfo;
