import {Alert, Box, Heading, HStack, Select} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError, useSearchParams} from "@remix-run/react";
import type {IResourcePage, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import OrgUnitFilterModal from "../components/org-unit-filter/OrgUnitFilterModal";
import styles from "../components/org-unit-filter/orgUnitFilter.css?url"
import ChipsFilters from "~/components/common/ChipsFilters";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationCategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";

    const [responseResource, responseOrgUnits, responseApplicationCategories] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationCategory, accessType),
        fetchOrgUnits(request),
        fetchApplicationCategory(request),
       // fetchAccessType(request)
    ]);
    const resourceList: IResourcePage = await responseResource.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const applicationCategories: string[] = await responseApplicationCategories.json()
   // const accessTypes: string[] = await responseAccessType.json()

    return json({
        resourceList,
        size,
        orgUnitList,
        applicationCategories,
       // accessTypes
    })
}

export default function Resource() {
    const loaderData = useLoaderData<typeof loader>();
    const resourceList: IResourcePage = loaderData.resourceList
    const size: string = loaderData.size
    const orgUnitList: IUnitItem[] = loaderData.orgUnitList
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
            <Heading className={"heading"} level="1" size="xlarge">Ressurser</Heading>
            <HStack justify="end" align="end">
                <OrgUnitFilterModal orgUnitList={orgUnitList}/>
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

            <ResourceTable resourcePage={resourceList} size={size}/>
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