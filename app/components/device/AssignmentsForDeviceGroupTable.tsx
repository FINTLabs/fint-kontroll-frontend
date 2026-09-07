import { Table } from '@navikt/ds-react';
import { Outlet, useParams, useSearchParams } from 'react-router';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { getDeleteDeviceGroupAssignmentUrl } from '~/data/paths';
import { IAssignmentPage, IResourceAssignment } from '~/data/types/resourceTypes';
import { DeleteButton } from '~/components/common/Table/buttons/DeleteButton';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';

interface AssignmentsForDeviceGroupTableProps {
    assignmentsForDeviceGroup: IAssignmentPage;
    size: string;
}

export const AssignmentsForDeviceGroupTable = ({
    assignmentsForDeviceGroup,
    size,
}: AssignmentsForDeviceGroupTableProps) => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    return (
        <>
            <Outlet />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tildelt av</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Fjern tildeling
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assignmentsForDeviceGroup.resources.map((resource: IResourceAssignment) => (
                        <Table.Row key={resource.assignmentRef}>
                            <Table.DataCell>{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>
                                {resource.assignerDisplayname
                                    ? resource.assignerDisplayname
                                    : resource.assignerUsername}
                            </Table.DataCell>
                            <Table.DataCell align={'center'}>
                                <DeleteButton
                                    id={`deleteAssignment-${resource.assignmentRef}`}
                                    url={`${getDeleteDeviceGroupAssignmentUrl(Number(params.id), resource.assignmentRef)}${prepareQueryParams(searchParams)}`}
                                />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <TablePagination
                currentPage={assignmentsForDeviceGroup.currentPage}
                totalPages={assignmentsForDeviceGroup.totalPages}
                size={size}
                totalItems={assignmentsForDeviceGroup.totalItems}
            />
        </>
    );
};
