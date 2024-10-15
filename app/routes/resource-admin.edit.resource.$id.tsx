import {Form, Link, useLoaderData, useNavigate, useNavigation} from "@remix-run/react";
import {ActionFunctionArgs, LinksFunction, redirect} from "@remix-run/node";
import React, {useState} from "react";
import {Button, ExpansionCard, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import {IApplicationResource, IValidForOrgUnits} from "~/components/resource-admin/types";
import resourceAdmin from "../components/resource-admin/resourceAdmin.css?url"
import {fetchOrgUnits, fetchResourceById, updateResource} from "~/data/fetch-resources";
import {IUnitItem, IUnitTree} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import ValidForOrgUnitSelector from "~/components/resource-admin/opprett-ny-ressurs/ValidForOrgUnitSelector";
import ResourceOwnerSelector from "~/components/resource-admin/opprett-ny-ressurs/resourceOwnerSelector";
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import ApplicationResourceData from "~/components/resource-admin/opprett-ny-ressurs/ApplicationResourceData";

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <Link to={`/resource-admin`}>Ressursadministrasjon</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/resource-admin/${params.id}`}>Ressursinfo</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/resource-admin/edit/resource${params.id}`}>Rediger ressurs</Link>
            </HStack>
        </HStack>
    )
}

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: resourceAdmin},
];

export async function loader({params, request}: LoaderFunctionArgs) {
    const auth = request
    const orgUnitsResponse = await fetchOrgUnits(auth)
    const allOrgUnits = await orgUnitsResponse.json()
    const resource = await fetchResourceById(request, params.id)
    const resourceData = await resource.json()
    const orgUnitsWithIsChecked = CheckedValidForOrgUnits(allOrgUnits, resourceData)
    const orgUnitOwner = CheckedResourceOwner(allOrgUnits, resourceData)
    return {
        orgUnitsWithIsChecked,
        orgUnitOwner,
        resource: resourceData
    };
}

const CheckedValidForOrgUnits = (orgUnitTree: IUnitTree, resource: IApplicationResource): IUnitTree => {
    const checkedOrgUnits = resource.validForOrgUnits.map(checked => checked.orgUnitId);

    const newList = orgUnitTree.orgUnits.map(orgUnit => {
        const matchedUnit = resource.validForOrgUnits.find(unit => unit.orgUnitId === orgUnit.organisationUnitId);

        return {
            ...orgUnit,
            isChecked: checkedOrgUnits.includes(orgUnit.organisationUnitId),
            limit: matchedUnit ? matchedUnit.resourceLimit : undefined
        };
    });

    return {
        ...orgUnitTree,
        orgUnits: newList
    };
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

export default function EditApplikasjonsRessurs() {

    const loaderData = useLoaderData<typeof loader>();
    const orgUnitsWithIsChecked = loaderData.orgUnitsWithIsChecked.orgUnits as IUnitItem[];
    const orgUnitOwner = loaderData.orgUnitOwner.orgUnits as IUnitItem[]; // Her får du listen med kun én "checked" enhet
    const resource: IApplicationResource = loaderData.resource
    const navigate = useNavigate()
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<IUnitItem | null>(null)
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>([])
    const response = useNavigation()

    const [newResource, setNewResource] = useState<IApplicationResource>({
        id: resource.id,
        resourceId: resource.resourceId,
        resourceName: resource.resourceName,
        resourceType: resource.resourceType,
        platform: resource.platform,
        accessType: resource.accessType,
        resourceLimit: resource.resourceLimit,
        resourceOwnerOrgUnitId: resource.resourceOwnerOrgUnitId,
        resourceOwnerOrgUnitName: resource.resourceOwnerOrgUnitName,
        validForOrgUnits: resource.validForOrgUnits,
        validForRoles: resource.validForRoles,
        applicationCategory: resource.applicationCategory,
        hasCost: resource.hasCost,
        licenseEnforcement: resource.licenseEnforcement,
        unitCost: resource.unitCost,
        status: resource.status,
    })

    const mapOrgUnitListToValidForOrgUnits = (orgUnit: IUnitItem): IValidForOrgUnits => {
        return {
            resourceId: newResource.resourceId,
            orgUnitName: orgUnit.name,
            orgUnitId: orgUnit.organisationUnitId,
            resourceLimit: orgUnit.limit,
        };
    };

    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }

    function SaveButton() {
        if (response.state === "submitting") {
            return <Button loading>Lagre endringer</Button>;
        }
        return (
            <Button type="submit" variant="primary">
                Lagre endringer
            </Button>
        );
    }

    return (
        <VStack className={"schema"} gap="8">
            <div>
                <Heading size={"large"} level={"1"}>Endre eller legg til ressursinformasjon </Heading>
                <Heading size={"small"} level={"2"}>{resource.resourceName} </Heading>
            </div>
            <ExpansionCard aria-label="Velg orgenhet som er eier av ressursen">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Velg orgenhet som er eier av ressursen</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ResourceOwnerSelector orgUnitList={orgUnitOwner}
                                           selectedOrgUnit={selectedOrgUnit}
                                           setSelectedOrgUnit={(selected) => setSelectedOrgUnit(selected)}
                    />
                </ExpansionCard.Content>
            </ExpansionCard>
            <ExpansionCard aria-label="Fyll ut informasjon om ressursen">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Fyll ut informasjon om ressursen</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ApplicationResourceData newApplicationResource={newResource}
                                             setNewApplicationResource={setNewResource}
                    />
                </ExpansionCard.Content>
            </ExpansionCard>
            <ExpansionCard aria-label="Legg til orgenheter som skal ha tilgang til ressursen">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Legg til orgenheter som skal ha tilgang til ressursen</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ValidForOrgUnitSelector orgUnitList={orgUnitsWithIsChecked}
                                             selectedOrgUnits={selectedOrgUnits}
                                             setSelectedOrgUnits={(newSelected) => setSelectedOrgUnits(newSelected)}
                    />
                </ExpansionCard.Content>
            </ExpansionCard>

            <HStack gap="4" justify={"end"}>
                <Button type="button"
                        variant="secondary"
                        onClick={() => navigate(`/resource-admin`)}>
                    Avbryt
                </Button>
                <Form method="PUT">
                    <input type="hidden" name="id" id="id" value={newResource.id}/>
                    <input type="hidden" name="resourceId" id="resourceId" value={newResource.resourceId}/>
                    <input type="hidden" name="resourceName" id="resourceName" value={newResource.resourceName}/>
                    <input type="hidden" name="resourceType" id="resourceType" value={newResource.resourceType}/>
                    <input type="hidden" name="platform" id="platform" value={newResource.platform.join(",")}/>
                    <input type="hidden" name="accessType" id="accessType" value={newResource.accessType}/>
                    <input type="hidden" name="resourceLimit" id="resourceLimit"
                           value={newResource.resourceLimit.toString()}/>
                    <input type="hidden" name="resourceOwnerOrgUnitId" id="resourceOwnerOrgUnitId"
                           value={selectedOrgUnit?.organisationUnitId}/>
                    <input type="hidden" name="resourceOwnerOrgUnitName" id="resourceOwnerOrgUnitName"
                           value={selectedOrgUnit?.name}/>
                    <input
                        type="hidden"
                        name="validForOrgUnits"
                        id="validForOrgUnits"
                        value={JSON.stringify(selectedOrgUnits.map(mapOrgUnitListToValidForOrgUnits))}
                    />
                    <input type="hidden" name="validForRoles" id="validForRoles"
                           value={newResource.validForRoles.join(",")}/>
                    <input type="hidden" name="applicationCategory" id="applicationCategory"
                           value={newResource.applicationCategory.join(",")}/>
                    <input type="hidden" name="hasCost" id="hasCost" value={newResource.hasCost.toString()}/>
                    <input type="hidden" name="licenseEnforcement" id="licenseEnforcement"
                           value={newResource.licenseEnforcement}/>
                    <input type="hidden" name="unitCost" id="unitCost" value={newResource.unitCost}/>
                    <input type="hidden" name="status" id="status" value={newResource.status}/>
                    {SaveButton()}
                </Form>
            </HStack>
        </VStack>
    )
}