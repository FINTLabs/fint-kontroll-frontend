import * as React from "react"
import {BodyShort, Box, GuidePanel, Heading} from "@navikt/ds-react"
import type {IResource} from "~/data/types"
import {InformationIcon} from "@navikt/aksel-icons"

export const ResourceInfoBlock: any = (props: { resource: IResource }) => {

    return (
        <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
            <Box className={"info-icon-section"}>
                <hr/>
                <Heading size="medium" level="2">Ressursinformasjon</Heading>
                <hr/>
            </Box>

            <ul className="resource-information-list">
                <li>
                    <Heading size="small" level="3">Gruppenavn Entra ID:</Heading>
                    <BodyShort textColor="subtle">{props.resource.identityProviderGroupName}</BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">KildesystemID:</Heading>
                    <BodyShort textColor="subtle">{props.resource.resourceId}</BodyShort>
                </li>

                <li>
                    <Heading size="small" level="3">Ressurseier:</Heading>
                    <BodyShort textColor="subtle">{props.resource.resourceOwnerOrgUnitName}</BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">Totalt antall av ressursen:</Heading>
                    <BodyShort textColor="subtle">{props.resource.resourceLimit}</BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">Håndhevingsregel:</Heading>
                    <BodyShort textColor="subtle">{props.resource.licenseEnforcement}</BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">Kostnad pr. ressurs:</Heading>
                    <BodyShort textColor="subtle">{props.resource.unitCost}</BodyShort>

                </li>
                <li>
                    <Heading size="small" level="3">Gyldig for:</Heading>
                    <BodyShort textColor="subtle">{props.resource.validForRoles.map((item, index) => (
                        <span key={index}>
                                    {item}
                            {index < props.resource.validForRoles.length - 1 ? ', ' : ''}
                            </span>
                    ))}
                    </BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">Applikasjonskategori:</Heading>
                    <BodyShort textColor="subtle">{props.resource.applicationCategory.map((item, index) => (
                        <span key={index}>
                                    {item}
                            {index < props.resource.applicationCategory.length - 1 ? ', ' : ''}
                            </span>
                    ))}
                    </BodyShort>
                </li>
                <li>
                    <Heading size="small" level="3">Ressurstype:</Heading>
                    <BodyShort textColor="subtle">{props.resource.resourceType}</BodyShort>
                </li>
                {/*<li>
                    <Heading size="small" level="3">Applikasjonstilgangstype:</Heading>
                    <BodyShort textColor="subtle">{props.resource.applicationAccessType}</BodyShort>
                </li>*/}
                {/*<li>
                    <Heading size="small" level="3">Tilgangsrolle:</Heading>
                    <BodyShort textColor="subtle">{props.resource.applicationAccessRole}</BodyShort>
                </li>*/}
                {/*<li>
                    <Heading size="small" level="3">Tilgangstype:</Heading>
                    <BodyShort textColor="subtle">{props.resource.accessType}</BodyShort>
                </li>*/}
                {/*<li>
                    <Heading size="small" level="3">Plattform:</Heading>
                    <BodyShort textColor="subtle">{
                        props.resource.platform.map((item, index) => (
                            <span key={index}>
                                    {item}
                                {index < props.resource.platform.length - 1 ? ', ' : ''}
                                </span>
                        ))}
                    </BodyShort>
                </li>*/}
            </ul>
        </GuidePanel>
    )
}

export default ResourceInfoBlock