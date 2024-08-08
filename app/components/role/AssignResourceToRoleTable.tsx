import {Box, Button, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IResource, IResourceForList} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {prepareQueryParams, setSizeCookieClientSide} from "~/components/common/CommonFunctions";


interface AssignResourceToRoleTableProps {
    isAssignedResources: IResourceForList[],
    size: string
    roleId: number
    totalPages: number
    currentPage: number
    orgId: string
    basePath?: string
}

export const AssignResourceToRoleTable = (
    {
        isAssignedResources,
        size,
        roleId,
        totalPages,
        currentPage,
        orgId,
        basePath
    }: AssignResourceToRoleTableProps) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div>
            <Outlet/>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {isAssignedResources.map((resource: IResourceForList) => (
                        <Table.Row key={resource.id}>
                            <Table.HeaderCell scope="row">{resource.resourceName} </Table.HeaderCell>
                            <Table.DataCell align={"center"}>
                                {resource.assigned ?
                                    <Tag variant="success" size="small" className="navds-tag-in-table">
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${basePath}/assignment/role/${roleId}/resource/${resource.id}/orgunit/${orgId}/assign${prepareQueryParams(searchParams)}`}
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
                    defaultValue={size ? size : 25}
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