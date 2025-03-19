import { Table, VStack } from '@navikt/ds-react';
import type { IAssignedUsers } from '~/data/types/userTypes';
import React from 'react';
import { Outlet, useLoaderData, useParams, useSearchParams } from '@remix-run/react';
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
    basePath?: string;
}

export const AssignedUsersTable = ({ assignedUsers, size, basePath }: AssignedUsersTableProps) => {
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
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
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
                                <Table.Row key={user.assigneeRef}>
                                    <Table.HeaderCell>
                                        {user.assigneeFirstName} {user.assigneeLastName}
                                    </Table.HeaderCell>
                                    <Table.DataCell>
                                        {translateUserTypeToLabel(
                                            user.assigneeUserType,
                                            userTypesKodeverk
                                        )}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {user.assignerDisplayname
                                            ? user.assignerDisplayname
                                            : user.assignerUsername}
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
                                            href={`${basePath}${getResourceDeleteUserAssignmentUrl(Number(params.id), user.assignmentRef)}${prepareQueryParams(searchParams)}`}
                                        />
                                    </Table.DataCell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </VStack>

            <TablePagination
                currentPage={assignedUsers.currentPage}
                totalPages={assignedUsers.totalPages}
                size={size}
            />
        </div>
    );
};
