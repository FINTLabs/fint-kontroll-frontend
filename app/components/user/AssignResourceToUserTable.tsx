import {Box, Button, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IResource} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {prepareQueryParams} from "~/components/common/CommonFunctions";
import {setSizeCookieClientSide} from "~/components/common/CommonFunctions";


interface AssignResourceToUserTableProps {
    isAssignedResources: IResource[]
    size: string
    userId: string
    orgId: string
    totalPages: number
    currentPage: number
    basePath?: string
}
export const AssignResourceToUserTable = ({
    isAssignedResources,
    size,
    userId,
    orgId,
    totalPages,
    currentPage,
    basePath
}: AssignResourceToUserTableProps) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    console.log(isAssignedResources)

    return (
        <div>
            <Outlet/>
            <Table id="resources-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {isAssignedResources.map((resource: IResource) => (
                        <Table.Row key={resource.resourceRef}>
                            <Table.DataCell scope="row">{resource.resourceName} </Table.DataCell>
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
                                        href={`${basePath}/assignment/user/${userId}/orgunit/${orgId}/resource/${resource.id}/assign${prepareQueryParams(searchParams)}`}
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