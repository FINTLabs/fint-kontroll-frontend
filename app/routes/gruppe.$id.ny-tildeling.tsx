import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {
    IAssignedResourcesList,
    IAssignedUsers,
    IResourceAssignment,
    IResourceForList,
    IResourceList,
    IRole,
    IUnitItem,
    IUnitTree
} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {Alert, Box, HStack, VStack} from "@navikt/ds-react";
import {fetchAssignedResourcesRole, fetchRoleById} from "~/data/fetch-roles";
import React from "react";
import {AssignResourceToRoleTable} from "~/components/role/AssignResourceToRoleTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import logger from "~/logging/logger";
import {ResourceSelectApplicationCategory} from "~/components/resource-admin/ResourceSelectApplicationCategory";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";
import {getRoleMembersUrl, getRoleNewAssignmentUrl, ROLES} from "~/data/paths";

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

    const [responseResources, responseOrgUnits, responseAssignments, responseRole, responseApplicationCategories] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request),
        fetchAssignedResourcesRole(request, params.id, "1000", "0"),
        fetchRoleById(request, params.id),
        fetchApplicationCategory(request),
    ]);
    const resourceList: IResourceList = await responseResources.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedResourceList: IAssignedResourcesList = await responseAssignments.json()
    const role: IRole = await responseRole.json()
    const applicationCategories: string[] = await responseApplicationCategories.json()

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(assignedResourceList.resources.map(resource => [resource.resourceRef, resource]))
    logger.info("Her er mapfunksjonen som sjekker på tildelte ressurser", assignedResourcesMap);
    const isAssignedResources: IResourceForList[] = resourceList.resources.map(resource => {
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
        applicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) =>
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={ROLES} className={"breadcrumb-link"}>Grupper</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getRoleMembersUrl(params.id)} className={"breadcrumb-link"}>Gruppeinfo</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getRoleNewAssignmentUrl(params.id)} className={"breadcrumb-link"}>Ny tildeling</Link>
            </HStack>
        </HStack>
}

export default function NewAssignmentForRole() {
    const loaderData = useLoaderData<typeof loader>();

    const resourceList: IResourceList = loaderData.resourceList
    const orgUnitList: IUnitItem[] = loaderData.orgUnitList // Might use this later once filters are added
    const assignedUsersList: IAssignedUsers = loaderData.assignedUsersList // Might use this later once filters are added
    const isAssignedResources: IResourceForList[] = loaderData.isAssignedResources
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode
    const role: IRole = loaderData.role
    const size: string = loaderData.size
    const applicationCategories: string[] = loaderData.applicationCategories

    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Ny tildeling"}
                subTitle={role.roleName}
                FilterComponents={<ResourceSelectApplicationCategory applicationCategories={applicationCategories}/>}
                SearchComponent={<ResourceSearch/>}
            />
            <VStack gap="4">
                <ResponseAlert responseCode={responseCode} successText={"Tildelingen var vellykket!"}
                               deleteText={"Tildelingen ble slettet!"}/>

                <AssignResourceToRoleTable
                    isAssignedResources={isAssignedResources}
                    size={size}
                    roleId={role.id}
                    currentPage={resourceList.currentPage}
                    totalPages={resourceList.totalPages}
                    orgId={role.organisationUnitId}
                    basePath={basePath}
                />
            </VStack>
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