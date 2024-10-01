import {Button, Heading, Link, Table, VStack} from "@navikt/ds-react";
import type {IAssignedRoles} from "~/data/types";
import React from "react";
import {Outlet, useNavigation, useParams, useSearchParams} from "@remix-run/react";
import {TrashIcon} from "@navikt/aksel-icons";
import {isLoading} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";

export const AssignedRolesTable: any = (props: {
    assignedRoles: IAssignedRoles,
    size: string,
    page: string,
    search: string,
    basePath?: string
}) => {

    const [searchParams] = useSearchParams()
    const params = useParams()
    const navigation = useNavigation()
    const loading = isLoading(navigation)

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
                        {loading ? <TableSkeleton /> : props.assignedRoles.roles.map((role) => (
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

            <TablePagination currentPage={props.assignedRoles.currentPage} totalPages={props.assignedRoles.totalPages} size={props.size}/>
        </div>
    );
};