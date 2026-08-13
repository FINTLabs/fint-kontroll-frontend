import { BodyShort, Table, VStack } from '@navikt/ds-react';
import React from 'react';
import { Outlet, useParams, useSearchParams } from 'react-router';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { useLoadingState } from '~/utils/customHooks';
import { IAssignedDevices } from '~/data/types/deviceTypes';
import { DeleteButton } from '~/components/common/Table/buttons/DeleteButton';
import {
    getResourceDeleteDeviceGroupAssignmentUrl,
    getResourceDeleteRoleAssignmentUrl,
} from '~/data/paths';

export const AssignedDeviceTable: any = (props: {
    assignedDevices: IAssignedDevices;
    size: string;
    page: string;
    search: string;
    basePath?: string;
}) => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <VStack gap="space-8">
                <Outlet />

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell scope="col">Maskingruppe</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Enhetstype</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align={'center'}>
                                Fjern tildeling
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fetching ? (
                            <TableSkeleton />
                        ) : (
                            props.assignedDevices.deviceGroupAssignments.map((device) => (
                                <Table.ExpandableRow
                                    key={device.id}
                                    content={
                                        <div>
                                            <BodyShort weight="semibold">Tildelt av:</BodyShort>
                                            {/*<BodyShort>
                                                {device.assignerDisplayname
                                                    ? device.assignerDisplayname
                                                    : device.assignerUsername}
                                            </BodyShort>*/}
                                        </div>
                                    }
                                >
                                    <Table.HeaderCell scope="row">{device.name}</Table.HeaderCell>
                                    <Table.DataCell>{device.organisationUnitName}</Table.DataCell>
                                    <Table.DataCell>{device.deviceType}</Table.DataCell>

                                    <Table.DataCell align={'center'}>
                                        <DeleteButton
                                            id={`deleteAssignment-${device.assignmentRef}`}
                                            url={`${getResourceDeleteDeviceGroupAssignmentUrl(Number(params.id), device.assignmentRef)}?page=${searchParams.get('page') === null ? 0 : searchParams.get('page')}&search=${searchParams.get('search') === null ? '' : searchParams.get('search')}`}
                                        />
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </VStack>

            {/*<TablePagination
                currentPage={props.assignedRoles.currentPage}
                totalPages={props.assignedRoles.totalPages}
                size={props.size}
                totalItems={props.assignedRoles.totalItems}
            />*/}
        </div>
    );
};
