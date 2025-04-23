import { Table } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useSearchParams } from '@remix-run/react';
import {
    IResourceModuleOrgUnitDetail,
    IResourceModuleUserAssignmentsPaginated,
} from '~/data/types/resourceTypes';
import DeleteOrgUnitInAssignment from '~/components/resource-module-admin/administer/DeleteOrgUnitInAssignment';
import { TableSkeleton } from '~/components/common/Table/TableSkeleton';
import { TablePagination } from '~/components/common/Table/TablePagination';
import { useLoadingState } from '~/utils/customHooks';
import { IAccessRole } from '~/data/types/userTypes';

interface RoleAssignmentTableProps {
    selectedRole: IAccessRole;
    userAssignmentsPaginated: IResourceModuleUserAssignmentsPaginated;
}

const RoleAssignmentTable = ({
    selectedRole,
    userAssignmentsPaginated,
}: RoleAssignmentTableProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orgUnit, setOrgUnit] = useState<IResourceModuleOrgUnitDetail | undefined>();
    const [scopeId, setScopeId] = useState('');
    const { fetching } = useLoadingState();
    const [params] = useSearchParams();

    const toggleDeleteOrgUnitModal = (scopeId: number, orgUnit: IResourceModuleOrgUnitDetail) => {
        setOrgUnit(orgUnit);
        setScopeId(String(scopeId));
        setIsDeleteModalOpen(true);
    };

    return (
        <div className={'table-toolbar-pagination-container'}>
            {isDeleteModalOpen && orgUnit && (
                <DeleteOrgUnitInAssignment
                    modalOpenProp={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    roleToDeleteFrom={selectedRole.name}
                    scopeId={scopeId}
                    orgUnitToDelete={orgUnit}
                />
            )}

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Objekttype</Table.HeaderCell>
                        <Table.HeaderCell>Org.enhet</Table.HeaderCell>
                        <Table.HeaderCell>Rolle</Table.HeaderCell>
                        {/* REMOVED UNTIL NEW TABLE ROWS ARE IMPLEMENTED CORRECTLY */}
                        {/*<Table.HeaderCell align={"center"}>Slett</Table.HeaderCell>*/}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? (
                        <TableSkeleton
                            columns={selectedRole.accessRoleId === '' ? 3 : 2}
                            height={30}
                        />
                    ) : userAssignmentsPaginated?.accessRoles.length !== 0 ? (
                        userAssignmentsPaginated?.accessRoles.map((scope) =>
                            scope.orgUnits.map((orgUnit) => (
                                <Table.Row
                                    key={
                                        scope.accessRoleId +
                                        ',' +
                                        orgUnit.scopeId +
                                        ',' +
                                        orgUnit.orgUnitId +
                                        orgUnit.name
                                    }>
                                    <Table.DataCell>{orgUnit.objectType}</Table.DataCell>
                                    <Table.DataCell>{orgUnit.name}</Table.DataCell>
                                    <Table.DataCell>{scope.accessRoleName}</Table.DataCell>
                                    {/* REMOVED UNTIL NEW TABLE ROWS ARE IMPLEMENTED CORRECTLY */}
                                    {/*<Table.DataCell align={"center"}>*/}
                                    {/*<Button*/}
                                    {/*    className={"button-secondary-danger"}*/}
                                    {/*    variant={"secondary"}*/}
                                    {/*    onClick={() => toggleDeleteOrgUnitModal(orgUnit.scopeId, orgUnit)}*/}
                                    {/*    icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}*/}
                                    {/*    iconPosition={"right"}*/}
                                    {/*>*/}
                                    {/*    Slett*/}
                                    {/*</Button>*/}
                                    {/*</Table.DataCell>*/}
                                </Table.Row>
                            ))
                        )
                    ) : (
                        <Table.Row>
                            <Table.DataCell align={'center'} colSpan={4}>
                                Det finnes ingen objekter knyttet til denne rollen.
                            </Table.DataCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            {userAssignmentsPaginated?.accessRoles.length > 0 && (
                <TablePagination
                    currentPage={userAssignmentsPaginated.currentPage}
                    totalPages={userAssignmentsPaginated.totalPages}
                    size={Number(params.get('size')) ?? 10}
                />
            )}
        </div>
    );
};

export default RoleAssignmentTable;
