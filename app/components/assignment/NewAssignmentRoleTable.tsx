import {Button, Heading, Link, Table, Tag} from "@navikt/ds-react";
import type {IRole} from "~/data/types";
import React from "react";
import {Outlet, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {getResourceConfirmRoleAssignmentUrl} from "~/data/constants";

interface AssignRoleTableProps {
    isAssignedRoles: IRole[];
    size: number;
    resourceId: string | undefined;
    totalPages: number;
    currentPage: number;
    basePath?: string;
}

export const AssignRoleTable = (props: AssignRoleTableProps) => {
    const [searchParams] = useSearchParams()
    const {fetching} = useLoadingState()

    return (
        <div>
            <Heading className={"heading"} size={"large"} level={"3"}>Grupper</Heading>
            <Outlet/>
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
                    {fetching ? <TableSkeleton/> : props.isAssignedRoles.map((role: IRole) => (
                        <Table.Row key={role.id}>
                            <Table.HeaderCell scope="row">{role.roleName} </Table.HeaderCell>
                            <Table.DataCell>{role.roleType}</Table.DataCell>
                            <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {role.assigned ?
                                    <Tag variant="success" size="small" className="navds-tag-in-table">
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon title="a11y-title" fontSize="1.5rem"/>}
                                        iconPosition="right"
                                        href={`${props.basePath}${getResourceConfirmRoleAssignmentUrl(Number(props.resourceId), role.id, role.organisationUnitId)}?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? "" : searchParams.get("search")}`}
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
            <TablePagination currentPage={props.currentPage} totalPages={props.totalPages} size={props.size}/>
        </div>
    );
};