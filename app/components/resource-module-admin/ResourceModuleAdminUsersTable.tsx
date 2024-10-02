import {Button, Table} from "@navikt/ds-react";
import {useNavigate, useSearchParams} from "@remix-run/react";
import React from "react";
import {
    IResourceModuleAccessRole,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import {IUnitItem} from "~/data/types";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";

interface ResourceModuleAdminUsersTableI {
    usersPage: IResourceModuleUsersPage
    orgUnitList: IUnitItem[]
    roles: IResourceModuleAccessRole[]
}

const ResourceModuleAdminUsersTable = ({usersPage}: ResourceModuleAdminUsersTableI) => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
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
                                        <Button variant={"secondary"}
                                                onClick={() => navigate(`administer/${user.resourceId}`)}>
                                            Administrer
                                        </Button>
                                    </Table.DataCell>
                                </Table.Row>)
                        })}
                </Table.Body>
            </Table>
            {usersPage.users.length > 0 &&
                <TablePagination
                    currentPage={usersPage.currentPage}
                    totalPages={usersPage.totalPages}
                    size={params.get("size") ?? 25}
                />
            }
        </div>
    )
}

export default ResourceModuleAdminUsersTable