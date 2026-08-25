import { Heading, HelpText, HStack, Table, Tag } from '@navikt/ds-react';
import type { IRole } from '~/data/types/userTypes';
import React from 'react';
import { Outlet, useLoaderData, useSearchParams } from 'react-router';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import {
    getResourceConfirmDeviceGroupAssignmentUrl,
    getResourceConfirmRoleAssignmentUrl,
} from '~/data/paths';
import { loader } from '~/routes/ressurs.$id.ny-tildeling.brukere';

import { translateUserTypeToLabel } from '~/utils/translators';
import { AssignButton } from '~/components/common/Table/buttons/AssignButton';
import { IDeviceGroup } from '~/data/types/deviceTypes';

interface AssignDeviceGroupTableProps {
    isAssignedDeviceGroup: IDeviceGroup[];
    size: number;
    resourceId: string | undefined;
    totalPages?: number;
    currentPage: number;
    totalItems: number;
}

export const AssignDeviceGroupTable = (props: AssignDeviceGroupTableProps) => {
    const [searchParams] = useSearchParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <Heading className={'heading'} size={'large'} level={'3'}>
                Maskingrupper
            </Heading>
            <Outlet />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Maskingruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhetstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Tildelinger
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton />
                    ) : (
                        props.isAssignedDeviceGroup.map((deviceGroup: IDeviceGroup) => (
                            <Table.Row key={deviceGroup.id}>
                                <Table.HeaderCell scope="row">{deviceGroup.name} </Table.HeaderCell>
                                <Table.DataCell>{deviceGroup.organisationUnitName}</Table.DataCell>
                                <Table.DataCell>{deviceGroup.deviceType}</Table.DataCell>

                                <Table.DataCell align={'center'}>
                                    {deviceGroup.assigned ? (
                                        <Tag
                                            variant="success"
                                            size="small"
                                            className="navds-tag-in-table"
                                        >
                                            Er tildelt
                                        </Tag>
                                    ) : (
                                        <AssignButton
                                            id={`assignRole-${deviceGroup.id}`}
                                            url={`${getResourceConfirmDeviceGroupAssignmentUrl(Number(props.resourceId), deviceGroup.id, deviceGroup.orgUnitId)}?page=${searchParams.get('page') === null ? 0 : searchParams.get('page')}&search=${searchParams.get('search') === null ? '' : searchParams.get('search')}`}
                                        />
                                    )}
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={props.currentPage}
                totalPages={props.totalPages}
                size={props.size}
                totalItems={props.totalItems}
            />
        </div>
    );
};
