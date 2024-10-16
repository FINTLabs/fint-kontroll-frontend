import {BodyShort, Box, Heading, VStack} from "@navikt/ds-react";

type CustomLinkPanelProps = {
    title: string;
    description?: string;
    link: string;
}
export const CustomLink = ({title, description, link}: CustomLinkPanelProps) => {
    return (
        <Box
            as={"a"}
            padding="4"
            // background="surface-action-subtle"
            borderRadius="large"
            href={link}
            className={"custom-link"}

        >
            <VStack>
                <Heading size="small">
                    {title}
                </Heading>
                {description && <BodyShort size="small">{description}</BodyShort>}
            </VStack>
        </Box>
    );
}