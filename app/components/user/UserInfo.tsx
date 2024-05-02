import * as React from "react";
import {BodyShort, Box, GuidePanel, Heading, List} from "@navikt/ds-react";
import {IUser} from "~/data/types";
import {InformationIcon} from "@navikt/aksel-icons";

export const UserInfo: any = (props: { user: IUser }) => {

    return (
        <>
            <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
                <Box className={"infoIconSection"}>
                    <hr/>
                    <Heading size="medium" level="2">Person- og kontaktinformasjon</Heading>
                    {/*<InformationIcon className={"infoIcon"} title="a11y-title" fontSize="1.5rem"
                                 style={{textAlign: 'center'}}/>*/}
                    <hr/>
                </Box>
                <Box className={"listWrapper"}>
                    <List as="ul">
                        <li>
                            <Heading size="small" level="3">Navn</Heading>
                            <BodyShort textColor="subtle" id="user-full-name">{props.user.fullName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Brukernavn</Heading>
                            <BodyShort textColor="subtle">na</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Organisasjonsenhet</Heading>
                            <BodyShort textColor="subtle" id={"org-unit"}>{props.user.organisationUnitName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">E-post</Heading>
                            <BodyShort textColor="subtle">na</BodyShort>
                        </li>
                    </List>
                </Box>

            </GuidePanel>
        </>

        /*<Box className={"infoWrapper"} borderWidth="0"
             borderRadius={{xs: 'small large', sm: '0', md: 'large', lg: 'large'}}>

            <Box className={"infoIconSection"}>
                <hr/>
                <Heading size="medium" level="2" style={{color: '#0067C5'}}>Person- og kontaktinformasjon</Heading>
                <InformationIcon className={"infoIcon"} title="a11y-title" fontSize="1.5rem"
                                 style={{textAlign: 'center'}}/>
                <hr/>

            </Box>

            <Box className={"listWrapper"}>


                <List as="ul" title="">
                    <li className={"list1"}>
                        <Heading size="xsmall" level="3">Navn</Heading>
                        <BodyShort textColor="subtle">{props.user.fullName}</BodyShort>
                    </li>
                    <li className={"list1"}>
                        <Heading size="xsmall" level="3">Brukernavn</Heading>
                        <BodyShort textColor="subtle">{props.user.userName}</BodyShort>
                    </li>
                    <li className={"list2"}>
                        <Heading size="xsmall" level="3">Organisasjonsenhet</Heading>
                        <BodyShort textColor="subtle">{props.user.organisationUnitName}</BodyShort>
                    </li>
                    <li className={"list2"}>
                        <Heading size="xsmall" level="3">E-post</Heading>
                        <BodyShort textColor="subtle">{props.user.email}</BodyShort>
                    </li>

                </List>
            </Box>
        </Box>*/
    );
}

export default UserInfo;