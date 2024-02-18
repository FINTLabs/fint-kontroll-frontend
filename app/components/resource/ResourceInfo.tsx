import * as React from "react";
import {BodyShort, Box, GuidePanel, Heading, List} from "@navikt/ds-react";
import type {IResource} from "~/data/types";
import {InformationIcon} from "@navikt/aksel-icons";

export const ResourceInfo: any = (props: { resource: IResource }) => {

    return (
        <>
            <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
                <Box className={"infoIconSection"}>
                    <hr/>
                    <Heading size="medium" level="2">Ressursinformasjon</Heading>
                    <hr/>
                </Box>
                <Box>
                    <List as="ul">
                        <li>
                            <Heading size="small" level="3">Ressurs:</Heading>
                            <BodyShort textColor="subtle">{props.resource.resourceName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Ressurstype:</Heading>
                            <BodyShort textColor="subtle">{props.resource.resourceType}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Applikasjonstilgangstype:</Heading>
                            <BodyShort textColor="subtle">{props.resource.applicationAccessType}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Tilgangsrolle:</Heading>
                            <BodyShort textColor="subtle">{props.resource.applicationAccessRole}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Tilgangstype:</Heading>
                            <BodyShort textColor="subtle">{props.resource.accessType}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Plattform:</Heading>
                            <BodyShort textColor="subtle">{props.resource.platform}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Ressurseier:</Heading>
                            <BodyShort textColor="subtle">{props.resource.resourceOwnerOrgUnitName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Gyldig for:</Heading>
                            <BodyShort textColor="subtle">{props.resource.validForRoles}</BodyShort>
                        </li>
                    </List>
                </Box>

            </GuidePanel>
        </>
    );
}

export default ResourceInfo;