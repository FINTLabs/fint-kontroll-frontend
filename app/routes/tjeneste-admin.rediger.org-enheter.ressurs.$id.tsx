import {Form, Link, useLoaderData, useNavigate, useNavigation} from "@remix-run/react";
import {ActionFunctionArgs, LinksFunction, redirect} from "@remix-run/node";
import React, {useMemo, useState} from "react";
import {BodyShort, Box, Button, ErrorMessage, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import {IApplicationResource, IValidForOrgUnits} from "~/components/service-admin/types";
import resourceAdmin from "~/components/service-admin/serviceAdmin.css?url"
import {fetchAllOrgUnits, fetchResourceById, updateResource} from "~/data/fetch-resources";
import {LoaderFunctionArgs} from "@remix-run/router";
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import OrgUnitSelect from "~/components/common/orgUnits/OrgUnitSelect";
import {getEditResourceUrl, getResourceByIdUrl, SERVICE_ADMIN} from "~/data/paths";
import {IUnitItem, IUnitTree} from "~/data/types/orgUnitTypes";

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={`/resource-admin`} className={"breadcrumb-link"}>Ressursadministrasjon</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getResourceByIdUrl(params.id)} className={"breadcrumb-link"}>Ressursinfo</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={getEditResourceUrl(params.id)} className={"breadcrumb-link"}>
                    Rediger ressurs
                </Link>
            </HStack>
        </HStack>
    )
}

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: resourceAdmin},
];

export async function loader({params, request}: LoaderFunctionArgs) {
    const auth = request
    const allOrgUnits = await fetchAllOrgUnits(auth)
    const resource = await fetchResourceById(request, params.id)
    const orgUnitsWithIsChecked = CheckedValidForOrgUnits(allOrgUnits, resource)
    const orgUnitOwner = CheckedResourceOwner(allOrgUnits, resource)
    return {
        orgUnitsWithIsChecked,
        orgUnitOwner,
        resource
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

    return redirect(`${getResourceByIdUrl(Number(data.get("id")))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)
}

export default function EditOrgUnitsForResource() {


    const loaderData = useLoaderData<typeof loader>();
    const orgUnitsWithIsChecked = loaderData.orgUnitsWithIsChecked.orgUnits as IUnitItem[];
    const resource: IApplicationResource = loaderData.resource
    const navigate = useNavigate()
    const [selectedOwnerOrgUnit] = useState<IUnitItem | null>(null)
    const [selectedValidForOrgUnits, setSelectedValidForOrgUnits] = useState<IUnitItem[]>(orgUnitsWithIsChecked.filter(orgUnit => orgUnit.isChecked))
    const totalAssignedResources = useMemo(() => selectedValidForOrgUnits.reduce((acc, unit) => acc + (unit.limit || 0), 0), [selectedValidForOrgUnits])

    const response = useNavigation()

    const [newResource] = useState<IApplicationResource>({
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
        <div className={"content"}>
            <VStack className={"schema"} gap="8">
                <VStack>
                    <Heading level={"1"} size={"large"}>Endre eller legg organisasjonsenheter </Heading>
                    <Heading level="2" size="small">{resource.resourceName}</Heading>
                </VStack>
                <Box
                    padding={"8"}
                    borderWidth="1"
                    borderColor="border-default"
                    borderRadius={"large"}
                >
                    {selectedValidForOrgUnits.length > 0 && (
                        <Box
                            paddingBlock={"0 4"}
                            borderWidth={"0 0 1 0"}
                            borderColor={"border-divider"}
                            marginBlock={"0 4"}
                        >
                            <VStack>
                                <BodyShort>{selectedValidForOrgUnits.length} enheter valgt.</BodyShort>
                                {newResource.resourceLimit && totalAssignedResources > newResource.resourceLimit ? (
                                    <ErrorMessage>
                                        {`${totalAssignedResources} ${newResource.resourceLimit > 0 ? `av ${newResource.resourceLimit}` : ""} tilganger er fordelt.`}
                                    </ErrorMessage>
                                ) : (
                                    <BodyShort>
                                        {`${totalAssignedResources} ${newResource.resourceLimit > 0 ? `av ${newResource.resourceLimit}` : ""} tilganger er fordelt.`}
                                    </BodyShort>
                                )}
                            </VStack>
                        </Box>
                    )}
                    <OrgUnitSelect
                        allOrgUnits={orgUnitsWithIsChecked}
                        selectedOrgUnits={selectedValidForOrgUnits}
                        setSelectedOrgUnits={setSelectedValidForOrgUnits}
                        selectType="allocation"
                    />
                </Box>
                <HStack gap="4" justify={"end"}>
                    <Button type="button"
                            variant="secondary"
                            onClick={() => navigate(SERVICE_ADMIN)}>
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
                               value={selectedOwnerOrgUnit?.organisationUnitId}/>
                        <input type="hidden" name="resourceOwnerOrgUnitName" id="resourceOwnerOrgUnitName"
                               value={selectedOwnerOrgUnit?.name}/>
                        <input
                            type="hidden"
                            name="validForOrgUnits"
                            id="validForOrgUnits"
                            value={JSON.stringify(selectedValidForOrgUnits.map(mapOrgUnitListToValidForOrgUnits))}
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
        </div>
    )
}