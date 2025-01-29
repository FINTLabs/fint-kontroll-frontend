import {Button, Heading, Link, Table, Tag} from "@navikt/ds-react";
import type {IRole} from "~/data/types/userTypes";
import React from "react";
import {Outlet, useLoaderData, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {getResourceConfirmRoleAssignmentUrl} from "~/data/paths";
import {loader} from "~/routes/ressurs.$id.ny-tildeling.brukere";
import {translateUserTypeToLabel} from "~/components/common/CommonFunctions";

interface AssignRoleTableProps {
    isAssignedRoles: IRole[];
    size: number;
    resourceId: string | undefined;
    totalPages: number;
    currentPage: number;
    basePath?: string;
}

export const AssignRoleTable = (props: AssignRoleTableProps) => {
    const {userTypesKodeverk} = useLoaderData<typeof loader>()

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
                        <Table.HeaderCell scope="col">Org.enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton/> : props.isAssignedRoles.map((role: IRole) => (
                        <Table.Row key={role.id}>
                            <Table.HeaderCell scope="row">{role.roleName} </Table.HeaderCell>
                            <Table.DataCell>{translateUserTypeToLabel(role.roleType, userTypesKodeverk)}</Table.DataCell>
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