import {BodyShort, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {ArrowRightIcon} from '@navikt/aksel-icons';
import React, {ReactElement} from "react";

type Color = "blue" | "red" | "orange" | "beige"

type ColorProfile = {
    iconColor: string;
    arrowColor: string;
}

const colorProfiles: Record<Color, ColorProfile> = {
    blue: {
        iconColor: "var(--blue-40)",
        arrowColor: "var(--blue-primary)",
    },
    red: {
        iconColor: "var(--red-primary)",
        arrowColor: "var(--red-primary)",
    },
    orange: {
        iconColor: "var(--orange-40)",
        arrowColor: "var(--orange-primary)",
    },
    beige: {
        iconColor: "var(--beige-primary)",
        arrowColor: "var(--beige-darker)"
    }
}

type CustomLinkPanelProps = {
    title: string;
    description?: string;
    link: string;
    Icon?: ReactElement
    colorProfile: Color
}

export const LinkCard = (
    {
        title,
        description,
        link,
        Icon,
        colorProfile = "blue"
    }: CustomLinkPanelProps) => {
    return (
        <Box as="a" padding="8" borderRadius="large" href={link} className={`link-card ${colorProfile}`}>
            <VStack gap="4" height="100%">
                <HStack wrap={false} gap="4" width="100%" align="center">
                    {Icon && (
                        <Box
                            className="circle"
                            borderRadius="full"
                            padding="2"
                            style={{backgroundColor: colorProfiles[colorProfile].iconColor}}
                            width="3.5rem"
                            height="3.5rem"
                        >
                            {React.cloneElement(Icon, {
                                fontSize: "2.5rem",
                                title,
                                color: colorProfile === "red" ? "white" : "var(--a-text-default)"
                            })}
                        </Box>
                    )}
                    <Heading level="2" size="small">{title}</Heading>
                    {!description && (
                        <VStack marginInline={"auto 0"} align={"center"}>
                            <ArrowRightIcon
                                color={colorProfiles[colorProfile].arrowColor}
                                className="arrow-icon"
                                fontSize="2rem"
                            />
                        </VStack>
                    )}
                </HStack>
                {description && (
                    <VStack gap="2" height="100%">
                        <hr style={{backgroundColor: colorProfiles[colorProfile].arrowColor}}/>
                        <HStack wrap={false} gap="4" height="100%" justify={"space-between"}>
                            <BodyShort size="small">{description}</BodyShort>
                            <HStack height="100%" align="center">
                                <ArrowRightIcon
                                    color={colorProfiles[colorProfile].arrowColor}
                                    className="arrow-icon"
                                    fontSize="2rem"
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
}

/*
Farge: #F76650 orange
20 % lysere: #FB9582
40 % lysere: #FDC3B4
60 % lysere: #FFE0D5
80 % lysere: #FFF4F1

mørk rød #570F31

Farge: #6B133D  rød
20 % lysere: #8C3E62
40 % lysere: #AD697F
60 % lysere: #CF93A3
80 % lysere: #EBC1C9

Farge: #7F78E8  blå
20 % lysere: #A19CF0
40 % lysere: #C3BEF7
60 % lysere: #CCC9F6
80 % lysere: #E5E4FA

Farge: #F8ECDC
20 % lysere: #FAF1E5
40 % lysere: #FCF5ED
60 % lysere: #FDF9F5
80 % lysere: #FEFCFA*/