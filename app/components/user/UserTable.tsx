import {Button, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {Form, useNavigate, useSearchParams} from "@remix-run/react";
import {IUser, IUserPage} from "~/data/types";
import React from "react";

interface UserTableProps {
    userPage: IUserPage
    size: string
}

export const UserTable = ({userPage, size}: UserTableProps) => {

    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSearchParams(searchParams => {
            searchParams.set("size", event.target.value);
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <>
            <Table id={"user-table"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userPage.users.map((user: IUser) => (
                        <Table.Row key={user.id} id={`row-${user.fullName.replace(/\s+/g, '-')}`}>
                            <Table.DataCell>{user.fullName}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell align="right">
                                <Button
                                    id={`userInfoButton-${user.id}`}
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/users/${user.id}`)
                                    }
                                    // id={`resource-${i}`}
                                    variant={"secondary"}
                                    role="link"
                                >
                                    Se info
                                </Button>
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Form className={"paginationWrapper"}>
                <Select
                    id={"select-number-of-rows"}
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={size ? size : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={userPage.currentPage + 1} //Number(props.page) ? Number(props.page) : 1
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={userPage.totalPages || 1}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};