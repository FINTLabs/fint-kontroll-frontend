import {Box, Button, Heading, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IAssignedUsers} from "~/data/types";
import React from "react";
import {Outlet, useParams, useSearchParams} from "@remix-run/react";
import {TrashIcon} from "@navikt/aksel-icons";
import {prepareQueryParams, setSizeCookieClientSide} from "~/components/common/CommonFunctions";

interface AssignedUsersTableProps {
    assignedUsers: IAssignedUsers, size: string
    basePath?: string
}

export const AssignedUsersTable = ({ assignedUsers, size, basePath }: AssignedUsersTableProps) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }
console.log("SIZEEE", size)
    return (
        <div style={{marginTop: '3rem'}}>
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
                    {assignedUsers.users.map((user) => (
                        <Table.Row key={user.assigneeRef}>
                            <Table.HeaderCell scope="row">{user.assigneeFirstName} {user.assigneeLastName}</Table.HeaderCell>
                            <Table.DataCell>{user.assigneeUserType}</Table.DataCell>
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
                                        <Tag variant="info" className="navds-tag-in-table">
                                            Gruppetildeling
                                        </Tag>
                                }
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Box className={"paginationWrapper"}>
                <Select
                    id="pagination-select"
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={size ? Number(size) : 25}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={assignedUsers.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={assignedUsers.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </div>
    );
};