import {Bleed, Box, Heading, HGrid, Page, VStack} from "@navikt/ds-react";
import {ReactNode} from "react";

interface CustomLinkPanelProps {
    color?: string;
    children: ReactNode;
    title?: string;
    bleed?: boolean;
}

export const LinkCardGrid = ({color, title, bleed = true, children}: CustomLinkPanelProps) =>
    <Bleed marginInline={bleed ? "full" : "12"} asChild>
        <Box paddingBlock="4" paddingInline="12" className="p" style={{backgroundColor: color}}>
            <Page.Block width={"2xl"}>
                <VStack gap="4" paddingBlock={"4"}>
                    {title &&
                        <Heading level="2" size="medium" style={{color: 'var(--red-dark)'}}>{title}</Heading>
                    }
                    <HGrid gap="6" columns={{md: 1, lg: 2}} paddingBlock={"4 8"} color={color}>
                        {children}
                    </HGrid>
                </VStack>
            </Page.Block>
        </Box>
    </Bleed>