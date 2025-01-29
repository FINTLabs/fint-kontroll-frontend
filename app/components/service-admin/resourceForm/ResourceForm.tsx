import {BodyShort, Button, ErrorMessage, ExpansionCard, Heading, HStack, VStack} from "@navikt/ds-react";
import React, {useMemo, useState} from "react";
import {IApplicationResource, IValidForOrgUnits} from "~/components/service-admin/types";
import OrgUnitRadioSelection from "~/components/common/orgUnits/OrgUnitRadioSelection";
import ApplicationResourceData from "~/components/service-admin/opprett-ny-ressurs/ApplicationResourceData";
import OrgUnitSelect from "~/components/common/orgUnits/OrgUnitSelect";
import {Form, useNavigate, useNavigation} from "@remix-run/react";
import {SERVICE_ADMIN} from "~/data/paths";
import {IKodeverkApplicationCategory, IKodeverkLicenseEnforcement, IKodeverkUserType} from "~/data/types/kodeverkTypes";
import {IUnitItem} from "~/data/types/orgUnitTypes";

interface ResourseFormProps {
    resource?: IApplicationResource;
    allOrgUnits: IUnitItem[];
    applicationCategories: IKodeverkApplicationCategory[];
    userTypes: IKodeverkUserType[];
    licenseEnforcements: IKodeverkLicenseEnforcement[];
}

export const ResourceForm: React.FC<ResourseFormProps> = (
    {
        resource,
        allOrgUnits,
        applicationCategories,
        userTypes,
        licenseEnforcements
    }) => {
    const navigate = useNavigate()
    const response = useNavigation()

    const initialResourceState = resource?.id ? {...resource} : {
        resourceId: "",
        resourceName: "",
        resourceType: "ApplicationResource", //TODO denne skal være hardkodet frem til device kommer inn i løsningen
        platform: [],
        accessType: "user", //TODO denne skal være hardkodet frem til device kommer inn i løsningen
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
    };

    const [newResource, setNewResource] = useState<IApplicationResource>(initialResourceState);

    const [selectedOwnerOrgUnit, setSelectedOwnerOrgUnit] = useState<IUnitItem | null>(
        newResource.resourceOwnerOrgUnitId
            ? allOrgUnits.find(orgUnit => orgUnit.organisationUnitId === newResource.resourceOwnerOrgUnitId) || null
            : null
    );

    const [selectedValidForOrgUnits, setSelectedValidForOrgUnits] = useState<IUnitItem[]>(
        allOrgUnits
            .filter(orgUnit => newResource.validForOrgUnits.some(unit => unit.orgUnitId === orgUnit.organisationUnitId))
            .map(orgUnit => {
                const resourceUnit = newResource.validForOrgUnits.find(unit => unit.orgUnitId === orgUnit.organisationUnitId);
                return {
                    ...orgUnit,
                    limit: resourceUnit?.resourceLimit
                };
            })
    );

    const totalAssignedResources = useMemo(() =>
        selectedValidForOrgUnits.reduce((acc, unit) => acc + (unit.limit || 0), 0), [selectedValidForOrgUnits]
    )


    return (
        <VStack className={"schema content"} gap="8">
            <VStack>
                <Heading size="large" level="1">
                    {newResource.resourceName ? "Endre eller legg til ressursinformasjon" : "Fyll ut ressursinformasjon"}
                </Heading>
                {newResource.resourceName && (
                    <Heading size="small" level="2">{newResource.resourceName}</Heading>
                )}
            </VStack>

            <ExpansionCard
                aria-label="Velg organisasjonsenhet som er eier av ressursen"
                defaultOpen={!selectedOwnerOrgUnit?.name}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Velg organisasjonsenhet som er eier av ressursen</ExpansionCard.Title>
                    <ExpansionCard.Description>{selectedOwnerOrgUnit ? `Valgt enhet: ${selectedOwnerOrgUnit.name}` : ""}</ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <OrgUnitRadioSelection
                        orgUnitList={allOrgUnits}
                        selectedOrgUnit={selectedOwnerOrgUnit}
                        setSelectedOrgUnit={(selected) => setSelectedOwnerOrgUnit(selected)}
                    />
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard aria-label="Fyll ut informasjon om ressursen" defaultOpen>
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Fyll ut informasjon om ressursen</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ApplicationResourceData
                        newApplicationResource={newResource}
                        setNewApplicationResource={setNewResource}
                        applicationCategories={applicationCategories}
                        userTypes={userTypes}
                        licenseEnforcements={licenseEnforcements}
                    />
                </ExpansionCard.Content>
            </ExpansionCard>


            <ExpansionCard
                aria-label="Legg til organisasjonsenheter som skal ha tilgang til ressursen"
                defaultOpen={!selectedValidForOrgUnits.length}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>
                        Legg til organisasjonsenheter som skal ha tilgang til ressursen
                    </ExpansionCard.Title>
                    <ExpansionCard.Description>
                        {selectedValidForOrgUnits.length > 0 && (
                            <>
                                {`${selectedValidForOrgUnits.length} enheter valgt.`}
                                <br/>
                                {newResource.resourceLimit && totalAssignedResources > newResource.resourceLimit ? (
                                    <ErrorMessage>
                                        {`${totalAssignedResources} ${newResource.resourceLimit > 0 ? `av ${newResource.resourceLimit}` : ""} tilganger er fordelt.`}
                                    </ErrorMessage>
                                ) : (`${totalAssignedResources} ${newResource.resourceLimit > 0 ? `av ${newResource.resourceLimit}` : ""} tilganger er fordelt.`)}
                            </>
                        )}
                    </ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <OrgUnitSelect
                        allOrgUnits={allOrgUnits}
                        selectedOrgUnits={selectedValidForOrgUnits}
                        setSelectedOrgUnits={setSelectedValidForOrgUnits}
                        selectType="allocation"
                    />
                </ExpansionCard.Content>
            </ExpansionCard>

            <HStack gap="4" justify={"end"}>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(SERVICE_ADMIN)}
                >
                    Avbryt
                </Button>
                <Form method={newResource.id ? "PUT" : "POST"}>
                    {newResource.id && <input type="hidden" name="id" id="id" value={newResource.id}/>}
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
                        value={JSON.stringify(selectedValidForOrgUnits.map((orgUnit: IUnitItem): IValidForOrgUnits => {
                            return {
                                resourceId: newResource.resourceId,
                                orgUnitName: orgUnit.name,
                                orgUnitId: orgUnit.organisationUnitId,
                                resourceLimit: orgUnit.limit,
                            };
                        }))}
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
                    <Button type="submit" variant="primary" loading={response.state === "submitting"}>
                        {newResource.id ? "Lagre endringer" : "Lagre ressurs"}
                    </Button>
                </Form>
            </HStack>
        </VStack>
    )
}

