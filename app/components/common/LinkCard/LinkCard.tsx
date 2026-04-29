import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import React, { ReactElement } from 'react';

type Color = 'blue' | 'red' | 'orange' | 'beige';

type ColorProfile = {
    iconColor: string;
    arrowColor: string;
    hoverColor: string;
};

const colorProfiles: Record<Color, ColorProfile> = {
    blue: {
        iconColor: 'var(--blue-60)',
        arrowColor: 'var(--blue-primary)',
        hoverColor: 'var(--blue-40)',
    },
    red: {
        iconColor: 'var(--red-primary)',
        arrowColor: 'var(--red-primary)',
        hoverColor: 'var(--red-40)',
    },
    orange: {
        iconColor: 'var(--orange-40)',
        arrowColor: 'var(--orange-primary)',
        hoverColor: 'var(--orange-20)',
    },
    beige: {
        iconColor: 'var(--beige-primary)',
        arrowColor: 'var(--beige-darker)',
        hoverColor: 'var(--beige-40)',
    },
};

type CustomLinkPanelProps = {
    title: string;
    description?: string;
    link: string;
    Icon?: ReactElement<any>;
    colorProfile?: Color;
    hover?: boolean;
    border?: boolean;
};

export const LinkCard = ({
    title,
    description,
    link,
    Icon,
    colorProfile = 'blue',
    hover,
    border,
}: CustomLinkPanelProps) => {
    return (
        <Box
            as="a"
            padding="space-28"
            borderRadius="8"
            href={link}
            className={`link-card ${colorProfile} ${hover ? 'hoverColor' : ''}`}
            borderWidth={border ? '1' : undefined}>
            <VStack gap="space-12" height="100%">
                <HStack wrap={false} gap="space-12" width="100%" align="center">
                    {Icon && (
                        <Box
                            className="circle"
                            borderRadius="full"
                            padding="space-8"
                            style={{ backgroundColor: colorProfiles[colorProfile].iconColor }}
                            width="3.5rem"
                            height="3.5rem">
                            {React.cloneElement(Icon, {
                                fontSize: '2.5rem',
                                title,
                                color: colorProfile === 'red' ? 'white' : 'var(--a-text-default)',
                            })}
                        </Box>
                    )}
                    <Heading level="2" size="small">
                        {title}
                    </Heading>
                    {!description && (
                        <VStack marginInline={'auto space-0'} align={'center'}>
                            <ArrowRightIcon
                                color={colorProfiles[colorProfile].arrowColor}
                                className="arrow-icon"
                                fontSize="2rem"
                            />
                        </VStack>
                    )}
                </HStack>
                {description && (
                    <VStack gap="space-4" height="100%">
                        <hr style={{ backgroundColor: colorProfiles[colorProfile].arrowColor }} />
                        <HStack wrap={false} gap="space-8" height="100%" justify={'space-between'}>
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
};
