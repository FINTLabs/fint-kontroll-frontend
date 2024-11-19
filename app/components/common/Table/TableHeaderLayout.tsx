import {Box, Heading, HStack, Spacer, VStack} from "@navikt/ds-react";
import React, {Fragment, ReactElement} from "react";
import {IUnitItem} from "~/data/types";
import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";

interface TableHeaderLayoutProps {
    title: string
    titleAlignment?: "center" | "end" | "start" | undefined
    subTitle?: string
    SearchComponent?: ReactElement
    FilterComponents?: ReactElement | ReactElement[]
    ChipsFilters?: ReactElement
    orgUnitsForFilter?: IUnitItem[]
    CreateNewButton?: ReactElement
    LeftAlignedFilters?: ReactElement // TODO: remove this when tabs are implemented
}

export const TableHeaderLayout = (
    {
        title,
        titleAlignment = "start",
        subTitle,
        SearchComponent,
        FilterComponents,
        ChipsFilters,
        orgUnitsForFilter,
        CreateNewButton,
        LeftAlignedFilters
    }: TableHeaderLayoutProps) => {
    return (
        <VStack>
            <Heading level="1" size="xlarge" align={titleAlignment} spacing={!subTitle}>{title}</Heading>
            {subTitle && <Heading level="2" size="small">{subTitle}</Heading>}
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

            <Box className={"filters"} paddingBlock={"1 8"}>
                {ChipsFilters}
            </Box>
        </VStack>
    )
}