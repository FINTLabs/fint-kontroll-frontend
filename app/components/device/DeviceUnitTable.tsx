import { BodyShort, HStack, Table } from '@navikt/ds-react';
import React from 'react';
import { useLoadingState } from '~/utils/customHooks';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { IDeviceItemList } from '~/data/types/deviceTypes';
import { TablePagination } from '~/components/common/Table/TablePagination';

interface DeviceItemsTableProps {
    deviceItemList: IDeviceItemList;
    size: string;
}

export const DeviceUnitTable = ({ deviceItemList, size }: DeviceItemsTableProps) => {
    const { fetching } = useLoadingState();
    return (
        <>
            <Table id={'device-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">serienummer</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Plattform</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhetstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton />
                    ) : (
                        deviceItemList.members.map((device, index) => (
                            <Table.ExpandableRow
                                key={device.id}
                                content={
                                    <HStack gap="16">
                                        <div>
                                            <BodyShort weight="semibold">
                                                Flerbrukerenhet:
                                            </BodyShort>
                                            {device.isShared ? 'Ja' : 'Nei'}
                                        </div>
                                    </HStack>
                                }>
                                <Table.DataCell>{device.name}</Table.DataCell>
                                <Table.DataCell>{device.serialNumber}</Table.DataCell>
                                <Table.DataCell>{device.platform}</Table.DataCell>
                                <Table.DataCell>{device.deviceType}</Table.DataCell>
                                <Table.DataCell>{device.status}</Table.DataCell>
                            </Table.ExpandableRow>
                        ))
                    )}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={deviceItemList.currentPage}
                totalPages={deviceItemList.totalPages}
                size={size}
                totalItems={deviceItemList.totalItems}
            />
        </>
    );
};
