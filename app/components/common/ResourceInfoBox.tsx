import {IKodeverkUserType, IResource} from "~/data/types";
import {BodyShort, Box, GuidePanel, HGrid, Heading, VStack, HStack, Spacer, Hide} from "@navikt/ds-react";
import {InformationIcon} from "@navikt/aksel-icons";
import * as React from "react";

interface ResourceInfoBoxProps {
    resource: IResource,
    userTypes: IKodeverkUserType[] | undefined
}

const translateValidForRoleLabel = (role: string, usertTypes: IKodeverkUserType[] | undefined) => {
    const userType = usertTypes?.find(userType => userType.label === role)
    return userType ? userType.fkLabel : role
}

export const ResourceInfoBox = ({resource, userTypes}: ResourceInfoBoxProps) => {
    return (
        <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
            <VStack>

                <HStack className={"nowrap"} align={"center"} justify={"center"}>
                    <Hide asChild below="xl">
                        <hr/>
                    </Hide>
                    <Heading size="medium" level="2">Ressursinformasjon</Heading>
                    <Hide asChild below="xl">
                        <hr/>
                    </Hide>
                </HStack>

                <Box padding={"4"}>
                    <ul className="full-width list-style-none">
                        <HGrid gap={"8 4"} columns={{xs: 1, lg: 2, "2xl": 3}}>
                            {resource.applicationCategory && (
                                <li>
                                    <Heading size="small" level="3">Applikasjonskategori:</Heading>
                                    <BodyShort textColor="subtle">
                                        {resource.applicationCategory.join(', ')}
                                    </BodyShort>
                                </li>
                            )}
                            {resource.resourceType && (
                                <li>
                                    <Heading size="small" level="3">Ressurstype:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceType}</BodyShort>
                                </li>
                            )}
                            {resource.applicationAccessType && (
                                <li>
                                    <Heading size="small" level="3">Applikasjonstilgangstype:</Heading>
                                    <BodyShort textColor="subtle">{resource.applicationAccessType}</BodyShort>
                                </li>
                            )}
                            {resource.applicationAccessRole && (
                                <li>
                                    <Heading size="small" level="3">Tilgangsrolle:</Heading>
                                    <BodyShort textColor="subtle">{resource.applicationAccessRole}</BodyShort>
                                </li>
                            )}
                            {resource.accessType && (
                                <li>
                                    <Heading size="small" level="3">Tilgangstype:</Heading>
                                    <BodyShort textColor="subtle">{resource.accessType}</BodyShort>
                                </li>
                            )}

                            {resource.resourceOwnerOrgUnitName && (
                                <li>
                                    <Heading size="small" level="3">Ressurseier:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceOwnerOrgUnitName}</BodyShort>
                                </li>
                            )}
                            {resource.validForRoles && (
                                <li>
                                    <Heading size="small" level="3">Gyldig for:</Heading>
                                    <BodyShort textColor="subtle">
                                        {resource.validForRoles
                                            .map(role => translateValidForRoleLabel(role, userTypes))
                                            .join(', ')
                                        }
                                    </BodyShort>
                                </li>
                            )}
                            {resource.platform && (
                                <li>
                                    <Heading size="small" level="3">Plattform:</Heading>
                                    <BodyShort textColor="subtle">
                                        {resource.platform.join(', ')}
                                    </BodyShort>
                                </li>
                            )}
                            {resource.resourceLimit !== undefined && (
                                <li>
                                    <Heading size="small" level="3">Totalt antall av ressursen:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceLimit}</BodyShort>
                                </li>
                            )}
                            {resource.licenseEnforcement && (
                                <li>
                                    <Heading size="small" level="3">Håndhevingsregel:</Heading>
                                    <BodyShort textColor="subtle">{resource.licenseEnforcement}</BodyShort>
                                </li>
                            )}
                            {resource.unitCost !== undefined && (
                                <li>
                                    <Heading size="small" level="3">Kostnad pr. ressurs:</Heading>
                                    <BodyShort textColor="subtle">{resource.unitCost}</BodyShort>
                                </li>
                            )}
                            {resource.identityProviderGroupName && (
                                <li>
                                    <Heading size="small" level="3">Gruppenavn Entra ID:</Heading>
                                    <BodyShort textColor="subtle">{resource.identityProviderGroupName}</BodyShort>
                                </li>
                            )}
                            {resource.resourceId && (
                                <li>
                                    <Heading size="small" level="3">KildesystemID:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceId}</BodyShort>
                                </li>
                            )}
                        </HGrid>
                    </ul>
                </Box>
            </VStack>
        </GuidePanel>
    )
}