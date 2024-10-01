import {Button, Dropdown, HStack, Link, Table} from "@navikt/ds-react";
import {FunnelIcon, InformationSquareIcon, MinusIcon, TrashIcon} from "@navikt/aksel-icons";
import {Outlet, useNavigate, useNavigation, useSearchParams} from "@remix-run/react";
import type {IResourceAdminList} from "~/data/types";
import React from "react";
import {isLoading, prepareQueryParams} from "~/components/common/CommonFunctions";
import {StatusTag} from "~/components/resource-admin/StatusTag";
import {TableSkeleton} from "~/components/common/Table/TableSkeleton";
import {TablePagination} from "~/components/common/Table/TablePagination";

interface ResourceTableProps {
    resourcePage: IResourceAdminList,
    size: string,
    basePath?: string
}

export const ResourceAdminTable = ({resourcePage, size, basePath}: ResourceTableProps) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const navigation = useNavigation()
    const loading = isLoading(navigation)

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
                        <Table.HeaderCell scope="col">Ressurstype</Table.HeaderCell>
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
                                            Disabled
                                        </Dropdown.Menu.GroupedList.Item>
                                        <Dropdown.Menu.GroupedList.Item onClick={(e) => setStatusFilter("DELETED")}>
                                            Slettet
                                        </Dropdown.Menu.GroupedList.Item>
                                    </Dropdown.Menu.GroupedList>
                                </Dropdown.Menu>
                            </Dropdown></Table.HeaderCell>
                        <Table.HeaderCell scope="col">Slett</Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="center">Se mer informasjon</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? <TableSkeleton columns={5} /> : resourcePage.resources.map((resource) => (
                        <Table.Row key={resource.id}>
                            <Table.DataCell>{resource.resourceName}</Table.DataCell>
                            <Table.DataCell>{resource.resourceType}</Table.DataCell>
                            <Table.DataCell>{<StatusTag status={resource.status}/>}</Table.DataCell>

                            <Table.DataCell>
                                {resource.status === "DELETED" ?
                                    <MinusIcon title="a11y-title" fontSize="1.5rem"/>
                                    :
                                    <Link id="delete-icon" className="delete-icon-button"
                                          href={`${basePath}/resource-admin/delete/resource/${resource.id}${prepareQueryParams(searchParams)}`}>
                                        {<TrashIcon title="Slett" fontSize="1.5rem"/>}
                                    </Link>
                                }
                            </Table.DataCell>
                            {/*<Button
                                    id={"delete-test"}
                                    as={Link}
                                    className={"button-outlined"}
                                    variant={"secondary"}
                                    icon={<TrashIcon title="søppelbøtte" fontSize="1.5rem"/>}
                                    iconPosition={"right"}
                                    href={`${basePath}/resource-admin/resource/${resource.id}/delete${prepareQueryParams(searchParams)}`}
                                >
                                    Slett
                                </Button>*/}

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
                                        navigate(`/resource-admin/${resource.id}`)
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
            <TablePagination currentPage={resourcePage.currentPage} totalPages={resourcePage.totalPages} size={size ?? 10}/>
        </>
    );
};