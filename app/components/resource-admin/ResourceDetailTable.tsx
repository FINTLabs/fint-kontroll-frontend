import {Table} from "@navikt/ds-react";
import {IResource} from "~/data/types";
import React from "react";

export const ResourceDetailTable = (props: { resource: IResource }) => {

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Enhetsnavn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Enhets Id</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressursgrense</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.resource.validForOrgUnits.map((resourceItem, i) => (
                        <Table.Row key={i}>
                            <Table.HeaderCell scope="row">{resourceItem.orgUnitName}</Table.HeaderCell>
                            <Table.DataCell>{resourceItem.orgunitId}</Table.DataCell>
                            <Table.DataCell>{resourceItem.resourceLimit}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};