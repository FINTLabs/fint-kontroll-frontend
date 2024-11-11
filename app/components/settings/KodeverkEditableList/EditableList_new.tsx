import {Box, Button, Dropdown, HStack, SortState, Table, VStack} from "@navikt/ds-react";
import {MenuElipsisHorizontalCircleIcon, PlusCircleIcon} from "@navikt/aksel-icons";
import React, {useMemo, useState} from "react";
import {Outlet} from "@remix-run/react";
import {IKodeverkCustomListItem} from "~/data/types";

type EditableListProps = {
    list: IKodeverkCustomListItem[]
    createNewText?: string
    onCreateNew?: () => void
    onDelete: (item: IKodeverkCustomListItem) => void
    onEdit: (item: IKodeverkCustomListItem) => void
}

export const EditableList = (
    {
        list,
        createNewText,
        onCreateNew,
        onDelete,
        onEdit
    }: EditableListProps
) => {
    const [sort, setSort] = useState<SortState | undefined>();

    const handleSortByName = () => {
        setSort(
            sort?.direction === "descending" ? undefined : {
                orderBy: "name",
                direction: sort?.direction === "ascending" ? "descending" : "ascending"
            }
        );
    };

    const sortedList = useMemo(() => {
        return list.sort((a, b) => {
            if (sort?.direction === "ascending") {
                return a.name.localeCompare(b.name);
            }
            if (sort?.direction === "descending") {
                return b.name.localeCompare(a.name);
            }
            return 0;
        })
    }, [list, sort]);

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
                    {sortedList.map((item) => (
                        <Table.Row key={item.id} id={item.id.toString()}>
                            <Table.HeaderCell scope="row" className="nowrap">{item.name}</Table.HeaderCell>
                            <Table.DataCell textSize={"small"}>{item.description}</Table.DataCell>
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
                                                onClick={() => onEdit(item)}
                                            >
                                                Rediger
                                            </Dropdown.Menu.GroupedList.Item>
                                            <Dropdown.Menu.GroupedList.Item
                                                onClick={() => onDelete(item)}

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
                {/*                <Button
                    as={Link}
                    underline={false}
                    variant={"tertiary"}
                    icon={<PlusCircleIcon aria-hidden/>}
                    href={createNewUrl}
                >
                    {createNewText ?? "Legg til ny"}
                </Button>*/}
                <Button
                    variant={"tertiary"}
                    icon={<PlusCircleIcon aria-hidden/>}
                    onClick={onCreateNew}
                >
                    {createNewText ?? "Legg til ny"}
                </Button>
            </Box>
        </VStack>
    )
}