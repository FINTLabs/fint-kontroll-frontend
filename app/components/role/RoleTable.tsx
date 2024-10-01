import {Button, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {useNavigate, useNavigation} from "@remix-run/react";
import type {IRoleList} from "~/data/types";
import React from "react";
import {isLoading} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";

interface RoleTableProps {
    rolePage: IRoleList
    size: string
}
export const RoleTable = ({ rolePage, size }: RoleTableProps) => {

    const navigate = useNavigate();
    const navigation = useNavigation()
    const loading = isLoading(navigation)

    return (
        <>
            <Table id={"role-table"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? <TableSkeleton/> :
                        rolePage.roles.map((role) => (
                            <Table.Row key={role.id}>
                                <Table.DataCell scope="row">{role.roleName}</Table.DataCell>
                                <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                                <Table.DataCell>{role.roleType}</Table.DataCell>
                                <Table.DataCell align="right">
                                    <Button
                                        id={`roleInfoButton-${role.id}`}
                                        icon={
                                            <InformationSquareIcon
                                                title="Informasjonsikon"
                                                fontSize="1.5rem"
                                            />
                                        }
                                        iconPosition={"right"}
                                        onClick={() =>
                                            navigate(`/roles/${role.id}/members`)
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

            <TablePagination currentPage={rolePage.currentPage} totalPages={rolePage.totalPages} size={size}/>
        </>
    );
};