import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { TableToolbar } from '~/components/common/Table/Header/TableToolbar';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface TableHeaderLayoutProps {
    title: string;
    titleAlignment?: 'center' | 'end' | 'start' | undefined;
    subTitle?: string;
    isSubHeader?: boolean;
    SearchComponent?: ReactElement;
    FilterComponents?: ReactElement | ReactElement[];
    showChipFilters?: boolean;
    orgUnitsForFilter?: IUnitItem[];
    CreateNewButton?: ReactElement;
    LeftAlignedFilters?: ReactElement;
    alertMessage?: { heading?: string; text: string; variant: 'info' | 'warning' | 'error' };
}

export const TableHeaderLayout = ({
    title,
    titleAlignment = 'start',
    subTitle,
    isSubHeader,
    SearchComponent,
    FilterComponents,
    showChipFilters,
    orgUnitsForFilter,
    CreateNewButton,
    LeftAlignedFilters,
    alertMessage,
}: TableHeaderLayoutProps) => {
    return (
        <VStack>
            <TableHeader
                title={title}
                titleAlignment={titleAlignment}
                subTitle={subTitle}
                isSubHeader={isSubHeader}
            />
            {alertMessage && (
                <Box asChild marginBlock={'4'}>
                    <Alert variant={alertMessage.variant} size={'small'} contentMaxWidth={false}>
                        {alertMessage.heading && (
                            <Heading size={'xsmall'}>{alertMessage.heading}</Heading>
                        )}
                        {alertMessage.text}
                    </Alert>
                </Box>
            )}
            <TableToolbar
                SearchComponent={SearchComponent}
                FilterComponents={FilterComponents}
                showChipFilters={showChipFilters}
                orgUnitsForFilter={orgUnitsForFilter}
                CreateNewButton={CreateNewButton}
                LeftAlignedFilters={LeftAlignedFilters}
            />
        </VStack>
    );
};
