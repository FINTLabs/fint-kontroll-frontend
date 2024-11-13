import * as React from "react";
import {BodyShort, Box, Heading, Hide, HStack, VStack} from "@navikt/ds-react";
import {IUserDetails} from "~/data/types";
import {InformationSquareIcon} from "@navikt/aksel-icons";

export const UserInfo: any = (props: { user: IUserDetails }) => {

    return (
        <>
            <Box className="info-box" padding="8" borderRadius="xlarge">
                <VStack gap={"4"}>
                    <HStack align={"center"} justify={"center"} gap={"8"}>
                        <Heading size="xlarge" level="1">Brukerinformasjon</Heading>
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
                    <Box paddingInline="24 4">
                        <ul className="user-information-list">
                            <li>
                                <Heading size="small" level="3">Navn</Heading>
                                <BodyShort textColor={"subtle"} id="user-full-name">{props.user.fullName}</BodyShort>
                            </li>
                            <li>
                                <Heading size="small" level="3">Brukernavn</Heading>
                                <BodyShort textColor={"subtle"}>{props.user.userName}</BodyShort>
                            </li>
                            <li>
                                <Heading size="small" level="3">Organisasjonsenhet</Heading>
                                <BodyShort textColor={"subtle"}
                                           id={"org-unit"}>{props.user.organisationUnitName}</BodyShort>
                            </li>
                            <li>
                                <Heading size="small" level="3">E-post</Heading>
                                <BodyShort textColor={"subtle"}>{props.user.email}</BodyShort>
                            </li>
                        </ul>

                    </Box>

                </VStack>
            </Box>
        </>
    );
}

export default UserInfo;