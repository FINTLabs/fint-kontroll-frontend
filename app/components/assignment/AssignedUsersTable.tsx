import {Box, Button, Heading, Pagination, Select, Table} from "@navikt/ds-react";
import type {IAssignedUsers} from "~/data/types";
import React from "react";
import {useSearchParams} from "@remix-run/react";
import {TrashIcon} from "@navikt/aksel-icons";

export const AssignedUsersTable: any = (props: { assignedUsers: IAssignedUsers, size: string, page: string }) => {

    const [, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSearchParams(searchParams => {
            searchParams.set("size", event.target.value);
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <>
            <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Fjern tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.assignedUsers.users.map((user) => (
                        <Table.Row key={user.id}>
                            <Table.HeaderCell scope="row">{user.firstName} {user.lastName}</Table.HeaderCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell>Ola Normann</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                <Button
                                    className={"buttonOutlined"}
                                    variant={"secondary"}
                                    onClick={() => {
                                    }}
                                    icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                    iconPosition={"right"}
                                >
                                    Slett
                                </Button>
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
                    defaultValue={props.size ? props.size : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={props.assignedUsers.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.assignedUsers.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </>
    );
};