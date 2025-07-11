import { Table, Tag } from '@navikt/ds-react';
import React from 'react';
import { Outlet, useSearchParams } from '@remix-run/react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { getConfirmRoleAssignmentUrl } from '~/data/paths';
import { IResourceForList } from '~/data/types/resourceTypes';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';
import { AssignButton } from '~/components/common/Table/buttons/AssignButton';

interface AssignResourceToRoleTableProps {
    isAssignedResources: IResourceForList[];
    size: string;
    roleId: number;
    totalPages?: number;
    currentPage: number;
    orgId: string;
    totalItems: number;
}

export const AssignResourceToRoleTable = ({
    isAssignedResources,
    size,
    roleId,
    totalPages,
    currentPage,
    orgId,
    totalItems,
}: AssignResourceToRoleTableProps) => {
    const [searchParams] = useSearchParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <Outlet />

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Tildelinger
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {fetching ? (
                        <TableSkeleton columns={2} />
                    ) : (
                        isAssignedResources.map((resource: IResourceForList) => (
                            <Table.Row key={resource.id}>
                                <Table.HeaderCell scope="row">
                                    {resource.resourceName}{' '}
                                </Table.HeaderCell>
                                <Table.DataCell align={'center'}>
                                    {resource.assigned ? (
                                        <Tag
                                            variant="success"
                                            size="small"
                                            className="navds-tag-in-table">
                                            Er tildelt
                                        </Tag>
                                    ) : (
                                        <AssignButton
                                            id={`assignResource-${resource.id}`}
                                            url={`${getConfirmRoleAssignmentUrl(roleId, resource.id, orgId)}${prepareQueryParams(searchParams)}`}
                                        />
                                    )}
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                size={size}
                totalItems={totalItems}
            />
        </div>
    );
};
