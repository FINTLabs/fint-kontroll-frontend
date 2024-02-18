import {Box, Button, Heading, Pagination, Select, Table} from "@navikt/ds-react";
import type {IRolePage} from "~/data/types";
import React from "react";
import {useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";

export const AssignRoleTable: any = (props: { newAssignmentForRole: IRolePage, size: string, page: string }) => {

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
            <Heading className={"heading"} size={"large"} level={"3"}>Grupper</Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"right"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.newAssignmentForRole.roles.map((role) => (
                        <Table.Row key={role.id}>
                            <Table.HeaderCell scope="row">{role.roleName} </Table.HeaderCell>
                            <Table.DataCell>{role.roleType}</Table.DataCell>
                            <Table.DataCell>data kommer</Table.DataCell>
                            <Table.DataCell align={"right"}>
                                <Button
                                    variant={"secondary"}
                                    onClick={() => {
                                    }}
                                    icon={<PlusIcon title="a11y-title" fontSize="1.5rem"/>}
                                    iconPosition={"right"}
                                >
                                    Tildel
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
                    page={props.newAssignmentForRole.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.newAssignmentForRole.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </>
    );
};