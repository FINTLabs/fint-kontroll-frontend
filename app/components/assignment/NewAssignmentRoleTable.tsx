import {Button, Heading, Link, Table, Tag} from "@navikt/ds-react";
import type {IRole} from "~/data/types";
import React from "react";
import {Outlet, useNavigation, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {isLoading} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";

export const AssignRoleTable: any = (props: {
    isAssignedRoles: IRole[],
    size: string,
    page: string,
    resourceId: string,
    totalPages: number,
    currentPage: number,
    basePath?: string
}) => {

    const [searchParams] = useSearchParams()
    const navigation = useNavigation()
    const loading = isLoading(navigation)

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
                    {loading ? <TableSkeleton /> : props.isAssignedRoles.map((role: IRole) => (
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
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${props.basePath}/assignment/resource/${props.resourceId}/role/${role.id}/orgunit/${role.organisationUnitId}/assign?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? "" : searchParams.get("search")}`}
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