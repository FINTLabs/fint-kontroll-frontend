import { HelpText, HStack, Table, Tag } from '@navikt/ds-react';
import type { IRoleList } from '~/data/types/userTypes';
import React from 'react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { GoToButton } from '~/components/common/Table/buttons/GoToButton';
import { getRoleMembersUrl } from '~/data/paths';
import { useLoaderData } from 'react-router';
import { loader } from '~/routes/grupper._index';

import { translateUserTypeToLabel } from '~/utils/translators';

interface RoleTableProps {
    rolePage: IRoleList;
    size: string;
}

export const RoleTable = ({ rolePage, size }: RoleTableProps) => {
    const { userTypesKodeverk } = useLoaderData<typeof loader>();
    const { fetching } = useLoadingState();

    return (
        <>
            <Table id={'role-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Til test</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton />
                    ) : (
                        rolePage.roles.map((role) => (
                            <Table.Row key={role.id}>
                                <Table.DataCell>{role.roleName}</Table.DataCell>
                                <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                                <Table.DataCell>
                                    {translateUserTypeToLabel(role.roleType, userTypesKodeverk)}
                                </Table.DataCell>
                                {role.aggregatedRole ? (
                                    <Table.DataCell>
                                        <Tag
                                            id="aggregated-tag"
                                            variant="neutral"
                                            size="small"
                                            className="navds-tag-in-table">
                                            <HStack gap={'1'} align={'center'} wrap={false}>
                                                Aggregert
                                                <HelpText title="Hvorfor kan ikke tildelingen slettes?">
                                                    Denne gruppen inneholder alle ansatte i denne
                                                    enheten og alle underliggende enheter.
                                                </HelpText>
                                            </HStack>
                                        </Tag>
                                    </Table.DataCell>
                                ) : (
                                    <Table.DataCell>{null}</Table.DataCell>
                                )}
                                <Table.DataCell align="right">
                                    <GoToButton
                                        id={`roleInfoButton-${role.id}`}
                                        url={getRoleMembersUrl(role.id)}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>

            <TablePagination
                currentPage={rolePage.currentPage}
                totalPages={rolePage.totalPages}
                size={size}
                totalItems={rolePage.totalItems}
            />
        </>
    );
};
