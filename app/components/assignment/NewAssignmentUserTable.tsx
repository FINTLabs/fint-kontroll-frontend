import {Box, Button, Heading, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IUser} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";


interface AssignUserTableProps {
    isAssignedUsers: IUser[]
    size: string
    resourceId: string
    totalPages: number
    currentPage: number
    basePath?: string
}
export const AssignUserTable = ({
    isAssignedUsers,
    size,
    resourceId,
    totalPages,
    currentPage,
    basePath,
}: AssignUserTableProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSearchParams(searchParams => {
            searchParams.set("size", event.target.value);
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div>
            <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>

            <Outlet/>

            <Table id="users-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isAssignedUsers.map((user: IUser) => (
                        <Table.Row key={user.id}>
                            <Table.DataCell scope="row">{user.fullName} </Table.DataCell>
                            <Table.DataCell>{user.assigneeUserType}</Table.DataCell>
                            <Table.DataCell>{user.assigneeOrganisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {user.assigned ?

                                    <Tag variant="success" size="small" className="navds-tag-in-table">
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${basePath}/assignment/resource/${resourceId}/user/${user.id}/orgunit/${user.assigneeOrganisationUnitId}/assign?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? "" : searchParams.get("search")}`}
                                        underline={false}
                                    >
                                        Tildel
                                    </Button>

                                }
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Box className={"paginationWrapper"}>
                <Select
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={size ? size : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </div>
    );
};