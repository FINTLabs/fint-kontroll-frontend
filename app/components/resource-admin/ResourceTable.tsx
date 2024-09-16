import {Button, Link, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon, TrashIcon} from "@navikt/aksel-icons";
import {Form, Outlet, useNavigate, useSearchParams} from "@remix-run/react";
import type {IResourceList} from "~/data/types";
import React from "react";
import {prepareQueryParams, setSizeCookieClientSide} from "~/components/common/CommonFunctions";

interface ResourceTableProps {
    resourcePage: IResourceList,
    size: string,
    basePath?: string
}

export const ResourceTable = ({resourcePage, size, basePath}: ResourceTableProps) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()

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
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">Slett</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">Se mer informasjon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resourcePage.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.HeaderCell scope="row">{resource.resourceName}</Table.HeaderCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell align="center">
                                <Button
                                    as={Link}
                                    className={"button-outlined"}
                                    variant={"secondary"}
                                    icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                    iconPosition={"right"}
                                    href={`${basePath}/resource-admin/resource/${resource.id}/delete${prepareQueryParams(searchParams)}`}
                                >
                                    Slett
                                </Button>
                            </Table.DataCell>
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
                                        navigate(`/resource-admin/${resource.id}`)
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
                    defaultValue={size ? size : 25}
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