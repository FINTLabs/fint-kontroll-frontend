import {Button, Table} from "@navikt/ds-react";
import React from "react";
import {IKodeverkMappingList} from "~/data/types";
import {Outlet, useNavigate} from "@remix-run/react";
import {PencilIcon} from "@navikt/aksel-icons";

type MappingListProps = {
    listItems: IKodeverkMappingList[]
    name: string
    getEditItemUrl: (id: number) => string
}


export const MappingList = (
    {
        listItems,
        name,
        getEditItemUrl,
    }: MappingListProps
) => {
    const navigate = useNavigate()
    return (
        <>
            <Outlet/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader scope="col">{name}</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">Egendefinert navn</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" align="right">Rediger</Table.ColumnHeader>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listItems
                        .sort((a, b) => a.id - b.id)
                        .map(({id, fkLabel, label}) => (
                            <Table.Row key={id}>
                                <Table.DataCell className="nowrap">{label}</Table.DataCell>
                                <Table.DataCell className="nowrap">
                                    {fkLabel}
                                </Table.DataCell>
                                <Table.DataCell align="right">
                                    <Button
                                        icon={<PencilIcon title="Rediger"/>}
                                        size="small"
                                        variant="tertiary"
                                        onClick={() => navigate(getEditItemUrl(id))}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    )
}