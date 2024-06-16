import * as React from "react";
import {BodyShort, Box, GuidePanel, Heading, List} from "@navikt/ds-react";
import {IUser, IUserDetails} from "~/data/types";
import {InformationIcon} from "@navikt/aksel-icons";

export const UserInfo: any = (props: { user: IUserDetails }) => {

    return (
        <>
            <GuidePanel poster={true} illustration={<InformationIcon title="a11y-title"/>}>
                <Box className={"infoIconSection"}>
                    <hr/>
                    <Heading size="medium" level="2">Person- og kontaktinformasjon</Heading>
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
                            <BodyShort textColor="subtle">{props.user.userName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">Organisasjonsenhet</Heading>
                            <BodyShort textColor="subtle" id={"org-unit"}>{props.user.organisationUnitName}</BodyShort>
                        </li>
                        <li>
                            <Heading size="small" level="3">E-post</Heading>
                            <BodyShort textColor="subtle">{props.user.email}</BodyShort>
                        </li>
                    </List>
                </Box>

            </GuidePanel>
        </>
    );
}

export default UserInfo;