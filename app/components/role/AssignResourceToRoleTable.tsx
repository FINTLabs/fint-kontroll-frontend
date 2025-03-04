import { Button, Link, Table, Tag } from '@navikt/ds-react';
import React from 'react';
import { Outlet, useSearchParams } from '@remix-run/react';
import { PlusIcon } from '@navikt/aksel-icons';
import { prepareQueryParams } from '~/components/common/CommonFunctions';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/components/common/customHooks';
import { getConfirmRoleAssignmentUrl } from '~/data/paths';
import { IResourceForList } from '~/data/types/resourceTypes';

interface AssignResourceToRoleTableProps {
    isAssignedResources: IResourceForList[];
    size: string;
    roleId: number;
    totalPages?: number;
    currentPage: number;
    orgId: string;
    basePath?: string;
}

export const AssignResourceToRoleTable = ({
    isAssignedResources,
    size,
    roleId,
    totalPages,
    currentPage,
    orgId,
    basePath,
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
                                        <Button
                                            as={Link}
                                            variant={'secondary'}
                                            icon={<PlusIcon />}
                                            iconPosition="right"
                                            href={`${basePath}${getConfirmRoleAssignmentUrl(roleId, resource.id, orgId)}${prepareQueryParams(searchParams)}`}
                                            underline={false}>
                                            Tildel
                                        </Button>
                                    )}
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>

            <TablePagination currentPage={currentPage} totalPages={totalPages} size={size} />
        </div>
    );
};
