import { Heading, Table, Tag } from '@navikt/ds-react';
import type { IRole } from '~/data/types/userTypes';
import React from 'react';
import { Outlet, useLoaderData, useSearchParams } from 'react-router';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { getResourceConfirmRoleAssignmentUrl } from '~/data/paths';
import { loader } from '~/routes/ressurs.$id.ny-tildeling.brukere';

import { translateUserTypeToLabel } from '~/utils/translators';
import { AssignButton } from '~/components/common/Table/buttons/AssignButton';

interface AssignRoleTableProps {
    isAssignedRoles: IRole[];
    size: number;
    resourceId: string | undefined;
    totalPages?: number;
    currentPage: number;
    totalItems: number;
}

export const AssignRoleTable = (props: AssignRoleTableProps) => {
    const { userTypesKodeverk } = useLoaderData<typeof loader>();

    const [searchParams] = useSearchParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <Heading className={'heading'} size={'large'} level={'3'}>
                Grupper
            </Heading>
            <Outlet />
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={'center'}>
                            Tildelinger
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton />
                    ) : (
                        props.isAssignedRoles.map((role: IRole) => (
                            <Table.Row key={role.id}>
                                <Table.HeaderCell scope="row">{role.roleName} </Table.HeaderCell>
                                <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                                <Table.DataCell>
                                    {translateUserTypeToLabel(role.roleType, userTypesKodeverk)}
                                </Table.DataCell>
                                <Table.DataCell align={'center'}>
                                    {role.assigned ? (
                                        <Tag
                                            variant="success"
                                            size="small"
                                            className="navds-tag-in-table">
                                            Er tildelt
                                        </Tag>
                                    ) : (
                                        <AssignButton
                                            id={`assignRole-${role.id}`}
                                            url={`${getResourceConfirmRoleAssignmentUrl(Number(props.resourceId), role.id, role.organisationUnitId)}?page=${searchParams.get('page') === null ? 0 : searchParams.get('page')}&search=${searchParams.get('search') === null ? '' : searchParams.get('search')}`}
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
