import { BodyShort, Table } from '@navikt/ds-react';
import React from 'react';
import { IResource } from '~/data/types/resourceTypes';

export const ResourceLicenseTable = ({ resource }: { resource: IResource }) => {
    return (
        <Table size={'small'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col" style={{ color: 'var(--red-primary)' }}>
                        Tilgjengelig for org.enhet
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        scope="col"
                        align={'center'}
                        style={{ color: 'var(--red-primary)' }}>
                        Maks antall lisenser
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        scope="col"
                        align={'center'}
                        style={{ color: 'var(--red-primary)' }}>
                        Antall brukte lisenser
                    </Table.HeaderCell>
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
                        <Table.Row key={i} shadeOnHover={false}>
                            <Table.HeaderCell scope="row">
                                {resourceItem.orgUnitName}
                            </Table.HeaderCell>
                            <Table.DataCell align={'center'}>
                                <BodyShort textColor={'subtle'} style={{ wordBreak: 'break-word' }}>
                                    {resourceItem.resourceLimit}
                                </BodyShort>
                            </Table.DataCell>
                            <Table.DataCell align={'center'}>
                                <BodyShort textColor={'subtle'} style={{ wordBreak: 'break-word' }}>
                                    {resourceItem.assignedResources}{' '}
                                </BodyShort>
                            </Table.DataCell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );
};
