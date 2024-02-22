import {Button, Pagination, Select, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {Form, useNavigate, useSearchParams} from "@remix-run/react";
import type {IRolePage, IUserPage} from "~/data/types";
import React from "react";

export const RoleTable: any = (props: { rolePage: IRolePage, size: string, page: string }) => {

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
            <Table id={"roleTable"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Gruppe</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Gruppetype</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.rolePage.roles.map((role) => (
                        <Table.Row key={role.id}>
                            <Table.HeaderCell scope="row">{role.roleName}</Table.HeaderCell>
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
                    id={"selectNumberOfRows"}
                    style={{marginBottom: '1.5rem'}}
                    label="Rader per side"
                    size="small"
                    onChange={handleChangeRowsPerPage}
                    defaultValue={props.size ? props.size : 10}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={props.rolePage.currentPage + 1} //Number(props.page) ? Number(props.page) : 1
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.rolePage.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};