import {Button, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {Form, useNavigate, useSearchParams} from "@remix-run/react";
import type {IRolePage} from "~/data/types";
import React from "react";
import {setSizeCookieClientSide} from "~/components/common/CommonFunctions";

interface RoleTableProps {
    rolePage: IRolePage
    size: string
}
export const RoleTable = ({ rolePage, size }: RoleTableProps) => {

    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams()

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <>
            <Table id={"role-table"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rolePage.roles.map((role) => (
                        <Table.Row key={role.id}>
                            <Table.DataCell scope="row">{role.roleName}</Table.DataCell>
                            <Table.DataCell>{role.organisationUnitName}</Table.DataCell>
                            <Table.DataCell>{role.roleType}</Table.DataCell>
                            <Table.DataCell align="right">
                                <Button
                                    id={`roleInfoButton-${role.id}`}
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/roles/${role.id}/members`)
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
                    defaultValue={size ? size : 25}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={rolePage.currentPage + 1} //Number(props.page) ? Number(props.page) : 1
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={rolePage.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};