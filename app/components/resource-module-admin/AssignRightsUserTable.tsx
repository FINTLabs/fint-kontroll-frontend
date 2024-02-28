import { Button, Loader, Pagination, Select, Table } from "@navikt/ds-react"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useUser } from "../../api/UserContext"
import { useSafeTabChange } from "../../api/SafeTabChangeContext"
import ExistingAssignmentModal from "./ExistingAssignmentModal"
import { useGeneral } from "../../api/GeneralContext"
import { useAssignments } from "../../api/AssignmentContext"
import { useLocation } from "react-router-dom"
import {IAssignment, IUser, IUserPage} from "~/data/types";
import {Form, useSearchParams} from "@remix-run/react";


interface AssignRightsUserTableProps {
    setNewAssignment: (updatedAssignment: IAssignment | null) => void
    newAssignment: IAssignment | null
    usersPage: IUserPage
}

const AssignRightsUserTable = ({setNewAssignment, newAssignment}: AssignRightsUserTableProps) => {
    const { basePath } = useGeneral()
    const { setIsTabModified } = useSafeTabChange()

    const location = useLocation()
    // const searchParams = new URLSearchParams(location.search)
    const [, setSearchParams] = useSearchParams()
    const page = searchParams.get("page")

    const {
        currentPage,
        itemsPerPage,
        isLoading,
        orgUnitIds,
        getUsersPage,
        setCurrentPage,
        setItemsPerPage,
        searchString,
        roleFilter,
    } = useUser()
    const { userDetailsPage, getUserOrgUnitsNoPagination } = useAssignments()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [roleDataForModal, setRoleDataForModal] = useState<IUser | undefined>()

    useEffect(() => {
        if (page) {
            setCurrentPage(Number(page))
        } else {
            setCurrentPage(1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getUsersPage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basePath, currentPage, itemsPerPage, searchString, orgUnitIds, roleFilter])

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10))
        setCurrentPage(1)
    }

    const handleSelectUser = (user: IUser) => {
        setNewAssignment({ ...newAssignment, user: user })
        setHasChanges(true)
        setIsTabModified(true)
        setUser(user)
    }

    const getExistingRoleData = (user: IUser) => {
        setIsModalOpen(true)
        if (user.roles) {
            setRoleDataForModal(user)
        }
        setRoleDataForModal(user)
        getUserOrgUnitsNoPagination(user.resourceId)
    }

    return (
        <>
            <ExistingAssignmentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                userDetailsPage={userDetailsPage ? userDetailsPage : null}
                userFullName={
                    roleDataForModal?.firstName ? roleDataForModal?.firstName + roleDataForModal?.lastName : ""
                }
            />
            <Table id={"rettigheter-table-delegation"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Navn</Table.HeaderCell>
                        <Table.HeaderCell align={"center"}>Rolletildeling</Table.HeaderCell>
                        <Table.HeaderCell align={"center"}>Velg bruker</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {usersPage?.users.map((user, index) => (
                        <Table.Row key={index} selected={newAssignment.user?.id === user.id}>
                            <Table.DataCell>{user.firstName + " " + user.lastName}</Table.DataCell>
                            {user.roles?.length === 0 ? (
                                <Table.DataCell align={"center"}>Ingen eksisterende tildeling</Table.DataCell>
                            ) : (
                                <Table.DataCell align={"center"}>
                                    <Button onClick={() => getExistingRoleData(user)}>Se tildelingsinformasjon</Button>
                                </Table.DataCell>
                            )}
                            <Table.DataCell align={"center"}>
                                {newAssignment && newAssignment.user?.id === user.resourceId ? (
                                    <Button onClick={() => handleSelectUser(user)}>Valgt</Button>
                                ) : (
                                    <Button variant={"secondary"} onClick={() => handleSelectUser(user)}>
                                        Ikke valgt
                                    </Button>
                                )}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Form class={"paginationWrapper"}>
                    <Select
                        label="Rader per side"
                        size="small"
                        onChange={handleChangeRowsPerPage}
                        defaultValue={itemsPerPage}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </Select>
                    <Pagination
                        id="pagination"
                        page={currentPage ? currentPage : 1}
                        onPageChange={(e) => {
                            setSearchParams(searchParams => {
                                searchParams.set("page", (e - 1).toString());
                                return searchParams;
                            })
                        }}
                        count={Math.ceil((usersPage ? usersPage.totalItems : 1) / itemsPerPage)}
                        size="small"
                    />
            </Form>
        </>
    )
}

export default AssignRightsUserTable
