import {Link, useLoaderData, useNavigation} from "@remix-run/react";
import {ActionFunctionArgs, LinksFunction, redirect} from "@remix-run/node";
import React from "react";
import {HStack, Loader} from "@navikt/ds-react";
import {IValidForOrgUnits} from "~/components/resource-admin/types";
import resourceAdmin from "../components/resource-admin/resourceAdmin.css?url"
import {createResource, fetchAllOrgUnits} from "~/data/fetch-resources";
import {IUnitTree} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {fetchApplicationCategories, fetchUserTypes} from "~/data/fetch-kodeverk";
import {ResourceForm} from "~/components/resource-admin/resourceForm/ResourceForm";

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={`/resource-admin`} className={"breadcrumb-link"}>Ressursadministrasjon</Link>
                <ArrowRightIcon fontSize="1.5rem"/>
                <Link to={`/resource-admin/opprett-ny-applikasjonsressurs`} className={"breadcrumb-link"}>
                    Ny ressurs
                </Link>
            </HStack>
        </HStack>
    )
}

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: resourceAdmin},
];

const loopAndSetIsCheck = (orgUnitTree: IUnitTree): IUnitTree => {
    const newList = orgUnitTree.orgUnits.map(orgUnit => ({
        ...orgUnit,
        isChecked: false
    }))
    return {
        ...orgUnitTree, orgUnits: newList
    }
}

export async function loader({request}: LoaderFunctionArgs) {
    const auth = request
    const allOrgUnits = await fetchAllOrgUnits(auth)
    const orgUnitsWithIsChecked = loopAndSetIsCheck(allOrgUnits)
    const applicationCategories = await fetchApplicationCategories(auth)
    const userTypes = await fetchUserTypes(auth)

    return {
        allOrgUnits: orgUnitsWithIsChecked.orgUnits,
        applicationCategories,
        userTypes
    }

}


export default function OpprettNyApplikasjonsRessurs() {
    const loaderData = useLoaderData<typeof loader>();
    const allOrgUnits = loaderData.allOrgUnits
    const applicationCategories = loaderData.applicationCategories
    const userTypes = loaderData.userTypes
    const response = useNavigation()

    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }

    return (
        <ResourceForm
            allOrgUnits={allOrgUnits}
            applicationCategories={applicationCategories}
            userTypes={userTypes}
        />
    )
}


export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);
    const resourceId = data.get("resourceId") as string
    const resourceName = data.get("resourceName") as string
    const resourceType = data.get("resourceType") as string
    const platform = String(data.get("platform")).split(",") ?? []
    const accessType = data.get("accessType") as string
    const resourceLimit = parseInt(data.get("resourceLimit") as string)
    const resourceOwnerOrgUnitId = data.get("resourceOwnerOrgUnitId") as string
    const resourceOwnerOrgUnitName = data.get("resourceOwnerOrgUnitName") as string
    let validForOrgUnits: IValidForOrgUnits[] = [];
    const validForOrgUnitsString = data.get("validForOrgUnits") as string | null;

    if (validForOrgUnitsString) {
        validForOrgUnits = JSON.parse(validForOrgUnitsString);
    }

    const validForRoles = String(data.get("validForRoles")).split(",") ?? []
    const applicationCategory = String(data.get("applicationCategory")).split(",") ?? []
    const hasCost = data.get("hasCost") === "true"
    const licenseEnforcement = data.get("licenseEnforcement") as string
    const unitCost = data.get("unitCost") as string
    const status = data.get("status") as string
    const response = await createResource(request.headers.get("Authorization"), resourceId, resourceName, resourceType, platform, accessType, resourceLimit, resourceOwnerOrgUnitId, resourceOwnerOrgUnitName, validForOrgUnits, validForRoles, applicationCategory, hasCost, licenseEnforcement, unitCost, status)

    return redirect(`/resource-admin${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)

}