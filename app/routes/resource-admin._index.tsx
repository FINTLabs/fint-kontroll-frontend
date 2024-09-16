import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {IResourceList, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResources} from "~/data/fetch-resources";
import {ResourceSearch} from "~/components/resource-admin/ResourceSearch";
import {ResourceTable} from "~/components/resource-admin/ResourceTable";
import ChipsFilters from "~/components/common/ChipsFilters";
import {ResourceSelectApplicationCategory} from "~/components/resource-admin/ResourceSelectApplicationCategory";
import {PlusIcon} from "@navikt/aksel-icons";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {BASE_PATH} from "../../environment";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationcategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";

    const [responseResource, responseOrgUnits, responseApplicationCategories] = await Promise.all([
        fetchResources(request, size, page, search, orgUnits, applicationcategory, accessType),
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
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resourceList,
        orgUnitList,
        applicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        // accessTypes
    })
}

export default function ResourceAdminIndex() {

    const loaderData = useLoaderData<typeof loader>();
    const resourceList: IResourceList = loaderData.resourceList
    const size = loaderData.size
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode
    const applicationCategories: string[] = loaderData.applicationCategories
    // const orgUnitList: IUnitItem[] = loaderData.orgUnitList
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
        <VStack className={"content"} gap="4">
            <Heading className={"heading"} level="1" size="xlarge">Ressursadministrasjon</Heading>
            <HStack justify={"space-between"}>
                <HStack justify={"start"} align={"end"}>
                    <Box paddingBlock="4">
                        <Link to={"opprett-ny-applikasjonsressurs"} id="create-resource">
                            <PlusIcon/> Opprett ny ressurs
                        </Link>
                    </Box>
                </HStack>
                <HStack justify="end" align="end">

                    <ResourceSelectApplicationCategory applicationCategories={applicationCategories}/>
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
            </HStack>
            <HStack justify="end">
                <ChipsFilters/>
            </HStack>
            <ResponseAlert responseCode={responseCode} successText={"Ressursen ble opprettet!"}
                           deleteText={"Ressursen ble slettet!"}
            />
            <ResourceTable resourcePage={resourceList} size={size} basePath={basePath}/>
        </VStack>
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