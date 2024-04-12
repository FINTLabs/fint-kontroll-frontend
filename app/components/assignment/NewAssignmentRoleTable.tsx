import {Box, Button, Heading, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IRole} from "~/data/types";
import React from "react";
import {useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";

export const AssignRoleTable: any = (props: {
    isAssignedRoles: IRole[],
    size: string,
    page: string,
    resourceId: string,
    totalPages: number,
    currentPage: number
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
            <Heading className={"heading"} size={"large"} level={"3"}>Grupper</Heading>
            {/*<Outlet/>*/}
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.isAssignedRoles.map((role: IRole) => (
                        <Table.Row key={role.id}>
                            <Table.HeaderCell scope="row">{role.roleName} </Table.HeaderCell>
                            <Table.DataCell>{role.roleType}</Table.DataCell>
                            <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {role.assigned ?
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
                                        href={`/assignment/resource/${props.resourceId}/role/${role.id}/orgunit/${role.organisationUnitId}/assign?page=${searchParams.get("page")}`}
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