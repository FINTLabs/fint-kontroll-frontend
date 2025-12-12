import { BodyShort, HStack, Table } from '@navikt/ds-react';
import React from 'react';
import { useLoadingState } from '~/utils/customHooks';
import { useLoaderData } from 'react-router';
import { loader } from '~/routes/digitale-enheter.$id.info';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';

export const DeviceUnitTable = () => {
    const { deviceItems: deviceItems } = useLoaderData<typeof loader>();
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
                        Object.values(deviceItems).map((device, index) => (
                            <Table.ExpandableRow
                                key={device.id}
                                content={
                                    <HStack gap="16">
                                        <div>
                                            <BodyShort weight="semibold">KildesystemID:</BodyShort>
                                            {device.sourceId}
                                        </div>
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
        </>
    );
};
