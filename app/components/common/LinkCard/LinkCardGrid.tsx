import { Bleed, Box, Heading, HGrid, Page, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface CustomLinkPanelProps {
    color?: string;
    children: ReactNode;
    title?: string;
    bleed?: boolean;
}

export const LinkCardGrid = ({ color, title, bleed = true, children }: CustomLinkPanelProps) => (
    <Bleed marginInline={bleed ? 'full' : 'space-20'} asChild>
        <Box
            paddingBlock="space-16"
            paddingInline="space-20"
            className="p"
            style={{ backgroundColor: color }}>
            <Page.Block width={'2xl'}>
                <VStack gap="space-12" paddingBlock={'space-8 space-0'}>
                    {title && (
                        <Heading level="2" size="medium" style={{ color: 'var(--red-dark)' }}>
                            {title}
                        </Heading>
                    )}
                    <HGrid
                        gap="space-20"
                        columns={{ md: 1, lg: 2 }}
                        paddingBlock={'space-8 space-20'}
                        color={color}>
                        {children}
                    </HGrid>
                </VStack>
            </Page.Block>
        </Box>
    </Bleed>
);
