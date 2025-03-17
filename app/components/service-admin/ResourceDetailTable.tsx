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
                            Maks lisenser
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Tildelte lisenser
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resource.validForOrgUnits
                        .sort((a, b) => {
                            if (a.orgUnitName === resource.resourceOwnerOrgUnitName) return -1;
                            if (b.orgUnitName === resource.resourceOwnerOrgUnitName) return 1;
                            return b.resourceLimit - a.resourceLimit;
                        })
                        .map((resourceItem, i) => (
                            <Table.Row key={i}>
                                <Table.HeaderCell scope="row">
                                    {resourceItem.orgUnitName}
                                </Table.HeaderCell>
                                <Table.DataCell align={'center'}>
                                    {resourceItem.resourceLimit.toLocaleString()}
                                </Table.DataCell>
                                <Table.DataCell align={'center'}>
                                    {resourceItem.assignedResources?.toLocaleString()}
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    );
};
