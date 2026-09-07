import { Table, Tag } from '@navikt/ds-react';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { GoToButton } from '~/components/common/Table/buttons/GoToButton';
import { getResourceUserAssignmentsUrl } from '~/data/paths';
import { IResourceList } from '~/data/types/resourceTypes';

interface ResourceTableProps {
    resourcePage: IResourceList;
    size: string;
    hasAccessToResourceDetails?: boolean;
}

export const ResourceTable = ({
    resourcePage,
    size,
    hasAccessToResourceDetails,
}: ResourceTableProps) => {
    const { fetching } = useLoadingState();

    return (
        <>
            <Table id="resources-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Applikasjonstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                        {hasAccessToResourceDetails && (
                            <Table.HeaderCell
                                scope="col"
                                align="right"
                                aria-label={'Se mer informasjon'}
                            >
                                Se mer info.
                            </Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton columns={3} />
                    ) : (
                        resourcePage.resources.map((resource) => (
                            <Table.Row key={resource.id}>
                                <Table.DataCell>{resource.resourceName}</Table.DataCell>
                                <Table.DataCell>
                                    {resource.applicationCategory?.filter(Boolean).join(', ')}
                                </Table.DataCell>
                                <Table.DataCell>
                                    {resource.status === 'PENDING_ACTIVE' && (
                                        <Tag
                                            variant="warning"
                                            size="small"
                                            className="navds-tag-in-table ml-4"
                                        >
                                            Behandles
                                        </Tag>
                                    )}
                                </Table.DataCell>

                                {hasAccessToResourceDetails && (
                                    <Table.DataCell align="right">
                                        <GoToButton
                                            id={`resourceInfoButton-${resource.id}`}
                                            url={getResourceUserAssignmentsUrl(resource.id)}
                                        />
                                    </Table.DataCell>
                                )}
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={resourcePage.currentPage}
                totalPages={resourcePage.totalPages}
                size={size}
                totalItems={resourcePage.totalItems}
            />
        </>
    );
};
