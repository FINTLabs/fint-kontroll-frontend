import { Table } from '@navikt/ds-react';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { useLoadingState } from '~/utils/customHooks';
import { useLoaderData } from 'react-router';
import { getDeviceGroupByIdUrl } from '~/data/paths';
import { GoToButton } from '~/components/common/Table/buttons/GoToButton';
import { loader } from '~/routes/digitale-enheter._index';

export const DeviceTable = () => {
    const { deviceGroup: deviceGroup, size } = useLoaderData<typeof loader>();
    /*console.log('Her er fra device tabellen', deviceGroup);*/
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
                        Object.values(deviceGroup).map((device, index) => (
                            <Table.Row key={index}>
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
        </>
    );
};
