import { Alert, Box, Heading, InfoCard, LocalAlert, VStack } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { TableToolbar } from '~/components/common/Table/Header/TableToolbar';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { InformationSquareIcon } from '@navikt/aksel-icons';

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
    alertMessage?: { heading?: string; text: string; status: 'announcement' | 'warning' | 'error' };
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
                <Box asChild marginBlock={'space-8'}>
                    <InfoCard data-color="info">
                        <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                            <InfoCard.Title>
                                {alertMessage.heading ? alertMessage.heading : 'Informasjon'}
                            </InfoCard.Title>
                        </InfoCard.Header>
                        <InfoCard.Content>{alertMessage.text}</InfoCard.Content>
                    </InfoCard>
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
