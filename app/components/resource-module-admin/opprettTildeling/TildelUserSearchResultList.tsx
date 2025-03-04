import { BodyShort, Button, Heading, HStack, List, Table, VStack } from '@navikt/ds-react';
import {
    IResourceModuleAssignment,
    IResourceModuleUser,
    IResourceModuleUsersPage,
} from '~/data/types/resourceTypes';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import React from 'react';
import { TablePagination } from '~/components/common/Table/TablePagination';

interface TildelUserSearchResultListProps {
    newAssignment: IResourceModuleAssignment;
    usersPage: IResourceModuleUsersPage;
    handleSelectUser: (newUser: IResourceModuleUser) => void;
    size?: string;
}

const TildelUserSearchResultList = ({
    newAssignment,
    usersPage,
    handleSelectUser,
    size,
}: TildelUserSearchResultListProps) => {
    return (
        <VStack id="user-search-list">
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
                    {usersPage.users?.map((user) => (
                        <Table.Row
                            key={user.userName}
                            selected={newAssignment.user?.resourceId === user.resourceId}>
                            <Table.HeaderCell>
                                {`${user.firstName} ${user.lastName}`}
                            </Table.HeaderCell>
                            <Table.DataCell>
                                {user.roles?.map((role) => role.roleName).join(', ')}
                            </Table.DataCell>
                            <Table.DataCell align={'right'}>
                                {newAssignment.user?.resourceId === user.resourceId ? (
                                    <Button
                                        className={'nowrap'}
                                        icon={<CheckmarkCircleIcon />}
                                        variant={'secondary'}
                                        onClick={() => handleSelectUser(user)}>
                                        Valgt
                                    </Button>
                                ) : (
                                    <Button
                                        className={'nowrap'}
                                        onClick={() => handleSelectUser(user)}>
                                        Velg bruker
                                    </Button>
                                )}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={usersPage.currentPage}
                totalPages={usersPage.totalPages}
                size={size}
            />
        </VStack>
    );
};

export default TildelUserSearchResultList;
