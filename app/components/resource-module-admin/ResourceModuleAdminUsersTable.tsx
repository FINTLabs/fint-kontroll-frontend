import {Button, HStack, Link, Pagination, Select, Table} from "@navikt/ds-react";
import {Form, useNavigate, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import React from "react";
import {
    IResourceModuleAccessRole,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import ResourceModuleToolbar from "~/components/resource-module-admin/ResourceModuleToolbar";
import {IUnitItem} from "~/data/types";
import ChipsFilters from "~/components/common/ChipsFilters";
import {setSizeCookieClientSide} from "~/components/common/CommonFunctions";

interface ResourceModuleAdminUsersTableI {
    usersPage: IResourceModuleUsersPage
    orgUnitList: IUnitItem[]
    roles: IResourceModuleAccessRole[]
}

const ResourceModuleAdminUsersTable = ({usersPage, orgUnitList, roles}: ResourceModuleAdminUsersTableI) => {
    const navigate = useNavigate()

    const [params, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <div className={"table-toolbar-pagination-container"}>
            <HStack justify={"end"}>
                <Link href={"resource-module-admin/opprett-ny-tildeling"} id="create-assignment">
                    <PlusIcon/> Opprett ny tildeling
                </Link>
            </HStack>

            <ResourceModuleToolbar orgUnitList={orgUnitList} roles={roles} />

            <ChipsFilters />

            <Table className={"users-table"} id="users-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fullt navn</Table.HeaderCell>
                        <Table.HeaderCell>Epost</Table.HeaderCell>
                        <Table.HeaderCell align={"center"}>Administrer tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {usersPage.users.map((user: IResourceModuleUser, index) => {
                        return (
                            <Table.Row key={index + user.userName}>
                            <Table.DataCell>{user.firstName + " " + user.lastName}</Table.DataCell>
                            <Table.DataCell>{user.userName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                <Button variant={"secondary"} onClick={() => navigate(`administer/${user.resourceId}`)}>
                                    Administrer
                                </Button>
                            </Table.DataCell>
                        </Table.Row>)
                    })}
                </Table.Body>
            </Table>
            {usersPage.users.length > 0 &&
                <Form className={"pagination-wrapper"}>
                    <Select
                        label="Rader per side"
                        size="small"
                        onChange={handleChangeRowsPerPage}
                        defaultValue={params.get("size") ? Number(params.get("size")) : 25}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </Select>
                    <Pagination
                        id="pagination"
                        page={usersPage.currentPage + 1}
                        onPageChange={(e) => {
                            setSearchParams(searchParams => {
                                searchParams.set("page", (e - 1).toString());
                                return searchParams;
                            })
                        }}
                        count={usersPage.totalPages}
                        size="small"
                        prevNextTexts
                    />
                </Form>
            }
        </div>
    )
}

export default ResourceModuleAdminUsersTable