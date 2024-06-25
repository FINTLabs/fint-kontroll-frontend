import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {
    IAssignedResources,
    IAssignedUsers,
    IResource,
    IResourcePage,
    IRole,
    IUnitItem,
    IUnitTree
} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import {fetchAssignedResourcesRole, fetchRoleById} from "~/data/fetch-roles";
import React from "react";
import {AssignResourceToRoleTable} from "~/components/role/AssignResourceToRoleTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import ChipsFilters from "~/components/common/ChipsFilters";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationcategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";

    const [responseResources, responseOrgUnits, responseAssignments, responseRole] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request),
        fetchAssignedResourcesRole(request, params.id, "1000", "0"),
        fetchRoleById(request, params.id),
    ]);
    const resourceList: IResourcePage = await responseResources.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedResourceList: IAssignedResources = await responseAssignments.json()
    const role: IRole = await responseRole.json()

    const assignedResourcesMap: Map<number, IResource> = new Map(assignedResourceList.resources.map(resource => [resource.id, resource]))
    const isAssignedResources: IResource[] = resourceList.resources.map(resource => {
        return {
            ...resource,
            "assigned": assignedResourcesMap.has(resource.id)
        }
    })
    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        size,
        resourceList,
        orgUnitList,
        assignedResourceList,
        isAssignedResources,
        role,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}


export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data }) => (
        <>
            <Link to={`/roles`}>Grupper</Link>
            {" > "}
            <Link to={`/roles/${params.id}/members`}>Gruppeinfo</Link>
            {" > "}
            <Link to={`/assignment/role/${params.id}`}>Ny tildeling</Link>
        </>
    )
}

export default function NewAssignmentForRole() {
    const loaderData = useLoaderData<typeof loader>();

    const resourceList: IResourcePage = loaderData.resourceList
    const orgUnitList: IUnitItem[] = loaderData.orgUnitList // Might use this later once filters are added
    const assignedUsersList: IAssignedUsers = loaderData.assignedUsersList // Might use this later once filters are added
    const isAssignedResources: IResource[] = loaderData.isAssignedResources
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode
    const role: IRole = loaderData.role
    const size: string = loaderData.size

    return (
        <div className={"content"}>
            <VStack className={"heading"}>
                <Heading level="1" size="xlarge">Ny tildeling </Heading>
                <Heading level="2" size="small">{role.roleName}</Heading>
            </VStack>
            
            <Box paddingBlock='8 0'>
                <ResponseAlert responseCode={responseCode}/>
            </Box>

                <HStack justify="end">
                    <VStack align="end">
                        <Box paddingBlock="4 4">
                            <ResourceSearch />
                        </Box>
                        <ChipsFilters />
                    </VStack>
                </HStack>


            <AssignResourceToRoleTable
                isAssignedResources={isAssignedResources}
                size={size}
                roleId={role.id}
                currentPage={resourceList.currentPage}
                totalPages={resourceList.totalPages}
                orgId={role.organisationUnitId}
                basePath={basePath}/>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen var vellykket!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}