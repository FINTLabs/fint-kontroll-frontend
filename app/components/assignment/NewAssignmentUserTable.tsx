import {BodyShort, Box, Button, Heading, Pagination, Select, Table} from "@navikt/ds-react";
import type {IUser} from "~/data/types";
import React from "react";
import {useSearchParams} from "@remix-run/react";
import {CheckmarkIcon, PlusIcon} from "@navikt/aksel-icons";

export const AssignUserTable: any = (props: {
    isAssignedUsers: IUser[],
    size: string,
    page: string,
    resourceId: string,
    totalPages: number,
    currentPage: number
}) => {

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
            <Heading className={"heading"} size={"large"} level={"3"}>Brukere</Heading>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Orgenhet</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align={"right"}>Tildelinger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.isAssignedUsers.map((user: IUser) => (
                        <Table.Row key={user.id}>
                            <Table.HeaderCell scope="row">{user.fullName} </Table.HeaderCell>
                            <Table.DataCell>{user.userType}</Table.DataCell>
                            <Table.DataCell>{user.organisationUnitName}</Table.DataCell>
                            <Table.DataCell align={"right"}>
                                {user.assigned ?
                                    <BodyShort>Er tildelt <CheckmarkIcon title="a11y-title"
                                                                         fontSize="1.5rem"/></BodyShort>
                                    :
                                    <Button
                                        variant={"secondary"}
                                        onClick={() => {
                                        }}
                                        icon={<PlusIcon title="a11y-title" fontSize="1.5rem"/>}
                                        iconPosition={"right"}
                                    >
                                        Tildel
                                    </Button>
                                }
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Box className={"paginationWrapper"}>
                <Select
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
                    page={props.currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={props.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Box>
        </>
    );
};