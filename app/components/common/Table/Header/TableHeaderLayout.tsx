import {VStack} from "@navikt/ds-react";
import React, { ReactElement} from "react";
import {TableHeader} from "~/components/common/Table/Header/TableHeader";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";
import {IUnitItem} from "~/data/types/orgUnitTypes";

interface TableHeaderLayoutProps {
    title: string
    titleAlignment?: "center" | "end" | "start" | undefined
    subTitle?: string
    isSubHeader?: boolean
    SearchComponent?: ReactElement
    FilterComponents?: ReactElement | ReactElement[]
    showChipFilters?: boolean
    orgUnitsForFilter?: IUnitItem[]
    CreateNewButton?: ReactElement
    LeftAlignedFilters?: ReactElement
}

export const TableHeaderLayout = (
    {
        title,
        titleAlignment = "start",
        subTitle,
        isSubHeader,
        SearchComponent,
        FilterComponents,
        showChipFilters,
        orgUnitsForFilter,
        CreateNewButton,
        LeftAlignedFilters
    }: TableHeaderLayoutProps) => {
    return (
        <VStack>
            <TableHeader
                title={title}
                titleAlignment={titleAlignment}
                subTitle={subTitle}
                isSubHeader={isSubHeader}
            />
            <TableToolbar
                SearchComponent={SearchComponent}
                FilterComponents={FilterComponents}
                showChipFilters={showChipFilters}
                orgUnitsForFilter={orgUnitsForFilter}
                CreateNewButton={CreateNewButton}
                LeftAlignedFilters={LeftAlignedFilters}
            />
        </VStack>
    )
}