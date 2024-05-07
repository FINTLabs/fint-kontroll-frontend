import {Button, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {Form, useNavigate, useSearchParams} from "@remix-run/react";
import type {IResourcePage} from "~/data/types";
import React from "react";

interface ResourceTableProps {
    resourcePage: IResourcePage
    size: string
}

export const ResourceTable = ({resourcePage, size}: ResourceTableProps) => {

    const navigate = useNavigate();
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
            <Table id="resources-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">Se mer informasjon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resourcePage.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.DataCell scope="row">{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell align="center">
                                <Button
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/resources/${resource.id}/all-assignments`)
                                    }
                                    // id={`resource-${i}`}
                                    variant={"secondary"}
                                    role="link"
                                >
                                    Se info
                                </Button>
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Form className={"paginationWrapper"}>
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
                    page={resourcePage.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={resourcePage.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};