import {Button, Pagination, Select, Table} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {
    IResourceModuleAccessRole,
    IResourceModuleOrgUnitDetail,
    IResourceModuleUserAssignmentsPaginated
} from "~/data/resourceModuleAdmin/types";
import {TrashIcon} from "@navikt/aksel-icons";
import DeleteOrgUnitInAssignment from "~/components/resource-module-admin/administer/DeleteOrgUnitInAssignment";

interface RoleAssignmentTableProps {
    selectedRole: IResourceModuleAccessRole
    userAssignmentsPaginated: IResourceModuleUserAssignmentsPaginated
}

const RoleAssignmentTable = ({selectedRole, userAssignmentsPaginated}:RoleAssignmentTableProps) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [orgUnit, setOrgUnit] = useState<IResourceModuleOrgUnitDetail | undefined>()
    const [scopeId, setScopeId] = useState("")

    const [params, setSearchParams] = useSearchParams()

    const toggleDeleteOrgUnitModal = (scopeId: number, orgUnit: IResourceModuleOrgUnitDetail) => {
        setOrgUnit(orgUnit)
        setScopeId(String(scopeId))
        setIsDeleteModalOpen(true)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSearchParams(searchParams => {
            searchParams.set("size", event.target.value);
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div className={"table-toolbar-pagination-container"}>
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
                        <Table.HeaderCell>Orgenhet</Table.HeaderCell>
                        {selectedRole.accessRoleId === "" && <Table.HeaderCell>Rolle</Table.HeaderCell>}
                        <Table.HeaderCell align={"center"}>Slett</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userAssignmentsPaginated?.accessRoles.length !== 0 ? (
                        userAssignmentsPaginated?.accessRoles.map((scope) =>
                            scope.orgUnits.map((orgUnit) => (
                                <Table.Row
                                    key={
                                        scope.accessRoleId +
                                        "," +
                                        orgUnit.scopeId +
                                        "," +
                                        orgUnit.orgUnitId +
                                        orgUnit.name
                                    }
                                >
                                    <Table.DataCell>{orgUnit.objectType}</Table.DataCell>
                                    <Table.DataCell>{orgUnit.name}</Table.DataCell>
                                    {selectedRole.accessRoleId === "" && (
                                        <Table.DataCell>{scope.accessRoleId}</Table.DataCell>
                                    )}
                                    <Table.DataCell align={"center"}>
                                        <Button
                                            className={"button-secondary-danger"}
                                            variant={"secondary"}
                                            onClick={() => toggleDeleteOrgUnitModal(orgUnit.scopeId, orgUnit)}
                                            icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                                            iconPosition={"right"}
                                        >
                                            Slett
                                        </Button>
                                    </Table.DataCell>
                                </Table.Row>
                            ))
                        )
                    ) : (
                        <Table.Row>
                            <Table.DataCell align={"center"} colSpan={4}>
                                Det fins ingen objekter knyttet til denne rollen.
                            </Table.DataCell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            <Form className={"pagination-wrapper"}>
                <Select
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={params.get("size") ? Number(params.get("size")) : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={userAssignmentsPaginated.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={userAssignmentsPaginated.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </div>
    )
}

export default RoleAssignmentTable