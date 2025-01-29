import {Table} from "@navikt/ds-react";
import React from "react";
import {
    IResourceModuleAccessRole,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/types/resourceTypes";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {TertiaryArrowButton} from "~/components/common/Buttons/TertiaryArrowButton";
import {IUnitItem} from "~/data/types/orgUnitTypes";

interface ResourceModuleAdminUsersTableI {
    usersPage: IResourceModuleUsersPage
    orgUnitList: IUnitItem[]
    roles: IResourceModuleAccessRole[]
    size: number
}

const ResourceModuleAdminUsersTable = ({usersPage, size}: ResourceModuleAdminUsersTableI) => {
    const {fetching} = useLoadingState()

    return (
        <div className={"table-toolbar-pagination-container"}>
            <Table className={"users-table"} id="users-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fullt navn</Table.HeaderCell>
                        <Table.HeaderCell>Epost</Table.HeaderCell>
                        <Table.HeaderCell align={"center"}>Administrer tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ?
                        <TableSkeleton columns={3}/> : usersPage.users.map((user: IResourceModuleUser, index) => {
                            return (
                                <Table.Row key={index + user.userName}>
                                    <Table.DataCell>{user.firstName + " " + user.lastName}</Table.DataCell>
                                    <Table.DataCell>{user.userName}</Table.DataCell>
                                    <Table.DataCell align={"center"}>
                                        <TertiaryArrowButton
                                            id={`userInfoButton-${index + user.userName}`}
                                            url={`administrer/${user.resourceId}`}
                                            title={"Administrer"}
                                        />
                                    </Table.DataCell>
                                </Table.Row>)
                        })}
                </Table.Body>
            </Table>
            {usersPage.users.length > 0 &&
                <TablePagination
                    currentPage={usersPage.currentPage}
                    totalPages={usersPage.totalPages}
                    size={size}
                />
            }
        </div>
    )
}

export default ResourceModuleAdminUsersTable