import {Link, useLoaderData, useNavigation} from "@remix-run/react";
import {ActionFunctionArgs, LinksFunction, redirect} from "@remix-run/node";
import React from "react";
import {HStack, Loader} from "@navikt/ds-react";
import {IApplicationResource, IValidForOrgUnits} from "~/components/resource-admin/types";
import resourceAdmin from "../components/resource-admin/resourceAdmin.css?url"
import {fetchResourceById, fetchAllOrgUnits, updateResource} from "~/data/fetch-resources";
import {IUnitItem, IUnitTree} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {fetchApplicationCategories, fetchUserTypes} from "~/data/fetch-kodeverk";
import {ResourceForm} from "~/components/resource-admin/resourceForm/ResourceForm";

export async function loader({params, request}: LoaderFunctionArgs) {
    const auth = request;
    const [allOrgUnits, resource, applicationCategories, userTypes] = await Promise.all([
        fetchAllOrgUnits(auth),
        fetchResourceById(request, params.id),
        fetchApplicationCategories(auth),
        fetchUserTypes(auth)
    ]);

    const resourceData = await resource.json();
    const orgUnitsWithIsChecked = CheckedValidForOrgUnits(allOrgUnits, resourceData);
    const orgUnitOwner = CheckedResourceOwner(allOrgUnits, resourceData);

    return {
        orgUnitsWithIsChecked,
        orgUnitOwner,
        resource: resourceData,
        applicationCategories,
        userTypes,
        allOrgUnits
    };
}


export default function EditApplikasjonsRessurs() {
    const loaderData = useLoaderData<typeof loader>();
    const orgUnitsWithIsChecked = loaderData.orgUnitsWithIsChecked.orgUnits as IUnitItem[];
    const orgUnitOwner = loaderData.orgUnitOwner.orgUnits as IUnitItem[]; // Her får du listen med kun én "checked" enhet
    const resource: IApplicationResource = loaderData.resource
    const applicationCategories = loaderData.applicationCategories
    const userTypes = loaderData.userTypes
    const allOrgUnits = loaderData.allOrgUnits.orgUnits as IUnitItem[]
    const response = useNavigation()


    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }
    return (
        <ResourceForm
            resource={resource}
            allOrgUnits={allOrgUnits}
            applicationCategories={applicationCategories}
            userTypes={userTypes}
        />
    )
}

export const handle = {
    breadcrumb: ({params}: { params: any }) => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={`/resource-admin`} className={"breadcrumb-link"}>Ressursadministrasjon</Link>
                <ArrowRightIcon fontSize="1.5rem"/>
                <Link to={`/resource-admin/${params.id}`} className={"breadcrumb-link"}>Ressursinfo</Link>
                <ArrowRightIcon fontSize="1.5rem"/>
                <Link to={`/resource-admin/edit/resource${params.id}`} className={"breadcrumb-link"}>Rediger
                    ressurs</Link>
            </HStack>
        </HStack>
    )
}

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: resourceAdmin},
];


export async function action({request}: ActionFunctionArgs) {
    const data = await request.formData()
    const {searchParams} = new URL(request.url);
    const id = parseInt(data.get("id") as string)
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
    const response = await updateResource(request.headers.get("Authorization"), id, resourceId, resourceName, resourceType, platform, accessType, resourceLimit, resourceOwnerOrgUnitId, resourceOwnerOrgUnitName, validForOrgUnits, validForRoles, applicationCategory, hasCost, licenseEnforcement, unitCost, status)

    return redirect(`/resource-admin/${data.get("id")}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)

}


const CheckedValidForOrgUnits = (orgUnitTree: IUnitTree, resource: IApplicationResource): IUnitTree => {
    const checkedOrgUnits = resource.validForOrgUnits.map(checked => checked.orgUnitId);

    const newList = orgUnitTree.orgUnits.map(orgUnit => ({
        ...orgUnit,
        isChecked: checkedOrgUnits.includes(orgUnit.organisationUnitId),
        limit: resource.validForOrgUnits.find(unit => unit.orgUnitId === orgUnit.organisationUnitId)?.resourceLimit
    }));

    return {...orgUnitTree, orgUnits: newList};
};

const CheckedResourceOwner = (orgUnitTree: IUnitTree, resource: IApplicationResource): IUnitTree => {
    const checkedOrgUnitId = resource.resourceOwnerOrgUnitId;
    const newList = orgUnitTree.orgUnits.map(orgUnit => ({
        ...orgUnit,
        isChecked: orgUnit.organisationUnitId === checkedOrgUnitId
    }));

    return {
        ...orgUnitTree,
        orgUnits: newList
    };
};