import { Table } from '@navikt/ds-react';
import { Outlet, useParams, useSearchParams } from 'react-router';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { getDeleteUserAssignmentUrl } from '~/data/paths';
import { IAssignmentPage } from '~/data/types/resourceTypes';
import { DeleteButtonOrTagComponent } from '~/components/common/DeleteButtonOrTagComponent';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';

interface AssignmentsForUserTableProps {
    assignmentsForUser: IAssignmentPage;
    size: string;
}

export const AssignmentsForUserTable = ({
    assignmentsForUser,
    size,
}: AssignmentsForUserTableProps) => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const { fetching } = useLoadingState();

    return (
        <>
            <Outlet />
            <Table id="resources-for-user-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
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
                        assignmentsForUser.resources.map((resource) => (
                            <Table.Row key={resource.resourceRef}>
                                <Table.HeaderCell>{resource.resourceName}</Table.HeaderCell>
                                <Table.DataCell>{resource.resourceType}</Table.DataCell>
                                <Table.DataCell>
                                    {resource.assignerDisplayname
                                        ? resource.assignerDisplayname
                                        : resource.assignerUsername}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {resource.directAssignment
                                        ? 'Direkte'
                                        : resource.assignmentViaRoleName}
                                </Table.DataCell>
                                <Table.DataCell align={'center'}>
                                    <DeleteButtonOrTagComponent
                                        directAssignment={resource.directAssignment}
                                        deletableAssignment={resource.deletableAssignment}
                                        href={`${getDeleteUserAssignmentUrl(Number(params.id), resource.assignmentRef)}${prepareQueryParams(searchParams)}`}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>

            <TablePagination
                currentPage={assignmentsForUser.currentPage}
                totalPages={assignmentsForUser.totalPages}
                size={size}
                totalItems={assignmentsForUser.totalItems}
            />
        </>
    );
};
