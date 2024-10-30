import {BodyShort, Box, BoxProps, Heading, HStack, VStack} from "@navikt/ds-react";

type CustomLinkPanelProps = {
    title: string;
    description?: string;
    link: string;
    Image?: any
    backgroundColor?: BoxProps["background"]
}
export const CustomLink = ({title, description, link, Image, backgroundColor}: CustomLinkPanelProps) => {
    return (
        <Box
            as={"a"}
            padding="4"
            // background="surface-action-subtle"
            borderRadius="large"
            href={link}
            className={"custom-link"}
            background={backgroundColor || "surface-action-subtle"}
/*
            background={backgroundColor ?? "-a-surface-action-subtle"}
*/

        >
            <HStack wrap={false} align={"center"} gap="4">
                {Image &&
                    <Box className={"full-height"}>
                        {Image}
                    </Box>
                }
                <VStack>
                    <Heading level="2" size="small">
                        {title}
                    </Heading>
                    {description && <BodyShort size="small">{description}</BodyShort>}
                </VStack>
            </HStack>
        </Box>
    );
}