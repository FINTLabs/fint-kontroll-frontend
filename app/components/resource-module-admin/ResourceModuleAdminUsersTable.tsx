import {Button, HStack, Link, Table} from "@navikt/ds-react";
import {useNavigate} from "@remix-run/react";
import {PlusIcon} from "@navikt/aksel-icons";
import React from "react";

export default () => {
    const navigate = useNavigate()

    return (
        <>
            <HStack justify={"end"}>
                <Link href={"resource-module-admin/opprett-ny-tildeling"}>
                    <PlusIcon/> Opprett ny tildeling
                </Link>
            </HStack>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fult navn</Table.HeaderCell>
                        <Table.HeaderCell>Epost</Table.HeaderCell>
                        <Table.HeaderCell align={"center"}>Administrer tildeling</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.DataCell>fylldata</Table.DataCell>
                        <Table.DataCell>fylldata</Table.DataCell>
                        <Table.DataCell align={"center"}><Button variant={"secondary"} onClick={() => navigate(`administer/${1}`)}>Administrer</Button></Table.DataCell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    )
}