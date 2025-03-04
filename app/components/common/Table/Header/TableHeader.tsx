import { Heading, HStack, VStack } from '@navikt/ds-react';
import React from 'react';

interface TableHeaderProps {
    title: string;
    titleAlignment?: 'center' | 'end' | 'start' | undefined;
    subTitle?: string;
    isSubHeader?: boolean;
    HeaderButton?: React.ReactElement;
    spacing?: boolean;
}

export const TableHeader = ({
    title,
    titleAlignment = 'start',
    subTitle,
    isSubHeader,
    HeaderButton,
    spacing,
}: TableHeaderProps) => {
    return (
        <VStack width={'100%'}>
            <HStack justify={'space-between'} align={'center'}>
                <Heading
                    level={isSubHeader ? '2' : '1'}
                    size={isSubHeader ? 'large' : 'xlarge'}
                    align={titleAlignment}
                    spacing={spacing}>
                    {title}
                </Heading>
                {HeaderButton && HeaderButton}
            </HStack>
            {subTitle && (
                <Heading level={isSubHeader ? '3' : '2'} size="small">
                    {subTitle}
                </Heading>
            )}
        </VStack>
    );
};
