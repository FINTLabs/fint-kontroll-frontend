import {Form, Link, useLoaderData, useNavigate, useNavigation} from "@remix-run/react";
import {ActionFunctionArgs, LinksFunction, redirect} from "@remix-run/node";
import React, {useState} from "react";
import {Box, Button, ExpansionCard, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import ApplicationResourceData from "~/components/resource-admin/opprett-ny-ressurs/ApplicationResourceData";
import {INewApplicationResource, IValidForOrgUnits} from "~/components/resource-admin/types";
import resourceAdmin from "../components/resource-admin/resourceAdmin.css?url"
import {prepareQueryParamsWithResponseCode} from "~/components/common/CommonFunctions";
import {createResource, fetchOrgUnits} from "~/data/fetch-resources";
import {IUnitItem, IUnitTree} from "~/data/types";
import {LoaderFunctionArgs} from "@remix-run/router";
import ValidForOrgUnitSelector from "~/components/resource-admin/opprett-ny-ressurs/ValidForOrgUnitSelector";

export const handle = {
    // @ts-ignore
    breadcrumb: () => (
        <>
            <Link to={`/resource-admin`}>Ressurser</Link>
            {" > "}
            <Link to={`/resource-admin/opprett-ny-applikasjonsressurs`}>Ny ressurs</Link>
        </>
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
    const orgUnitsResponse = await fetchOrgUnits(auth)
    const allOrgUnits = await orgUnitsResponse.json()
    const orgUnitsWithIsChecked = loopAndSetIsCheck(allOrgUnits)
    return {allOrgUnits: orgUnitsWithIsChecked}

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
    const hasCost = data.get("hasCost") === "false"
    const licenseEnforcement = data.get("licenseEnforcement") as string
    const unitCost = data.get("unitCost") as string
    const status = data.get("status") as string
    const response = await createResource(request.headers.get("Authorization"), resourceId, resourceName, resourceType, platform, accessType, resourceLimit, resourceOwnerOrgUnitName, resourceOwnerOrgUnitId, validForOrgUnits, validForRoles, applicationCategory, hasCost, licenseEnforcement, unitCost, status)

    return redirect(`/resource-admin${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + "&responseCode=" + response.status : "?responseCode=" + response.status}`)
}

export default function OpprettNyApplikasjonsRessurs() {

    const [newResource, setNewResource] = useState<INewApplicationResource>({
        resourceId: "",
        resourceName: "",
        resourceType: "",
        platform: [],
        accessType: "",
        resourceLimit: 0,
        resourceOwnerOrgUnitId: "",
        resourceOwnerOrgUnitName: "",
        validForOrgUnits: [],
        validForRoles: [],
        applicationCategory: [],
        hasCost: false,
        licenseEnforcement: "",
        unitCost: 0,
        status: "",
    })
    const loaderData = useLoaderData<typeof loader>();
    const allOrgUnits = loaderData.allOrgUnits.orgUnits as IUnitItem[]
    const navigate = useNavigate()
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>([])
    const response = useNavigation()
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
            return <Button loading>Lagre</Button>;
        }
        return (
            <Button type="submit" variant="primary">
                Lagre ressurs
            </Button>
        );
    }

    return (
        <VStack className={"schema"} gap="8">
            <Heading size={"large"} level={"1"}>Fyll ut ressursinformasjon</Heading>
            <Box borderWidth={"1"} borderRadius={"large"} borderColor={"border-subtle"}>
                <ApplicationResourceData newApplicationResource={newResource}
                                         setNewApplicationResource={setNewResource}/>
            </Box>
            <ExpansionCard size="small" aria-label="Small-variant">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Legg til orgenheter som skal ha tilgang til ressursen</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ValidForOrgUnitSelector orgUnitList={allOrgUnits}
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
                <Form method="POST">
                    <input type="hidden" name="resourceId" id="resourceId" value={newResource.resourceId}/>
                    <input type="hidden" name="resourceName" id="resourceName" value={newResource.resourceName}/>
                    <input type="hidden" name="resourceType" id="resourceType" value={newResource.resourceType}/>
                    <input type="hidden" name="platform" id="platform" value={newResource.platform.join(",")}/>
                    <input type="hidden" name="accessType" id="accessType" value={newResource.accessType}/>
                    <input type="hidden" name="resourceLimit" id="resourceLimit"
                           value={newResource.resourceLimit.toString()}/>
                    <input type="hidden" name="resourceOwnerOrgUnitId" id="resourceOwnerOrgUnitId"
                           value={newResource.resourceOwnerOrgUnitId}/>
                    <input type="hidden" name="resourceOwnerOrgUnitName" id="resourceOwnerOrgUnitName"
                           value={newResource.resourceOwnerOrgUnitName}/>
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