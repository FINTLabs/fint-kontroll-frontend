import {AssignResourceToUserTable} from "~/components/user/AssignResourceToUserTable";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import {
    IAssignedResourcesList,
    IResourceAssignment,
    IResourceForList,
    IResourceList,
    IUnitItem,
    IUserDetails
} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUserById} from "~/data/fetch-users";
import {fetchAllOrgUnits, fetchApplicationCategory, fetchResources} from "~/data/fetch-resources";
import {fetchAssignedResourcesForUser} from "~/data/fetch-assignments";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {Alert, Box, HStack, VStack} from "@navikt/ds-react";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {ResourceSelectApplicationCategory} from "~/components/service-admin/ResourceSelectApplicationCategory";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import React from "react";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";
import {getUserByIdUrl, getUserNewAssignmentUrl, USERS} from "~/data/paths";

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

    const responseUser = await fetchUserById(request, params.id)
    const user: IUserDetails = await responseUser.json()

    console.log("USER", user)

    const resourceList = await fetchResources(request, size, page, search, orgUnits, applicationcategory, accessType)

    let filter = ""
    resourceList.resources.forEach(value => {
        filter += `&resourcefilter=${value.id}`

    })

    const [orgUnitTree, responseAssignmentsForUser, responseApplicationCategories] = await Promise.all([
        fetchAllOrgUnits(request),
        fetchAssignedResourcesForUser(request, params.id, size, "0", "ALLTYPES", filter),
        fetchApplicationCategory(request),
    ]);

    const assignedResourceListForUser: IAssignedResourcesList = await responseAssignmentsForUser.json()
    const applicationCategories: string[] = await responseApplicationCategories.json()

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(assignedResourceListForUser.resources.map(resource => [resource.resourceRef, resource]))
    const isAssignedResources: IResourceForList[] = resourceList.resources.map(resource => {
        return {
            ...resource,
            "assigned": assignedResourcesMap.has(resource.id)
        }
    })

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        assignedResourceList: assignedResourceListForUser,
        isAssignedResources,
        size,
        user,
        applicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) =>
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={USERS} className={"breadcrumb-link"}>Brukere</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getUserByIdUrl(params.id, params.orgId)} className={"breadcrumb-link"}>Brukerinfo</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getUserNewAssignmentUrl(params.id, params.orgId)} className={"breadcrumb-link"}>Ny
                    tildeling</Link>
            </HStack>
        </HStack>
}

export default function NewAssignmentForUser() {
    const data = useLoaderData<{
        resourceList: IResourceList,
        orgUnitList: IUnitItem[]
        assignedResourceList: IAssignedResourcesList,
        isAssignedResources: IResourceForList[],
        basePath: string,
        responseCode: string | undefined,
        size: string,
        user: IUserDetails,
        applicationCategories: string[]
    }>();
    const {id, orgId} = useParams<string>()

/*
    console.log("resourceList", data.resourceList)
    console.log("isAssignedResources", data.isAssignedResources)
    console.log("assignedUsersList", data.assignedResourceList)
*/



    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Ny tildeling"}
                subTitle={data.user.fullName}
                FilterComponents={
                    <ResourceSelectApplicationCategory applicationCategories={data.applicationCategories}/>
                }
                SearchComponent={<ResourceSearch/>}
            />
            <VStack gap="4">
                <ResponseAlert responseCode={data.responseCode} successText={"Tildelingen var vellykket!"}
                               deleteText={"Tildelingen ble slettet!"}/>

                {id && orgId ?
                    <AssignResourceToUserTable
                        isAssignedResources={data.isAssignedResources}
                        userId={id}
                        orgId={orgId}
                        size={data.size}
                        currentPage={data.resourceList.currentPage}
                        totalPages={data.resourceList.totalPages}
                        basePath={data.basePath}
                    />
                    :
                    <>
                        <Alert variant="error">Data mangler for å hente ressurser.</Alert>
                    </>
                }
            </VStack>
        </div>
    )
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
                Det oppsto en feil med følgende melding nå:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}