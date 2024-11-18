import {Box, Heading, HStack, Spacer, VStack} from "@navikt/ds-react";
import React, {Fragment, ReactElement} from "react";
import {IUnitItem} from "~/data/types";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";

interface TableHeaderLayoutProps {
    title: string
    SearchComponent?: ReactElement
    FilterComponents?: ReactElement | ReactElement[]
    ChipsFilters?: ReactElement
    orgUnitsForFilter?: IUnitItem[]
    CreateNewButton?: ReactElement
}

export const TableHeaderLayout = (
    {
        title,
        SearchComponent,
        FilterComponents,
        ChipsFilters,
        orgUnitsForFilter,
        CreateNewButton
    }: TableHeaderLayoutProps) => {
    return (
        <VStack>
            <Heading level="1" size="xlarge" spacing>{title}</Heading>
            <HStack justify={"space-between"} paddingBlock={"4"}>
                {CreateNewButton ? (
                    <HStack justify={"end"} align={"end"}>
                        {CreateNewButton}
                    </HStack>
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

            <Box className={"filters"} paddingBlock={"1 8"}>
                {ChipsFilters}
            </Box>
        </VStack>
    )
}