import { BodyShort, Box, Heading, HGrid, Hide, HStack, VStack } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import * as React from 'react';

export const InfoBox = ({
    title,
    info,
    maxColumns,
}: {
    title: string;
    info: { label: string; value: string }[];
    maxColumns?: number;
}) => {
    return (
        <VStack align="center" width={'100%'}>
            <Box
                id="info-box"
                className="info-box"
                padding="8"
                borderRadius="xlarge"
                width={'100%'}
                maxWidth={'1440px'}>
                <VStack gap={'4'}>
                    <HStack align={'center'} justify={'center'} gap={'8'}>
                        <Heading size="xlarge" level="1">
                            {title}
                        </Heading>
                    </HStack>
                    <HStack wrap={false} align={'center'} justify={'center'} gap={'8'}>
                        <Hide asChild below="md">
                            <hr />
                        </Hide>
                        <InformationSquareIcon title="info" fontSize="3rem" color={'#F76650'} />
                        <Hide asChild below="md">
                            <hr />
                        </Hide>
                    </HStack>
                    <Box
                        paddingInline={{
                            xs: '8',
                            xl: '24',
                        }}>
                        <ul className="full-width list-style-none">
                            <HGrid
                                gap={'6 4'}
                                columns={{
                                    xs: 1,
                                    lg: 2,
                                    '2xl': maxColumns ?? 'repeat(auto-fit, minmax(15rem, 1fr))',
                                }}>
                                {info.map(
                                    (item, index) =>
                                        item.value && (
                                            <li key={index}>
                                                <Heading size="small" level="3">
                                                    {item.label}
                                                </Heading>
                                                <BodyShort textColor={'subtle'}>
                                                    {item.value}
                                                </BodyShort>
                                            </li>
                                        )
                                )}
                            </HGrid>
                        </ul>
                    </Box>
                </VStack>
            </Box>
        </VStack>
    );
};
