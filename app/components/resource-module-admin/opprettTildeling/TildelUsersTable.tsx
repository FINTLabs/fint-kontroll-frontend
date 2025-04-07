import { BodyShort, Button, Table, VStack } from '@navikt/ds-react';
import {
    IResourceModuleAssignment,
    IResourceModuleUser,
    IResourceModuleUsersPage,
} from '~/data/types/resourceTypes';
import { XMarkIcon } from '@navikt/aksel-icons';
import React from 'react';
import { TablePagination } from '~/components/common/Table/TablePagination';
import TildelingToolbar from '~/components/resource-module-admin/opprettTildeling/TildelingToolbar';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { IAccessRole } from '~/data/types/userTypes';

interface TildelUserSearchResultListProps {
    newAssignment: IResourceModuleAssignment;
    usersPage: IResourceModuleUsersPage;
    handleSelectUser: (newUser: IResourceModuleUser) => void;
    size?: string;
    allOrgUnits: IUnitItem[];
    accessRoles: IAccessRole[];
}

const TildelUsersTable = ({
    newAssignment,
    usersPage,
    handleSelectUser,
    size,
    allOrgUnits,
    accessRoles,
}: TildelUserSearchResultListProps) => {
    return (
        <VStack id="user-search-list">
            {!newAssignment.user && (
                <TildelingToolbar allOrgUnits={allOrgUnits} accessRoles={accessRoles} />
            )}
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Roller</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {usersPage.totalItems === 0 && (
                        <BodyShort>Ingen resultater i listen...</BodyShort>
                    )}
                    {!newAssignment.user?.resourceId &&
                        usersPage.users?.map((user) => (
                            <Table.Row
                                key={user.resourceId}
                                selected={newAssignment.user?.resourceId === user.resourceId}
                                onClick={() => handleSelectUser(user)}>
                                <Table.HeaderCell>
                                    {`${user.firstName} ${user.lastName}`}
                                </Table.HeaderCell>
                                <Table.DataCell>
                                    {user.roles?.map((role) => role.roleName).join(', ')}
                                </Table.DataCell>
                                <Table.DataCell align={'right'}>
                                    <Button
                                        size={'small'}
                                        className={'nowrap'}
                                        variant={'secondary'}
                                        onClick={() => handleSelectUser(user)}>
                                        Velg bruker
                                    </Button>
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    {!!newAssignment.user && (
                        <Table.Row
                            key={newAssignment.user.userName}
                            onClick={() =>
                                newAssignment.user && handleSelectUser(newAssignment.user)
                            }>
                            <Table.HeaderCell>
                                {`${newAssignment.user.firstName} ${newAssignment.user.lastName}`}
                            </Table.HeaderCell>
                            <Table.DataCell>
                                {newAssignment.user.roles?.map((role) => role.roleName).join(', ')}
                            </Table.DataCell>
                            <Table.DataCell align={'right'}>
                                <Button
                                    className={'nowrap'}
                                    size={'small'}
                                    icon={<XMarkIcon />}
                                    variant={'tertiary-neutral'}
                                    onClick={() =>
                                        newAssignment.user && handleSelectUser(newAssignment.user)
                                    }>
                                    Angre
                                </Button>
                            </Table.DataCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            {!newAssignment.user?.resourceId && (
                <TablePagination
                    currentPage={usersPage.currentPage}
                    totalPages={usersPage.totalPages}
                    size={size}
                />
            )}
        </VStack>
    );
};

export default TildelUsersTable;
