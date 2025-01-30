import {Table} from "@navikt/ds-react";
import type {IRoleList} from "~/data/types/userTypes";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {TertiaryArrowButton} from "~/components/common/Buttons/TertiaryArrowButton";
import {getRoleMembersUrl} from "~/data/paths";
import {useLoaderData} from "@remix-run/react";
import {loader} from "~/routes/grupper._index";
import {translateUserTypeToLabel} from "~/components/common/CommonFunctions";

interface RoleTableProps {
    rolePage: IRoleList
    size: string
}

export const RoleTable = ({rolePage, size}: RoleTableProps) => {
    const {userTypesKodeverk} = useLoaderData<typeof loader>()
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
                                <Table.DataCell>{translateUserTypeToLabel(role.roleType, userTypesKodeverk)}</Table.DataCell>
                                <Table.DataCell align="right">
                                    <TertiaryArrowButton id={`roleInfoButton-${role.id}`} url={getRoleMembersUrl(role.id)}/>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={rolePage.currentPage} totalPages={rolePage.totalPages} size={size}/>
        </>
    );
};