import { Table } from '@navikt/ds-react';
import { Outlet, useParams, useSearchParams } from '@remix-run/react';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { getDeleteRoleAssignmentUrl } from '~/data/paths';
import { IAssignmentPage, IResourceAssignment } from '~/data/types/resourceTypes';
import { TertiaryDeleteButton } from '~/components/common/Buttons/TertiaryDeleteButton';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';

interface AssignmentsForRoleTableProps {
    assignmentsForRole: IAssignmentPage;
    size: string;
}

export const AssignmentsForRoleTable = ({
    assignmentsForRole,
    size,
}: AssignmentsForRoleTableProps) => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    return (
        <>
            <Outlet />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Fjern tildeling
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assignmentsForRole.resources.map((resource: IResourceAssignment) => (
                        <Table.Row key={resource.assignmentRef}>
                            <Table.DataCell>{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell>
                                {resource.assignerDisplayname
                                    ? resource.assignerDisplayname
                                    : resource.assignerUsername}
                            </Table.DataCell>
                            <Table.DataCell align={'center'}>
                                <TertiaryDeleteButton
                                    id={`deleteAssignment-${resource.assignmentRef}`}
                                    url={`${getDeleteRoleAssignmentUrl(Number(params.id), resource.assignmentRef)}${prepareQueryParams(searchParams)}`}
                                />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <TablePagination
                currentPage={assignmentsForRole.currentPage}
                totalPages={assignmentsForRole.totalPages}
                size={size}
            />
        </>
    );
};
