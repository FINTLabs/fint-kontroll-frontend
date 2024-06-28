import {AssignResourceToUserTable} from "~/components/user/AssignResourceToUserTable";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError, useSearchParams} from "@remix-run/react";
import {
    IAssignedResources,
    IAssignedUsers,
    IResource,
    IResourcePage,
    IUnitItem,
    IUnitTree,
    IUserDetails
} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUserById} from "~/data/fetch-users";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {fetchAssignedResourcesUser} from "~/data/fetch-assignments";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {Alert, Box, Heading, HStack, Select, VStack} from "@navikt/ds-react";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import ChipsFilters from "~/components/common/ChipsFilters";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";

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


    const [responseResources, responseOrgUnits, responseAssignments, responseUser, responseApplicationCategories] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request),
        fetchAssignedResourcesUser(request, params.id, "1000", "0"),
        fetchUserById(request, params.id),
        fetchApplicationCategory(request),
        // fetchAccessType(request)


    ]);
    const resourceList: IResourcePage = await responseResources.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedResourceList: IAssignedResources = await responseAssignments.json()
    const user: IUserDetails = await responseUser.json()
    const applicationCategories: string[] = await responseApplicationCategories.json()
    // const accessTypes: string[] = await responseAccessType.json()

    const assignedResourcesMap: Map<number, IResource> = new Map(assignedResourceList.resources.map(resource => [resource.resourceRef, resource]))
    const isAssignedResources: IResource[] = resourceList.resources.map(resource => {
        return {
            ...resource,
            "assigned": assignedResourcesMap.has(resource.id)
        }
    })

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resourceList,
        orgUnitList,
        assignedResourceList,
        isAssignedResources,
        size,
        user,
        applicationCategories,
        // accessTypes,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <>
            <Link to={`/users`}>Brukere</Link>
            {" > "}
            <Link to={`/users/${params.id}/orgunit/${params.orgId}`}>Brukerinfo</Link>
            {" > "}
            <Link to={`/assignment/user/${params.id}/orgunit/${params.orgId}`}>Ny tildeling</Link>
        </>
    )
}

export default function NewAssignmentForUser() {
    const data = useLoaderData<{

        resourceList: IResourcePage,
        orgUnitList: IUnitItem[]
        assignedUsersList: IAssignedUsers,
        isAssignedResources: IResource[],
        basePath: string,
        responseCode: string | undefined,
        size: string,
        user: IUserDetails,
        applicationCategories: string[]
        // accessTypes: string[]
    }>();
    const { id, orgId } = useParams<string>()

    const [applicationCategorySearchParams, setApplicationCategorySearchParams] = useSearchParams()
    // const [accessTypeSearchParams, setAccessTypeSearchParams] = useSearchParams()

    console.log(applicationCategorySearchParams.get("applicationcategory"))
    const setAppCategory = (event: string) => {
        setApplicationCategorySearchParams(searchParams => {
            event !== "" ? searchParams.set("applicationcategory", event) : searchParams.delete("applicationcategory")
            return searchParams;
        })
    }

    /* const setAccessType = (event: string) => {
         setAccessTypeSearchParams(searchParams => {
             searchParams.set("accesstype", event);
             if (searchParams.get("accesstype") === "") {
                 searchParams.delete("accesstype")
             }
             return searchParams;
         })
     }*/

    return (
        <div className={"content"}>
            <Heading level="1" size="xlarge">Ny tildeling </Heading>
            <Heading level="2" size="small">{data.user.fullName}</Heading>

            <VStack gap="4">
                <HStack justify="end" align="end">
                    <Select
                        id="select-applicationcategory"
                        className={"select-applicationcategory"}
                        label={"Filter for applikasjonskategori"}
                        onChange={(e) => setAppCategory(e.target.value)}
                        value={String(applicationCategorySearchParams.get("applicationcategory")) ?? ""}
                    >
                        <option value={""}>Alle</option>
                        {data.applicationCategories?.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Select>

                    {/*<Select
                        className={"select-applicationcategory"}
                        label={"Filter for lisensmodell"}
                        onChange={(e) => setAccessType(e.target.value)}
                        value={String(accessTypeSearchParams.get("accesstype")) ?? ""}
                    >
                        <option value={""}>Alle</option>
                        {data.accessTypes?.map((accessType) => (
                            <option key={accessType} value={accessType}>
                                {accessType}
                            </option>
                        ))}
                    </Select>*/}

                    <ResourceSearch/>
                </HStack>

                <HStack justify="end">
                    <ChipsFilters/>
                </HStack>

                <ResponseAlert responseCode={data.responseCode}/>

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
                        <Alert variant="error">Data mangler for å hente tildelte ressurser.</Alert>
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
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}