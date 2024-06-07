import {Box, Button, Link, Pagination, Select, Table, Tag} from "@navikt/ds-react";
import type {IResource} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";

export const AssignResourceToUserTable: any = (props: {
    isAssignedResources: IResource[],
    size: string,
    page: string,
    userId: string,
    orgId: string,
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
                    {props.isAssignedResources.map((resource: IResource) => (
                        <Table.Row key={resource.id}>
                            <Table.HeaderCell scope="row">{resource.resourceName} </Table.HeaderCell>
                            <Table.DataCell align={"center"}>
                                {resource.assigned ?
                                    <Tag variant="success" size="small">
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${props.basePath}/assignment/user/${props.userId}/resource/${resource.id}/orgunit/${props.orgId}/assign?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}`}
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