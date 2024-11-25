import {Alert, Box} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IResourceList, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import styles from "../components/org-unit-filter/orgUnitFilter.css?url"
import ChipsFilters from "~/components/common/ChipsFilters";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResourceSelectApplicationCategory} from "~/components/resource-admin/ResourceSelectApplicationCategory";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";

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
    const resourceList: IResourceList = await responseResource.json()
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
    const resourceList: IResourceList = loaderData.resourceList
    const size: string = loaderData.size
    const orgUnitList: IUnitItem[] = loaderData.orgUnitList
    const applicationCategories: string[] = loaderData.applicationCategories
    // const accessTypes: string[] = loaderData.accessTypes

    // const [accessTypeSearchParams, setAccessTypeSearchParams] = useSearchParams()

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
            <TableHeaderLayout
                title={"Ressurser"}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<ResourceSearch/>}
                ChipsFilters={<ChipsFilters/>}
                FilterComponents={<ResourceSelectApplicationCategory applicationCategories={applicationCategories}/>}
            />
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