import React, { Fragment, ReactElement } from 'react';
import { HStack, Spacer, VStack } from '@navikt/ds-react';
import OrgUnitFilterModal from '~/components/org-unit-filter/OrgUnitFilterModal';
import ChipsFilters from '~/components/common/ChipsFilters';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface TableToolbarProps {
    SearchComponent?: ReactElement;
    FilterComponents?: ReactElement | ReactElement[];
    showChipFilters?: boolean;
    orgUnitsForFilter?: IUnitItem[];
    CreateNewButton?: ReactElement;
    LeftAlignedFilters?: ReactElement; // TODO: remove this when tabs are implemented
}

export const TableToolbar = ({
    SearchComponent,
    FilterComponents,
    showChipFilters = true,
    orgUnitsForFilter,
    CreateNewButton,
    LeftAlignedFilters,
}: TableToolbarProps) => {
    return (
        <VStack>
            <HStack justify={'space-between'} paddingBlock={'4'} gap={'4'} align="end">
                {CreateNewButton || LeftAlignedFilters ? (
                    <>
                        {CreateNewButton && (
                            <HStack justify={'end'} align={'end'}>
                                {CreateNewButton}
                            </HStack>
                        )}
                        {LeftAlignedFilters && (
                            <HStack justify={'end'} align={'end'}>
                                {LeftAlignedFilters}
                            </HStack>
                        )}
                    </>
                ) : (
                    <Spacer />
                )}
                <HStack className={'filters'} gap={'4'} justify="end" align="end">
                    {orgUnitsForFilter && <OrgUnitFilterModal orgUnitList={orgUnitsForFilter} />}
                    {Array.isArray(FilterComponents)
                        ? FilterComponents.map((FilterComponent: ReactElement, index: number) => (
                              <Fragment key={index}>{FilterComponent}</Fragment>
                          ))
                        : FilterComponents}
                    {SearchComponent}
                </HStack>
            </HStack>

            {showChipFilters && <ChipsFilters />}
        </VStack>
    );
};
