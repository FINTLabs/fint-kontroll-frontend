import {Table} from "@navikt/ds-react";
import type {IRoleList} from "~/data/types";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {SeeInfoButton} from "~/components/common/Buttons/SeeInfoButton";

interface RoleTableProps {
    rolePage: IRoleList
    size: string
}

export const RoleTable = ({rolePage, size}: RoleTableProps) => {
    const {fetching} = useLoadingState()

    return (
        <>
            <Table id={"role-table"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton/> :
                        rolePage.roles.map((role) => (
                            <Table.Row key={role.id}>
                                <Table.DataCell>{role.roleName}</Table.DataCell>
                                <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                                <Table.DataCell>{role.roleType}</Table.DataCell>
                                <Table.DataCell align="right">
                                    <SeeInfoButton id={`roleInfoButton-${role.id}`} url={`/roles/${role.id}/members`}/>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={rolePage.currentPage} totalPages={rolePage.totalPages} size={size}/>
        </>
    );
};