import {Button, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {useNavigate} from "@remix-run/react";
import {IUserItem, IUserPage} from "~/data/types";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";

interface UserTableProps {
    userPage: IUserPage
    size: string
}

export const UserTable = ({userPage, size}: UserTableProps) => {
    const navigate = useNavigate();
    const {fetching} = useLoadingState()

    return (
        <>
            <Table id={"user-table"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton /> : userPage.users.map((user: IUserItem) => (
                        <Table.Row key={user.id} id={`row-${user.fullName.replace(/\s+/g, '-')}`}>
                            <Table.DataCell>{user.fullName}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell align="right">
                                <Button
                                    id={`userInfoButton-${user.id}`}
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/users/${user.id}/orgunit/${user.organisationUnitId}`)
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

            <TablePagination currentPage={userPage.currentPage} totalPages={userPage.totalPages} size={size}/>
        </>
    );
};