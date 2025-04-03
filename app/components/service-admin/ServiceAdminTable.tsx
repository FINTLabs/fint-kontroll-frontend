import { Box, Button, Dropdown, HStack, Link, Table } from '@navikt/ds-react';
import { FunnelFillIcon, FunnelIcon, MinusIcon, TrashIcon } from '@navikt/aksel-icons';
import { Outlet, useSearchParams } from '@remix-run/react';
import React from 'react';
import { StatusTag } from '~/components/service-admin/StatusTag';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { TertiaryArrowButton } from '~/components/common/Buttons/TertiaryArrowButton';
import { getDeleteResourceUrl, getResourceByIdUrl } from '~/data/paths';
import { IResourceAdminList } from '~/data/types/resourceTypes';
import { TertiaryDeleteButton } from '~/components/common/Buttons/TertiaryDeleteButton';
import { prepareQueryParams } from '~/utils/searchParamsHelpers';

interface ResourceTableProps {
    resourcePage: IResourceAdminList;
    size: string;
    source?: string;
}

export const ServiceAdminTable = ({ resourcePage, size, source }: ResourceTableProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { fetching } = useLoadingState();

    const setStatusFilter = (event: string) => {
        setSearchParams((searchParams) => {
            if (event) {
                searchParams.set('status', event);
            } else {
                searchParams.delete('status');
            }
            return searchParams;
        });
    };

    return (
        <>
            <Outlet />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Applikasjonskategori</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">
                            Status
                        </Table.HeaderCell>
                        {source === 'gui' && (
                            <Table.HeaderCell align={'right'} scope="col"></Table.HeaderCell>
                        )}
                        <Table.HeaderCell scope="col" align="right"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton columns={5} />
                    ) : (
                        resourcePage.resources.map((resource) => (
                            <Table.Row key={resource.id}>
                                <Table.DataCell>{resource.resourceName}</Table.DataCell>
                                <Table.DataCell>
                                    {resource.applicationCategory?.filter(Boolean).join(', ')}
                                </Table.DataCell>
                                <Table.DataCell align={'center'}>
                                    {<StatusTag status={resource.status} />}
                                </Table.DataCell>
                                {source === 'gui' && (
                                    <Table.DataCell align={'right'}>
                                        {resource.status === 'DELETED' ? (
                                            <Box asChild width={'100%'}>
                                                <MinusIcon title="a11y-title" fontSize="1.5rem" />
                                            </Box>
                                        ) : (
                                            <TertiaryDeleteButton
                                                url={`${getDeleteResourceUrl(resource.id)}${prepareQueryParams(searchParams)}`}
                                            />
                                        )}
                                    </Table.DataCell>
                                )}
                                <Table.DataCell align="right">
                                    <TertiaryArrowButton
                                        id={`resourceAdminInfoButton-${resource.id}`}
                                        url={getResourceByIdUrl(resource.id)}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={resourcePage.currentPage}
                totalPages={resourcePage.totalPages}
                size={size}
            />
        </>
    );
};
