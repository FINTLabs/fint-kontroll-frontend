import { Heading, VStack } from '@navikt/ds-react';
import React from 'react';

interface TableHeaderProps {
    title: string;
    titleAlignment?: 'center' | 'end' | 'start' | undefined;
    subTitle?: string;
    isSubHeader?: boolean;
}

export const TableHeader = ({
    title,
    titleAlignment = 'start',
    subTitle,
    isSubHeader,
}: TableHeaderProps) => {
    return (
        <VStack>
            <Heading
                level={isSubHeader ? '2' : '1'}
                size="xlarge"
                align={titleAlignment}
                spacing={!subTitle}>
                {title}
            </Heading>
            {subTitle && (
                <Heading level={isSubHeader ? '3' : '2'} size="small">
                    {subTitle}
                </Heading>
            )}
        </VStack>
    );
};
