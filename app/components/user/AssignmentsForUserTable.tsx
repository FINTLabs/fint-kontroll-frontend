import {Button, Link, Table, Tag} from "@navikt/ds-react";
import type {IAssignmentPage} from "~/data/types";
import {Outlet, useParams, useSearchParams} from "@remix-run/react";
import React from "react";
import {TrashIcon} from "@navikt/aksel-icons";
import {prepareQueryParams} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";

interface AssignmentsForUserTableProps {
    assignmentsForUser: IAssignmentPage
    size: string
    basePath?: string
}

export const AssignmentsForUserTable = ({assignmentsForUser, size, basePath}: AssignmentsForUserTableProps) => {

    const [searchParams] = useSearchParams()
    const params = useParams()
    const {fetching} = useLoadingState()

    return (
        <>
            <Outlet/>
            <Table id="resources-for-user-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelingskobling</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Fjern tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton columns={5}/> : assignmentsForUser.resources.map((resource) => (
                        <Table.Row key={resource.resourceRef}>
                            <Table.HeaderCell scope="row">{resource.resourceName}</Table.HeaderCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell>{resource.assignerDisplayname ? resource.assignerDisplayname : resource.assignerUsername}</Table.DataCell>
                            <Table.DataCell>{resource.directAssignment ? "Direkte" : resource.assignmentViaRoleName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {resource.directAssignment
                                    ?
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
                                    :
                                    <Tag variant="info" size="small" className="navds-tag-in-table">
                                        Gruppetildeling
                                    </Tag>
                                }
                            </Table.DataCell>
                        </Table.Row>

                    ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={assignmentsForUser.currentPage} totalPages={assignmentsForUser.totalPages} size={size}/>
        </>
    );
};