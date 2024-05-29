import * as React from "react";
import {BodyShort, Box, GuidePanel, Heading, List} from "@navikt/ds-react";
import type {IResource} from "~/data/types";
import {InformationIcon} from "@navikt/aksel-icons";

interface ResourceInfoProps {
    resource: IResource
}
export const ResourceInfo = ({resource}: ResourceInfoProps) => {

    return (
        <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
            <Box className={"infoIconSection"}>
                <hr/>
                    <Heading size="medium" level="2">Ressursinformasjon</Heading>
                <hr/>
            </Box>

            <Box>
                <ul className="resource-info">
                    <li>
                        <Heading size="small" level="3">Gruppenavn Entra ID:</Heading>
                        <BodyShort textColor="subtle">{resource.identityProviderGroupName}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">KildesystemID:</Heading>
                        <BodyShort textColor="subtle">{resource.resourceId}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Ressurstype:</Heading>
                        <BodyShort textColor="subtle">{resource.resourceType}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Applikasjonstilgangstype:</Heading>
                        <BodyShort textColor="subtle">{resource.applicationAccessType}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Tilgangsrolle:</Heading>
                        <BodyShort textColor="subtle">{resource.applicationAccessRole}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Tilgangstype:</Heading>
                        <BodyShort textColor="subtle">{resource.accessType}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Plattform:</Heading>
                        <BodyShort textColor="subtle">{
                            resource.platform.map((item, index) => (
                                <span key={index}>
                                    {item}
                                    {index < resource.platform.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Ressurseier:</Heading>
                        <BodyShort textColor="subtle">{resource.resourceOwnerOrgUnitName}</BodyShort>
                    </li>
                    <li>
                        <Heading size="small" level="3">Gyldig for:</Heading>
                        <BodyShort textColor="subtle">{resource.validForRoles}</BodyShort>
                    </li>
                </ul>
            </Box>

        </GuidePanel>
    );
}

export default ResourceInfo;