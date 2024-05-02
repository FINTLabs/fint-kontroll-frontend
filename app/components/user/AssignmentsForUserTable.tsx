import {Pagination, Select, Table} from "@navikt/ds-react";
import type {IAssignmentPage} from "~/data/types";
import {Form, useSearchParams} from "@remix-run/react";
import React from "react";

interface AssignmentsForUserTableProps {
    assignmentsForUser: IAssignmentPage
    size: string
    page: string
}
export const AssignmentsForUserTable = ({assignmentsForUser, size, page}: AssignmentsForUserTableProps) => {

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
            <Table id="resources-for-user-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    {assignmentsForUser.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.HeaderCell scope="row">{resource.resourceName}</Table.HeaderCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell>{resource.assignerDisplayname ? resource.assignerDisplayname : resource.assignerUsername}</Table.DataCell>
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
                    defaultValue={size ? size : 10}
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