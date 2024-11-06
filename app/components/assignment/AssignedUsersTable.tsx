import {Button, Heading, Link, Table, Tag, VStack} from "@navikt/ds-react";
import type {IAssignedUsers} from "~/data/types";
import React from "react";
import {Outlet, useLoaderData, useParams, useSearchParams} from "@remix-run/react";
import {TrashIcon} from "@navikt/aksel-icons";
import {prepareQueryParams, translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {loader} from "~/routes/resources.$id.user-assignments";

interface AssignedUsersTableProps {
    assignedUsers: IAssignedUsers,
    size: string
    basePath?: string
}

export const AssignedUsersTable = ({assignedUsers, size, basePath}: AssignedUsersTableProps) => {
    const {userTypes} = useLoaderData<typeof loader>()

    const [searchParams] = useSearchParams()
    const params = useParams()
    const {fetching} = useLoadingState()

    return (
        <div>
            <VStack gap="8">
                <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>

                <Outlet/>

                <Table id="assigned-users-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Tildelingskobling</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align={"center"}>Fjern tildeling</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fetching ? <TableSkeleton columns={5}/> : assignedUsers.users.map((user) => (
                            <Table.Row key={user.assigneeRef}>
                                <Table.HeaderCell
                                    scope="row">{user.assigneeFirstName} {user.assigneeLastName}</Table.HeaderCell>
                                <Table.DataCell>{translateUserTypeToLabel(user.assigneeUserType, userTypes)}</Table.DataCell>
                                <Table.DataCell>{user.assignerDisplayname ? user.assignerDisplayname : user.assignerUsername}</Table.DataCell>
                                <Table.DataCell>{user.directAssignment ? "Direkte" : user.assignmentViaRoleName}</Table.DataCell>
                                <Table.DataCell align={"center"}>
                                    {user.directAssignment
                                        ?
                                        <Button
                                            as={Link}
                                            className={"button-outlined"}
                                            variant={"secondary"}
                                            icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                            iconPosition={"right"}
                                            href={`${basePath}/resources/${params.id}/user-assignments/${user.assignmentRef}/delete${prepareQueryParams(searchParams)}`}
                                        >
                                            Slett
                                        </Button>
                                        :
                                        <Tag variant="info" size="small" className="navds-tag-in-table">
                                            Gruppetildeling
                                        </Tag>
                                    }
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </VStack>

            <TablePagination currentPage={assignedUsers.currentPage} totalPages={assignedUsers.totalPages} size={size}/>
        </div>
    );
};