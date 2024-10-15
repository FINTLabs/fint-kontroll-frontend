import {Table} from "@navikt/ds-react";
import type {IMemberPage} from "~/data/types";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";


interface MembersTableProps {
    memberPage: IMemberPage
    size: string
}

export const MemberTable = ({ memberPage, size }: MembersTableProps) => {
    const {fetching} = useLoadingState()

    return (
        <>
            <Table id={"memberTable"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton columns={2} height={30}/> : memberPage.members.map((member) => (
                        <Table.Row key={member.id}>
                            <Table.HeaderCell scope="row">{member.firstName} {member.lastName}</Table.HeaderCell>
                            <Table.DataCell>{member.userType}</Table.DataCell>
                            {/*<Table.DataCell align="right">
                                <Button
                                    id={`memberInfoButton-${member.id}`}
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/users/${member.id}`)
                                    }
                                    // id={`resource-${i}`}
                                    variant={"secondary"}
                                    role="link"
                                >
                                    Se info
                                </Button>
                            </Table.DataCell>*/}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <TablePagination currentPage={memberPage.currentPage} totalPages={memberPage.totalPages} size={size}/>
        </>
    );
};