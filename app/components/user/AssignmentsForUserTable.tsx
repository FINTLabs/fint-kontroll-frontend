import {Button, Link, Pagination, Select, Table} from "@navikt/ds-react";
import type {IAssignmentPage} from "~/data/types";
import {Form, Outlet, useParams, useSearchParams} from "@remix-run/react";
import React from "react";
import {TrashIcon} from "@navikt/aksel-icons";
import {prepareQueryParams, setSizeCookieClientSide} from "~/components/common/CommonFunctions";

interface AssignmentsForUserTableProps {
    assignmentsForUser: IAssignmentPage
    size: string
    basePath?: string
}

export const AssignmentsForUserTable = ({assignmentsForUser, size, basePath}: AssignmentsForUserTableProps) => {

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
        <>
            <Outlet/>
            <Table id="resources-for-user-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Fjern tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assignmentsForUser.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.HeaderCell scope="row">{resource.resourceName}</Table.HeaderCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell>{resource.assignerDisplayname ? resource.assignerDisplayname : resource.assignerUsername}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                <Button
                                    as={Link}
                                    className={"button-outlined"}
                                    variant={"secondary"}
                                    icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                    iconPosition={"right"}
                                    href={`${basePath}/users/${params.id}/orgunit/${params.orgId}/${resource.assignmentRef}/delete${prepareQueryParams(searchParams)}`}
                                >
                                    Slett
                                </Button>
                            </Table.DataCell>
                        </Table.Row>

                    ))}
                </Table.Body>
            </Table>

            <Form className={"paginationWrapper"}>
                <Select
                    id={"select-number-of-rows"}
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={size ? size : 25}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={assignmentsForUser.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={assignmentsForUser.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};