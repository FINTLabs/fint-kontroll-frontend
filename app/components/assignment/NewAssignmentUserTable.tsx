import {Button, Heading, Link, Table, Tag} from "@navikt/ds-react";
import type {IUserItem} from "~/data/types";
import React from "react";
import {Outlet, useNavigation, useSearchParams} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import {isLoading} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";


interface AssignUserTableProps {
    isAssignedUsers: IUserItem[]
    size: string
    resourceId: string
    totalPages: number
    currentPage: number
    basePath?: string
}
export const AssignUserTable = ({
    isAssignedUsers,
    size,
    resourceId,
    totalPages,
    currentPage,
    basePath,
}: AssignUserTableProps) => {
    const [searchParams] = useSearchParams()
    const navigation = useNavigation()
    const loading = isLoading(navigation)

    return (
        <div>
            <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>

            <Outlet/>

            <Table id="users-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"center"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? <TableSkeleton /> : isAssignedUsers.map((user: IUserItem) => (
                        <Table.Row key={user.id}>
                            <Table.DataCell scope="row">{user.fullName} </Table.DataCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"center"}>
                                {user.assigned ?

                                    <Tag variant="success" size="small" className="navds-tag-in-table">
                                        Er tildelt
                                    </Tag>
                                    :
                                    <Button
                                        as={Link}
                                        variant={"secondary"}
                                        icon={<PlusIcon/>}
                                        iconPosition="right"
                                        href={`${basePath}/assignment/resource/${resourceId}/user/${user.id}/orgunit/${user.organisationUnitId}/assign?page=${searchParams.get("page") === null ? 0 : searchParams.get("page")}&search=${searchParams.get("search") === null ? "" : searchParams.get("search")}`}
                                        underline={false}
                                    >
                                        Tildel
                                    </Button>

                                }
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <TablePagination currentPage={currentPage} totalPages={totalPages} size={size}/>
        </div>
    );
};