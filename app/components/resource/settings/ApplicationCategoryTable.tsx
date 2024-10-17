import {Box, Button, Dropdown, HStack, Link, SortState, Table, VStack} from "@navikt/ds-react";
import {MenuElipsisHorizontalCircleIcon, PlusCircleIcon} from "@navikt/aksel-icons";
import React, {useMemo, useState} from "react";
import {IKodeverkApplicationCategory} from "~/data/types";
import {Outlet, useNavigate} from "@remix-run/react";
import {
    getApplicationCategoryDeleteUrl,
    getApplicationCategoryEditUrl,
    SETTINGS_APPLICATION_CATEGORY_CREATE
} from "~/data/constants";

type ApplicationCategoryTableProps = {
    applicationCategories: IKodeverkApplicationCategory[]
    basePath?: string
}

export const ApplicationCategoryTable = ({applicationCategories, basePath}: ApplicationCategoryTableProps) => {
    const navigate = useNavigate()
    const [sort, setSort] = useState<SortState | undefined>();

    const handleSortByName = () => {
        setSort(
            sort?.direction === "descending" ? undefined : {
                orderBy: "name",
                direction: sort?.direction === "ascending" ? "descending" : "ascending"
            }
        );
    };

    const sortedApplicationCategories = useMemo(() => {
        return applicationCategories.sort((a, b) => {
            if (sort?.direction === "ascending") {
                return a.name.localeCompare(b.name);
            }
            if (sort?.direction === "descending") {
                return b.name.localeCompare(a.name);
            }
            return 0;
        })
    }, [applicationCategories, sort]);

    return (
        <VStack>
            <Outlet/>
            <Table
                sort={sort}
                onSortChange={handleSortByName}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader scope="col" sortable sortKey="name">Navn</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">Beskrivelse</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" align="right">
                            Handlinger
                        </Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {sortedApplicationCategories.map(({id, name, description}) => (
                        <Table.Row key={id}>
                            <Table.HeaderCell scope="row" className="nowrap">{name}</Table.HeaderCell>
                            <Table.DataCell textSize={"small"}>{description}</Table.DataCell>
                            <Table.DataCell align="right">
                                <Dropdown>
                                    <HStack justify="end">
                                        <Button
                                            as={Dropdown.Toggle}
                                            icon={<MenuElipsisHorizontalCircleIcon title="Meny"/>}
                                            size="small"
                                            variant="tertiary"
                                        />
                                    </HStack>
                                    <Dropdown.Menu>
                                        <Dropdown.Menu.GroupedList>
                                            <Dropdown.Menu.GroupedList.Item
                                                onClick={() => navigate(getApplicationCategoryEditUrl(id))}
                                            >
                                                Rediger
                                            </Dropdown.Menu.GroupedList.Item>
                                            <Dropdown.Menu.GroupedList.Item
                                                onClick={() => navigate(getApplicationCategoryDeleteUrl(id))}

                                            >
                                                Slett
                                            </Dropdown.Menu.GroupedList.Item>
                                        </Dropdown.Menu.GroupedList>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Box paddingBlock={"4"}>
                <Button
                    as={Link}
                    underline={false}
                    variant={"tertiary"}
                    icon={<PlusCircleIcon aria-hidden/>}
                    href={`${basePath}${SETTINGS_APPLICATION_CATEGORY_CREATE}`}
                >
                    Legg til ny kategori
                </Button>
            </Box>
        </VStack>
    )
}