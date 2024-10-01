import {Pagination, Select, Table} from "@navikt/ds-react";
import {Form, useNavigation, useSearchParams} from "@remix-run/react";
import type {IMemberPage} from "~/data/types";
import React from "react";
import {isLoading, setSizeCookieClientSide} from "~/components/common/CommonFunctions";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";


interface MembersTableProps {
    memberPage: IMemberPage
    size: string
}

export const MemberTable = ({ memberPage, size }: MembersTableProps) => {

    const [, setSearchParams] = useSearchParams()
    const navigation = useNavigation()
    const loading = isLoading(navigation)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <>
            <Table id={"memberTable"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Brukertype</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? <TableSkeleton columns={2} height={30}/> : memberPage.members.map((member) => (
                        <Table.Row key={member.id}>
                            <Table.HeaderCell scope="row">{member.firstName} {member.lastName}</Table.HeaderCell>
                            <Table.DataCell>{member.userType}</Table.DataCell>
                            {/*<Table.DataCell align="right">
                                <Button
                                    id={`memberInfoButton-${member.id}`}
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/users/${member.id}`)
                                    }
                                    // id={`resource-${i}`}
                                    variant={"secondary"}
                                    role="link"
                                >
                                    Se info
                                </Button>
                            </Table.DataCell>*/}
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
                    defaultValue={size ? size : 25}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Select>
                <Pagination
                    id="pagination"
                    page={memberPage.currentPage + 1} //Number(props.page) ? Number(props.page) : 1
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={memberPage.totalPages}
                    size="small"
                    prevNextTexts
                />
            </Form>
        </>
    );
};