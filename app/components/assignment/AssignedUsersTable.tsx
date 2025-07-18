import { BodyShort, Table, VStack } from '@navikt/ds-react';
import type { IAssignedUsers } from '~/data/types/userTypes';
import React from 'react';
import { Outlet, useLoaderData, useParams, useSearchParams } from 'react-router';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { loader } from '~/routes/ressurser.$id.bruker-tildelinger';
import { getResourceDeleteUserAssignmentUrl } from '~/data/paths';
import { DeleteButtonOrTagComponent } from '~/components/common/DeleteButtonOrTagComponent';
import { translateUserTypeToLabel } from '~/utils/translators';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';

interface AssignedUsersTableProps {
    assignedUsers: IAssignedUsers;
    size: string;
}

export const AssignedUsersTable = ({ assignedUsers, size }: AssignedUsersTableProps) => {
    const { userTypesKodeverk } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const params = useParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <VStack gap="8">
                <Outlet />

                <Table id="assigned-users-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Tildelingskobling</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align={'center'}>
                                Fjern tildeling
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fetching ? (
                            <TableSkeleton columns={5} />
                        ) : (
                            assignedUsers.users.map((user) => (
                                <Table.ExpandableRow
                                    key={user.assigneeRef}
                                    content={
                                        <div>
                                            <BodyShort weight="semibold">Tildelt av:</BodyShort>
                                            <BodyShort>
                                                {user.assignerDisplayname
                                                    ? user.assignerDisplayname
                                                    : user.assignerUsername}
                                            </BodyShort>
                                        </div>
                                    }>
                                    <Table.HeaderCell scope={'row'}>
                                        {user.assigneeFirstName} {user.assigneeLastName}
                                    </Table.HeaderCell>
                                    <Table.DataCell>
                                        {user.assigneeOrganisationUnitName}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {translateUserTypeToLabel(
                                            user.assigneeUserType,
                                            userTypesKodeverk
                                        )}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {user.directAssignment
                                            ? 'Direkte'
                                            : user.assignmentViaRoleName}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        <DeleteButtonOrTagComponent
                                            directAssignment={user.directAssignment}
                                            deletableAssignment={user.deletableAssignment}
                                            href={`${getResourceDeleteUserAssignmentUrl(Number(params.id), user.assignmentRef)}${prepareQueryParams(searchParams)}`}
                                        />
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </VStack>
            <TablePagination
                currentPage={assignedUsers.currentPage}
                totalPages={assignedUsers.totalPages}
                size={size}
                totalItems={assignedUsers.totalItems}
            />
        </div>
    );
};
