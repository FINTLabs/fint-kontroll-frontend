import { Table } from '@navikt/ds-react';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { useLoadingState } from '~/utils/customHooks';
import { getDeviceGroupByIdUrl } from '~/data/paths';
import { GoToButton } from '~/components/common/Table/buttons/GoToButton';
import { IDeviceGroupList } from '~/data/types/deviceTypes';
import { TablePagination } from '~/components/common/Table/TablePagination';

interface DeviceGroupTableProps {
    deviceGroupList: IDeviceGroupList;
    size: string;
}

export const DeviceTable = ({ deviceGroupList, size }: DeviceGroupTableProps) => {
    const { fetching } = useLoadingState();
    return (
        <>
            <Table id={'device-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhetstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Plattform</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton />
                    ) : (
                        deviceGroupList.deviceGroups?.map((device) => (
                            <Table.Row key={device.id}>
                                <Table.DataCell> {device.name}</Table.DataCell>
                                <Table.DataCell>{device.orgUnitId}</Table.DataCell>
                                <Table.DataCell>{device.deviceType}</Table.DataCell>
                                <Table.DataCell>{device.platform}</Table.DataCell>
                                <Table.DataCell align="right">
                                    <GoToButton
                                        id={`userInfoButton-${1}`}
                                        url={getDeviceGroupByIdUrl(device.id)}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={deviceGroupList.currentPage}
                totalPages={deviceGroupList.totalPages}
                size={size}
                totalItems={deviceGroupList.totalItems}
            />
        </>
    );
};
