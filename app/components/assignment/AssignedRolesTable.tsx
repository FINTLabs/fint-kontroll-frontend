import { BodyShort, Table, VStack } from '@navikt/ds-react';
import type { IAssignedRoles } from '~/data/types/userTypes';
import React from 'react';
import { Outlet, useLoaderData, useParams, useSearchParams } from '@remix-run/react';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { getResourceDeleteRoleAssignmentUrl } from '~/data/paths';
import { loader } from '~/routes/ressurser.$id.gruppe-tildelinger';
import { TertiaryDeleteButton } from '~/components/common/Buttons/TertiaryDeleteButton';
import { translateUserTypeToLabel } from '~/utils/translators';

export const AssignedRolesTable: any = (props: {
    assignedRoles: IAssignedRoles;
    size: string;
    page: string;
    search: string;
    basePath?: string;
}) => {
    const { userTypesKodeverk } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const params = useParams();
    const { fetching } = useLoadingState();

    return (
        <div>
            <VStack gap="8">
                <Outlet />

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align={'center'}>
                                Fjern tildeling
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {fetching ? (
                            <TableSkeleton />
                        ) : (
                            props.assignedRoles.roles.map((role) => (
                                <Table.ExpandableRow
                                    key={role.id}
                                    content={
                                        <div>
                                            <BodyShort weight="semibold">Tildelt av:</BodyShort>
                                            <BodyShort>
                                                {role.assignerDisplayname
                                                    ? role.assignerDisplayname
                                                    : role.assignerUsername}
                                            </BodyShort>
                                        </div>
                                    }>
                                    <Table.HeaderCell scope="row">{role.roleName}</Table.HeaderCell>
                                    <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                                    <Table.DataCell>
                                        {translateUserTypeToLabel(role.roleType, userTypesKodeverk)}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        <TertiaryDeleteButton
                                            id={`deleteAssignment-${role.assignmentRef}`}
                                            url={`${props.basePath}${getResourceDeleteRoleAssignmentUrl(Number(params.id), role.assignmentRef)}?page=${searchParams.get('page') === null ? 0 : searchParams.get('page')}&search=${searchParams.get('search') === null ? '' : searchParams.get('search')}`}
                                        />
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            ))
                        )}
                    </Table.Body>
                </Table>
            </VStack>

            <TablePagination
                currentPage={props.assignedRoles.currentPage}
                totalPages={props.assignedRoles.totalPages}
                size={props.size}
            />
        </div>
    );
};
