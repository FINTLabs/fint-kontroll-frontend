import React, {Fragment, ReactElement} from "react";
import {IUnitItem} from "~/data/types";
import {Box, HStack, Spacer, VStack} from "@navikt/ds-react";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";

interface TableToolbarProps {
    SearchComponent?: ReactElement
    FilterComponents?: ReactElement | ReactElement[]
    ChipsFilters?: ReactElement
    orgUnitsForFilter?: IUnitItem[]
    CreateNewButton?: ReactElement
    LeftAlignedFilters?: ReactElement // TODO: remove this when tabs are implemented
}

export const TableToolbar = (
    {
        SearchComponent,
        FilterComponents,
        ChipsFilters,
        orgUnitsForFilter,
        CreateNewButton,
        LeftAlignedFilters
    }: TableToolbarProps) => {
    return (
        <VStack>
            <HStack justify={"space-between"} paddingBlock={"4"}>
                {(CreateNewButton || LeftAlignedFilters) ? (
                    <>
                        {CreateNewButton && (
                            <HStack justify={"end"} align={"end"}>
                                {CreateNewButton}
                            </HStack>
                        )}
                        {LeftAlignedFilters && (
                            <HStack justify={"end"} align={"end"}>
                                {LeftAlignedFilters}
                            </HStack>
                        )}
                    </>
                ) : <Spacer/>}
                <HStack className={"filters"} gap={"4"} justify="end" align="end">
                    {orgUnitsForFilter && <OrgUnitFilterModal orgUnitList={orgUnitsForFilter}/>}
                    {Array.isArray(FilterComponents) ? (
                        FilterComponents.map((FilterComponent: ReactElement, index: number) => (
                            <Fragment key={index}>
                                {FilterComponent}
                            </Fragment>
                        ))
                    ) : (
                        FilterComponents
                    )}
                    {SearchComponent}
                </HStack>
            </HStack>

            {ChipsFilters &&
                <Box className={"filters"} paddingBlock={"1 8"}>
                    {ChipsFilters}
                </Box>
            }
        </VStack>
    )

}