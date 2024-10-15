import {Alert, Box, Button, Heading, HStack, VStack} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useNavigate, useRouteError} from "@remix-run/react";
import {IResourceAdminList, IUnitItem, IUnitTree} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchApplicationCategory, fetchOrgUnits, fetchResourcesForAdmin} from "~/data/fetch-resources";
import {Search} from "~/components/common/Search";
import {ResourceAdminTable} from "~/components/resource-admin/ResourceAdminTable";
import ChipsFilters from "~/components/common/ChipsFilters";
import {ResourceSelectApplicationCategory} from "~/components/resource-admin/ResourceSelectApplicationCategory";
import {PlusIcon} from "@navikt/aksel-icons";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {BASE_PATH} from "../../environment";
import React from "react";

export async function loader({request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const status = url.searchParams.get("status") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const applicationcategory = url.searchParams.get("applicationcategory") ?? "";
    const accessType = url.searchParams.get("accesstype") ?? "";

    const [responseResource, responseOrgUnits, responseApplicationCategories] = await Promise.all([
        fetchResourcesForAdmin(request, size, page, search, status, orgUnits, applicationcategory, accessType),
        fetchOrgUnits(request),
        fetchApplicationCategory(request),
        // fetchAccessType(request)

    ]);
    const resourceList: IResourceAdminList = await responseResource.json()
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
    const resourceList: IResourceAdminList = loaderData.resourceList
    const size = loaderData.size
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode
    const applicationCategories: string[] = loaderData.applicationCategories
    const navigate = useNavigate()
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
                <HStack justify={"end"} align={"end"}>
                    <Button role="link"
                            className={"no-underline-button"}
                            variant={"secondary"}
                            iconPosition="right" icon={<PlusIcon aria-hidden/>}
                            onClick={() => navigate("/resource-admin/opprett-ny-applikasjonsressurs")}>
                        Opprett ny ressurs
                    </Button>
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
                    <Search label={"Søk etter ressurs"} id={"search-resource-admin"}/>
                </HStack>
            {/*</HStack>*/}
            <HStack justify="end">
                <ChipsFilters/>
            </HStack>
            <ResponseAlert
                responseCode={responseCode}
                successText={"Ressursen ble opprettet!"}
                deleteText={"Ressursen ble slettet!"}
            />
            <ResourceAdminTable resourcePage={resourceList} size={size} basePath={basePath}/>
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