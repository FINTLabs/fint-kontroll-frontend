import { Table } from '@navikt/ds-react';
import React from 'react';
import { IResource } from '~/data/types/resourceTypes';

export const ResourceDetailTable = ({ resource }: { resource: IResource }) => {
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Org.enhet</Table.HeaderCell>
                        {resource.licenseEnforcement === 'HARDSTOP' && (
                            <Table.HeaderCell scope="col" align={'center'}>
                                Maks antall lisenser
                            </Table.HeaderCell>
                        )}
                        {resource.assignedResources != null && (
                            <Table.HeaderCell scope="col" align={'center'}>
                                Antall brukte lisenser
                            </Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resource.validForOrgUnits
                        .sort((a, b) => {
                            if (a.orgUnitName === resource.resourceOwnerOrgUnitName) return -1;
                            if (b.orgUnitName === resource.resourceOwnerOrgUnitName) return 1;
                            const limitA = a.resourceLimit ?? 0;
                            const limitB = b.resourceLimit ?? 0;
                            return limitB - limitA;
                        })
                        .map((resourceItem, i) => (
                            <Table.Row key={i}>
                                <Table.HeaderCell scope="row">
                                    {resourceItem.orgUnitName}
                                </Table.HeaderCell>
                                {resource.licenseEnforcement === 'HARDSTOP' && (
                                    <Table.DataCell align={'center'}>
                                        {resourceItem.resourceLimit != null
                                            ? resourceItem.resourceLimit.toLocaleString()
                                            : 0}
                                    </Table.DataCell>
                                )}
                                {resource.assignedResources != null && (
                                    <Table.DataCell align={'center'}>
                                        {resourceItem.assignedResources != null
                                            ? resourceItem.assignedResources.toLocaleString()
                                            : ''}
                                    </Table.DataCell>
                                )}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </>
    );
};
