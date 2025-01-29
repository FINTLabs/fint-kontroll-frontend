import {Alert, Box} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {useLoaderData, useRouteError} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAllOrgUnits, fetchApplicationCategory, fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";
import styles from "../components/org-unit-filter/orgUnitFilter.css?url"
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResourceSelectApplicationCategory} from "~/components/service-admin/ResourceSelectApplicationCategory";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";
import {IUnitItem} from "~/data/types/orgUnitTypes";
import {IResourceList} from "~/data/types/resourceTypes";

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

    const [resourceList, orgUnitTree, responseApplicationCategories] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationCategory, accessType),
        fetchAllOrgUnits(request),
        fetchApplicationCategory(request),
    ]);
    const applicationCategories: string[] = await responseApplicationCategories.json()

    return json({
        resourceList,
        size,
        orgUnitList: orgUnitTree.orgUnits,
        applicationCategories,
    })
}

export default function Resource() {
    const loaderData = useLoaderData<typeof loader>();
    const resourceList: IResourceList = loaderData.resourceList
    const size: string = loaderData.size
    const orgUnitList: IUnitItem[] = loaderData.orgUnitList
    const applicationCategories: string[] = loaderData.applicationCategories

    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Ressurser"}
                orgUnitsForFilter={orgUnitList}
                SearchComponent={<ResourceSearch/>}
                FilterComponents={<ResourceSelectApplicationCategory applicationCategories={applicationCategories}/>}
            />
            <ResourceTable resourcePage={resourceList} size={size}/>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
}