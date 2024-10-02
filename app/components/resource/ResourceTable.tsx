import {Button, Table} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import {useNavigate} from "@remix-run/react";
import type {IResourceList} from "~/data/types";
import React from "react";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";

interface ResourceTableProps {
    resourcePage: IResourceList
    size: string
}

export const ResourceTable = ({resourcePage, size}: ResourceTableProps) => {

    const navigate = useNavigate();
    const {fetching} = useLoadingState()

    return (
        <>
            <Table id="resources-table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">Se mer informasjon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton  columns={3}/> : resourcePage.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.DataCell scope="row">{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell align="center">
                                <Button
                                    icon={
                                        <InformationSquareIcon
                                            title="Informasjonsikon"
                                            fontSize="1.5rem"
                                        />
                                    }
                                    iconPosition={"right"}
                                    onClick={() =>
                                        navigate(`/resources/${resource.id}/user-assignments`)
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
            <TablePagination currentPage={resourcePage.currentPage} totalPages={resourcePage.totalPages} size={size}/>
        </>
    );
};