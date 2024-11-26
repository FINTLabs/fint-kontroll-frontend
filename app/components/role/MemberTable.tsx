import {Table} from "@navikt/ds-react";
import {IMemberItem, IRole} from "~/data/types";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {useLoaderData, useOutletContext} from "@remix-run/react";
import {loader} from "~/routes/roles.$id.members";
import {translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {TertiaryArrowButton} from "~/components/common/Buttons/TertiaryArrowButton";

export const MemberTable = () => {
    const {members: {members, currentPage, totalPages}, size, userTypes} = useLoaderData<typeof loader>();
    const {fetching} = useLoadingState()

    const role = useOutletContext<IRole>()

    return (
        <>
            <Table id={"memberTable"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton columns={2} height={30}/> : members.map((member: IMemberItem) => (
                        <Table.Row key={member.id}>
                            <Table.HeaderCell scope="row">{member.firstName} {member.lastName}</Table.HeaderCell>
                            <Table.DataCell>{translateUserTypeToLabel(member.userType, userTypes)}</Table.DataCell>
                            <Table.DataCell align="right">
                                <TertiaryArrowButton
                                    id={`memberInfoButton-${member.id}`}
                                    url={`../members/${member.id}/orgunit/${role.organisationUnitId}`}
                                />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={currentPage} totalPages={totalPages} size={size}/>
        </>
    );
};