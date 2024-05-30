import {AssignResourceToUserTable} from "~/components/user/AssignResourceToUserTable";
import {Link, Links, Meta, Scripts, useLoaderData, useParams, useRouteError, useSearchParams} from "@remix-run/react";
import {IAssignedResources, IAssignedUsers, IResource, IResourcePage, IUnitItem, IUnitTree, IUser} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUserById} from "~/data/fetch-users";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {fetchAssignedResourcesUser} from "~/data/fetch-assignments";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {Alert, Box, Heading, HStack, VStack, Select} from "@navikt/ds-react";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import React from "react";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import ChipsFilters from "~/components/common/ChipsFilters";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationcategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";


    const [responseResources, responseOrgUnits, responseAssignments, responseUser, responseApplicationCategories] = await Promise.all([
        fetchResources(request.headers.get("Authorization"), size, page, search, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchAssignedResourcesUser(request.headers.get("Authorization"), params.id, "1000", "0"),
        fetchUserById(request.headers.get("Authorization"), params.id),
        fetchApplicationCategory(request.headers.get("Authorization")),
       // fetchAccessType(request.headers.get("Authorization"))


    ]);
    const resourceList: IResourcePage = await responseResources.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedResourceList: IAssignedResources = await responseAssignments.json()
    const user: IUser = await responseUser.json()
    const applicationCategories: string[] = await responseApplicationCategories.json()
   // const accessTypes: string[] = await responseAccessType.json()


    const assignedResourcesMap: Map<number, IResource> = new Map(assignedResourceList.resources.map(resource => [resource.id, resource]))
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
        user,
        applicationCategories,
       // accessTypes,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data }) => (
        <>
            <Link to={`/users`}>Brukere</Link>
            {" > "}
            <Link to={`/users/${params.id}/orgunit/${params.orgunit}`}>Brukerinfo</Link>
            {" > "}
            <Link to={`/assignment/user/${params.id}/orgunit/${params.orgunit}`}>Ny tildeling</Link>
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
        user: IUser,
        applicationCategories: string[]
       // accessTypes: string[]
    }>();
    const params = useParams<string>()
    const [applicationCategorySearchParams, setApplicationCategorySearchParams] = useSearchParams()
   // const [accessTypeSearchParams, setAccessTypeSearchParams] = useSearchParams()

    const setAppCategory = (event: string) => {
        setApplicationCategorySearchParams(searchParams => {
            searchParams.set("applicationcategory", event);
            if (searchParams.get("applicationcategory") === "") {
                searchParams.delete("applicationcategory")
            }
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
        <>
            <div className={"content"}>
                <VStack className={"heading"}>
                    <Heading level="1" size="xlarge">Ny tildeling </Heading>
                    <Heading level="2" size="small">{data.user.fullName}</Heading>
                </VStack>
                <HStack justify="end" align="end">
                    <Select
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
                <Box className={"filters"} paddingBlock={"1 8"}>
                    <ChipsFilters/>
                </Box>
                <Box paddingBlock='8 0'>
                    <ResponseAlert responseCode={data.responseCode}/>
                </Box>
                <AssignResourceToUserTable
                    isAssignedResources={data.isAssignedResources}
                    userId={params.id}
                    orgId={params.orgId}
                    currentPage={data.resourceList.currentPage}
                    totalPages={data.resourceList.totalPages}
                    basePath={data.basePath}/>
            </div>
        </>
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