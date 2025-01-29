import {BodyShort, Box, Heading, HGrid, Hide, HStack, VStack} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";
import * as React from "react";
import {translateLicenseEnforcementToLabel, translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {StatusTag} from "~/components/service-admin/StatusTag";
import {IKodeverkLicenseEnforcement, IKodeverkUserType} from "~/data/types/kodeverkTypes";
import {IResource} from "~/data/types/resourceTypes";

interface ResourceInfoBoxProps {
    resource: IResource,
    userTypeKodeverk: IKodeverkUserType[] | undefined
    isAdmin?: boolean
    licenseEnforcementKodeverk?: IKodeverkLicenseEnforcement[] | undefined
}

export const ResourceInfoBox = ({resource, userTypeKodeverk, isAdmin, licenseEnforcementKodeverk}: ResourceInfoBoxProps) => {
    return (
        <Box id="resourceInfoBox" className="info-box" padding="8" borderRadius="xlarge">
            <VStack gap={"4"}>
                <HStack align={"center"} justify={"center"} gap={"8"}>
                    <Heading size="xlarge" level="1">{resource.resourceName}</Heading>
                    {isAdmin && (
                        <StatusTag status={resource.status}/>
                    )}
                </HStack>
                <HStack wrap={false} align={"center"} justify={"center"} gap={"8"}>
                    <Hide asChild below="md">
                        <hr/>
                    </Hide>
                    <InformationSquareIcon title="a11y-title" fontSize="3rem" color={"#F76650"}/>
                    <Hide asChild below="md">
                        <hr/>
                    </Hide>
                </HStack>
                <Box padding={"6"}>
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
                                            .map(role => translateUserTypeToLabel(role, userTypeKodeverk))
                                            .join(', ')
                                        }
                                    </BodyShort>
                                </li>
                            )}
                            {isAdmin && resource.resourceLimit !== undefined && (
                                <li>
                                    <Heading size="small" level="3">Totalt antall av ressursen:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceLimit}</BodyShort>
                                </li>
                            )}
                            {isAdmin && resource.unitCost !== undefined && (
                                <li>
                                    <Heading size="small" level="3">Kostnad pr. ressurs:</Heading>
                                    <BodyShort textColor="subtle">{resource.unitCost}</BodyShort>
                                </li>
                            )}
                            {/*                            {isAdmin && resource.applicationAccessType && (
                                <li>
                                    <Heading size="small" level="3">Applikasjonstilgangstype:</Heading>
                                    <BodyShort textColor="subtle">{resource.applicationAccessType}</BodyShort>
                                </li>
                            )}*/}
                            {/*                            {isAdmin && resource.applicationAccessRole && (
                                <li>
                                    <Heading size="small" level="3">Tilgangsrolle:</Heading>
                                    <BodyShort textColor="subtle">{resource.applicationAccessRole}</BodyShort>
                                </li>
                            )}*/}
                            {/*                        {isAdmin && resource.accessType && (
                                <li>
                                    <Heading size="small" level="3">Tilgangstype:</Heading>
                                    <BodyShort textColor="subtle">{resource.accessType}</BodyShort>
                                </li>
                            )}*/}
                            {isAdmin && resource.licenseEnforcement && (
                                <li>
                                    <Heading size="small" level="3">Håndhevingsregel:</Heading>
                                    <BodyShort textColor="subtle">{translateLicenseEnforcementToLabel(resource.licenseEnforcement, licenseEnforcementKodeverk)}</BodyShort>
                                </li>
                            )}
                            {/*                            {isAdmin && resource.platform && (
                                <li>
                                    <Heading size="small" level="3">Plattform:</Heading>
                                    <BodyShort textColor="subtle">
                                        {resource.platform.join(', ')}
                                    </BodyShort>
                                </li>
                            )}*/}
                            {resource.resourceId && (
                                <li>
                                    <Heading size="small" level="3">KildesystemID:</Heading>
                                    <BodyShort textColor="subtle">{resource.resourceId}</BodyShort>
                                </li>
                            )}
                            {resource.identityProviderGroupName && (
                                <li>
                                    <Heading size="small" level="3">Gruppenavn Entra ID:</Heading>
                                    <BodyShort textColor="subtle">{resource.identityProviderGroupName}</BodyShort>
                                </li>
                            )}
                        </HGrid>
                    </ul>
                </Box>
            </VStack>
        </Box>
    )
}