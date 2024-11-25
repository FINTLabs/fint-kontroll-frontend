import {VStack} from "@navikt/ds-react";
import React, { ReactElement} from "react";
import {IUnitItem} from "~/data/types";
import {TableHeader} from "~/components/common/Table/Header/TableHeader";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";

interface TableHeaderLayoutProps {
    title: string
    titleAlignment?: "center" | "end" | "start" | undefined
    subTitle?: string
    tableType?: "mainMain" | "subPage"
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
        tableType = "mainMain",
        SearchComponent,
        FilterComponents,
        ChipsFilters,
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
                isSubHeader={tableType === "subPage"}
            />
            <TableToolbar
                SearchComponent={SearchComponent}
                FilterComponents={FilterComponents}
                ChipsFilters={ChipsFilters}
                orgUnitsForFilter={orgUnitsForFilter}
                CreateNewButton={CreateNewButton}
                LeftAlignedFilters={LeftAlignedFilters}
            />
        </VStack>
    )
}