import {Alert, Box, Heading, HStack, Select} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError, useSearchParams} from "@remix-run/react";
import type {IResourcePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceSearch} from "~/components/resource-admin/ResourceSearch";
import {ResourceTable} from "~/components/resource-admin/ResourceTable";
import ChipsFilters from "~/components/common/ChipsFilters";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationcategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";

    const [responseResource, responseOrgUnits, responseApplicationCategories] = await Promise.all([
        fetchResources(request.headers.get("Authorization"), size, page, search, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchApplicationCategory(request.headers.get("Authorization")),
       // fetchAccessType(request.headers.get("Authorization"))

    ]);
    const resourceList: IResourcePage = await responseResource.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const applicationCategories: string[] = await responseApplicationCategories.json()
   // const accessTypes: string[] = await responseAccessType.json()

    return json({
        resourceList,
        orgUnitList,
        applicationCategories,
       // accessTypes
    })
}

export default function ResourceAdminIndex() {

    const loaderData = useLoaderData<typeof loader>();
    const resourceList: IResourcePage = loaderData.resourceList
    // const orgUnitList: IUnitItem[] = loaderData.orgUnitList
    const applicationCategories: string[] = loaderData.applicationCategories
   // const accessTypes: string[] = loaderData.accessTypes

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

    /*const setAccessType = (event: string) => {
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
            <Heading className={"heading"} level="1" size="xlarge">Ressursadministrasjon</Heading>
            <HStack justify="end" align="end">
                <Select
                    className={"select-applicationcategory"}
                    label={"Filter for applikasjonskategori"}
                    onChange={(e) => setAppCategory(e.target.value)}
                    value={String(applicationCategorySearchParams.get("applicationcategory")) ?? ""}
                >
                    <option value={""}>Alle</option>
                    {applicationCategories?.map((category) => (
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
                    {accessTypes?.map((accessType) => (
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
            <ResourceTable resourcePage={resourceList}/>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
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