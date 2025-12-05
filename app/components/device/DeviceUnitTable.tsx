import { Table } from '@navikt/ds-react';
import { IUserItem } from '~/data/types/userTypes';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { GoToButton } from '~/components/common/Table/buttons/GoToButton';
import { useLoaderData } from 'react-router';
import { loader } from '~/routes/brukere._index';
import { getDeviceGroupByIdUrl, getUserByIdUrl } from '~/data/paths';
import { translateUserTypeToLabel } from '~/utils/translators';

export const DeviceUnitTable = () => {
    return (
        <>
            <Table id={'device-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">systemId</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Plattform</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {/* <TableSkeleton />*/}
                    <Table.Row>
                        <Table.DataCell>VGMIDT Utlånspc-er</Table.DataCell>
                        <Table.DataCell>12_103</Table.DataCell>
                        <Table.DataCell>MAC OS</Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    );
};
