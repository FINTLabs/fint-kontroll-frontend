import {Table} from "@navikt/ds-react";
import {IUserItem} from "~/data/types/userTypes";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {TertiaryArrowButton} from "~/components/common/Buttons/TertiaryArrowButton";
import {useLoaderData} from "@remix-run/react";
import {loader} from "~/routes/brukere._index";
import {translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {getUserByIdUrl} from "~/data/paths";

export const UserTable = () => {
    const {userList: userPage, size, userTypesKodeverk} = useLoaderData<typeof loader>();
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
                    {fetching ? <TableSkeleton/> : userPage.users.map((user: IUserItem) => (
                        <Table.Row key={user.id} id={`row-${user.fullName.replace(/\s+/g, '-')}`}>
                            <Table.DataCell>{user.fullName}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell>{translateUserTypeToLabel(user.userType, userTypesKodeverk)}</Table.DataCell>
                            <Table.DataCell align="right">
                                <TertiaryArrowButton
                                    id={`userInfoButton-${user.id}`}
                                    url={getUserByIdUrl(user.id, user.organisationUnitId)}
                                />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={userPage.currentPage} totalPages={userPage.totalPages} size={size}/>
        </>
    );
};