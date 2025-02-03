import { Button, Link, Table } from '@navikt/ds-react';
import { Outlet, useParams, useSearchParams } from '@remix-run/react';
import { TrashIcon } from '@navikt/aksel-icons';
import { prepareQueryParams } from '~/components/common/CommonFunctions';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { getDeleteRoleAssignmentUrl } from '~/data/paths';
import { IAssignmentPage, IResourceAssignment } from '~/data/types/resourceTypes';

interface AssignmentsForRoleTableProps {
    assignmentsForRole: IAssignmentPage;
    size: string;
    basePath?: string;
}

export const AssignmentsForRoleTable = ({
    assignmentsForRole,
    size,
    basePath,
}: AssignmentsForRoleTableProps) => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    return (
        <>
            <Outlet />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
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
                                <Button
                                    as={Link}
                                    className={'button-outlined'}
                                    variant={'secondary'}
                                    icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem" />}
                                    iconPosition={'right'}
                                    href={`${basePath}${getDeleteRoleAssignmentUrl(Number(params.id), resource.assignmentRef)}${prepareQueryParams(searchParams)}`}>
                                    Slett
                                </Button>
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
