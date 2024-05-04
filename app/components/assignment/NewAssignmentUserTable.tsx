import {Box, Button, Heading, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IUser} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";

export const AssignUserTable: any = (props: {
    isAssignedUsers: IUser[],
    size: string,
    page: string,
    resourceId: string,
    totalPages: number,
    currentPage: number,
    basePath?: string
}) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSearchParams(searchParams => {
            searchParams.set("size", event.target.value);
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div style={{marginTop: '3rem'}}>
            <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>
            <Outlet/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.isAssignedUsers.map((user: IUser) => (
                        <Table.Row key={user.id}>
                            <Table.HeaderCell scope="row">{user.fullName} </Table.HeaderCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {user.assigned ?

                                    <Tag variant="success" size="small"
                                         style={{marginTop: '0.7rem', marginBottom: '0.7rem'}}>
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${props.basePath}/assignment/resource/${props.resourceId}/user/${user.id}/orgunit/${user.organisationUnitId}/assign?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? 0 : searchParams.get("search")}`}
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
                    defaultValue={props.size ? props.size : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={props.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </div>
    );
};