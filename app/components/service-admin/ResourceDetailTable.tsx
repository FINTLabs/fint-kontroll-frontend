import { Table } from '@navikt/ds-react';
import React from 'react';
import { IResource } from '~/data/types/resourceTypes';

export const ResourceDetailTable = ({ resource }: { resource: IResource }) => {
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Ressursgrense
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Tildelinger
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resource.validForOrgUnits.map((resourceItem, i) => (
                        <Table.Row key={i}>
                            <Table.HeaderCell scope="row">
                                {resourceItem.orgUnitName}
                            </Table.HeaderCell>
                            <Table.DataCell align={'center'}>
                                {resourceItem.resourceLimit}
                            </Table.DataCell>
                            <Table.DataCell align={'center'}>
                                {resourceItem.assignedResources}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};
