import {Button, Dropdown, HStack, Link, Table} from "@navikt/ds-react";
import {FunnelIcon, MinusIcon, TrashIcon} from "@navikt/aksel-icons";
import {Outlet, useSearchParams} from "@remix-run/react";
import type {IResourceAdminList} from "~/data/types";
import React from "react";
import {prepareQueryParams} from "~/components/common/CommonFunctions";
import {StatusTag} from "~/components/resource-admin/StatusTag";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";
import {useLoadingState} from "~/components/common/customHooks";
import {TertiaryArrowButton} from "~/components/common/Buttons/TertiaryArrowButton";
import {boolean} from "property-information/lib/util/types";

interface ResourceTableProps {
    resourcePage: IResourceAdminList,
    size: string,
    basePath?: string
    source?: string
}

export const ResourceAdminTable = ({resourcePage, size, basePath, source}: ResourceTableProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const {fetching} = useLoadingState()

    const setStatusFilter = (event: string) => {
        setSearchParams(searchParams => {
            if (event) {
                searchParams.set("status", event);
            } else {
                searchParams.delete("status");
            }
            return searchParams;
        });
    };

    return (
        <>
            <Outlet/>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Applikasjonskategori</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="left">
                            <Dropdown>
                                <HStack align={"center"}>
                                    Status
                                    <Button
                                        as={Dropdown.Toggle}
                                        icon={<FunnelIcon title="Filter" fontSize="1.4rem"/>}
                                        size="small"
                                        variant="tertiary"
                                    />
                                </HStack>
                                <Dropdown.Menu>
                                    <Dropdown.Menu.GroupedList>
                                        <Dropdown.Menu.GroupedList.Item onClick={(e) => setStatusFilter("")}>
                                            Alle
                                        </Dropdown.Menu.GroupedList.Item>

                                        <Dropdown.Menu.GroupedList.Item onClick={(e) => setStatusFilter("ACTIVE")}>
                                            Aktiv
                                        </Dropdown.Menu.GroupedList.Item>
                                        <Dropdown.Menu.GroupedList.Item onClick={(e) => setStatusFilter("DISABLED")}>
                                            Deaktivert
                                        </Dropdown.Menu.GroupedList.Item>
                                        <Dropdown.Menu.GroupedList.Item onClick={(e) => setStatusFilter("DELETED")}>
                                            Slettet
                                        </Dropdown.Menu.GroupedList.Item>
                                    </Dropdown.Menu.GroupedList>
                                </Dropdown.Menu>
                            </Dropdown></Table.HeaderCell>
                        {source === "gui" &&
                            <Table.HeaderCell align={"center"} scope="col">Slett</Table.HeaderCell>
                        }
                        <Table.HeaderCell scope="col" align="right">Se mer informasjon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fetching ? <TableSkeleton columns={5}/> : resourcePage.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.DataCell>{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>{resource.applicationCategory?.filter(Boolean).join(', ')}</Table.DataCell>
                            <Table.DataCell>{<StatusTag status={resource.status}/>}</Table.DataCell>
                            {source === "gui" && (
                                <Table.DataCell align={"center"}>
                                    {resource.status === "DELETED" ?
                                        <MinusIcon title="a11y-title" fontSize="1.5rem"/>
                                        :
                                        <Button
                                            as={Link}
                                            className="delete-icon-button"
                                            variant={"tertiary"}
                                            icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                            href={`${basePath}/resource-admin/delete/resource/${resource.id}${prepareQueryParams(searchParams)}`}

                                        />
                                    }
                                </Table.DataCell>
                            )}
                            <Table.DataCell align="right">
                                <TertiaryArrowButton
                                    id={`resourceAdminInfoButton-${resource.id}`}
                                    url={`/resource-admin/${resource.id}`}
                                />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <TablePagination
                currentPage={resourcePage.currentPage}
                totalPages={resourcePage.totalPages}
                size={size ?? 10}
            />
        </>
    );
};