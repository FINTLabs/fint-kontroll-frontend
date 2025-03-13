import { BodyShort, Table } from '@navikt/ds-react';
import React from 'react';
import { IResource } from '~/data/types/resourceTypes';

export const ResourceLicenseTable = ({ resource }: { resource: IResource }) => {
    return (
        <>
            <Table size={'small'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col" style={{ color: 'var(--red-primary)' }}>
                            Lisenser tilgjengelig
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
                            <Table.Row key={i} shadeOnHover={false}>
                                <Table.HeaderCell
                                    scope="row"
                                    style={{ color: 'var(--red-primary)' }}>
                                    {resourceItem.orgUnitName}
                                </Table.HeaderCell>
                                <Table.DataCell align={'center'}>
                                    <BodyShort
                                        textColor={'subtle'}
                                        style={{ wordBreak: 'break-word' }}>
                                        {resourceItem.resourceLimit}
                                    </BodyShort>
                                </Table.DataCell>
                                <Table.DataCell align={'center'}>
                                    <BodyShort
                                        textColor={'subtle'}
                                        style={{ wordBreak: 'break-word' }}>
                                        {resourceItem.assignedResources}{' '}
                                    </BodyShort>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
            {/*            <>
                <Heading size="small" level="3" style={{ color: 'var(--red-primary)' }}>
                    Lisenser tilgjengelig
                </Heading>
                {resource.validForOrgUnits
                    .sort((a, b) => b.resourceLimit - a.resourceLimit)
                    .map((resourceItem, i) => (
                        <HStack key={1} align={'center'} gap={'4'}>
                            <Heading
                                size="xsmall"
                                level="4"
                                style={{ color: 'var(--red-primary)' }}>
                                {resourceItem.orgUnitName}
                            </Heading>
                            <BodyShort textColor={'subtle'} style={{ wordBreak: 'break-word' }}>
                                {resourceItem.assignedResources
                                    ? `${resourceItem.assignedResources}/${resourceItem.resourceLimit} lisenser`
                                    : `${resourceItem.resourceLimit} lisenser`}
                            </BodyShort>
                        </HStack>
                    ))}
            </>*/}
        </>
    );
};
