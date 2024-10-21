import {Button, Table} from "@navikt/ds-react";
import React from "react";
import {IKodeverkUserType} from "~/data/types";
import {Outlet, useNavigate} from "@remix-run/react";
import {PencilIcon} from "@navikt/aksel-icons";
import {getEditUserTypeUrl} from "~/data/constants";

type UserTypeTableProps = {
    userTypes: IKodeverkUserType[]
    basePath?: string
}


export const UserTypeTable = ({userTypes}: UserTypeTableProps) => {
    const navigate = useNavigate()
    return (
        <>
            <Outlet/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader scope="col">Brukertype</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">Egendefinert navn</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" align="right">Endre</Table.ColumnHeader>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {userTypes
                        .sort((a, b) => a.id - b.id)
                        .map(({id, fkLabel, label}) => (
                            <Table.Row key={id}>
                                <Table.DataCell className="nowrap">{label}</Table.DataCell>
                                <Table.DataCell className="nowrap">
                                    {fkLabel}
                                </Table.DataCell>
                                <Table.DataCell align="right">
                                    <Button
                                        icon={<PencilIcon title="Meny"/>}
                                        size="small"
                                        variant="tertiary"
                                        onClick={() => navigate(getEditUserTypeUrl(id))}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    )
}