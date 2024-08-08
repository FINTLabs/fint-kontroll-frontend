import {Box, Button, Heading, Link, Pagination, Select, Table, VStack} from "@navikt/ds-react";
import type {IAssignedRoles} from "~/data/types";
import React from "react";
import {Outlet, useParams, useSearchParams} from "@remix-run/react";
import {TrashIcon} from "@navikt/aksel-icons";
import {setSizeCookieClientSide} from "~/components/common/CommonFunctions";

export const AssignedRolesTable: any = (props: {
    assignedRoles: IAssignedRoles,
    size: string,
    page: string,
    search: string,
    basePath?: string
}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div>
            <VStack gap="8">
                <Heading className={"heading"} size={"large"} level={"3"}>Grupper</Heading>

                <Outlet/>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align={"center"}>Fjern tildeling</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.assignedRoles.roles.map((role) => (
                            <Table.Row key={role.id}>
                                <Table.HeaderCell scope="row">{role.roleName}</Table.HeaderCell>
                                <Table.DataCell>{role.roleType}</Table.DataCell>
                                <Table.DataCell>{role.assignerDisplayname ? role.assignerDisplayname : role.assignerUsername}</Table.DataCell>
                                <Table.DataCell align={"center"}>
                                    <Button
                                        as={Link}
                                        className={"button-outlined"}
                                        variant={"secondary"}
                                        icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                        iconPosition={"right"}
                                        href={`${props.basePath}/resources/${params.id}/role-assignments/${role.assignmentRef}/delete?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? "" : searchParams.get("search")}`}
                                    >
                                        Slett
                                    </Button>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </VStack>

            <Box className={"paginationWrapper"}>
                <Select
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={props.size ? props.size : 25}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={props.assignedRoles.currentPage + 1} //Number(props.page) ? Number(props.page) : 1
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.assignedRoles.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </div>
    );
};