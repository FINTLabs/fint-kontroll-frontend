import { BodyShort, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { StatusTag } from '~/components/service-admin/StatusTag';
import { useState } from 'react';
import { ChevronDownIcon } from '@navikt/aksel-icons';

export const InfoBox = ({
    title,
    tagText,
    info,
    maxColumns,
    moreInfo,
    moreInfoComponent,
}: {
    title: string;
    tagText?: string;
    info: { label: string; value: string }[];
    moreInfo?: { label: string; value: string }[];
    moreInfoComponent?: React.ReactNode;
    maxColumns?: 2 | 3;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <VStack
            align="center"
            width={'100%'}
            id={'info-box'}
            marginBlock={'4 8'}
            className={`info-box ${isOpen ? 'open' : 'closed'}`}>
            <Box
                paddingInline="8"
                paddingBlock={moreInfo ? '8 0' : '8 12'}
                borderRadius="xlarge"
                width={'100%'}
                maxWidth={'1440px'}
                style={{
                    borderColor: 'var(--red-primary)',
                }}
                borderWidth={'2'}
                id="info-box">
                <VStack gap={'4'}>
                    <HStack align={'center'} justify={'center'} gap={'8'} paddingInline={'8'}>
                        <Heading size="large" level="1" style={{ color: 'var(--red-primary)' }}>
                            {title}
                        </Heading>
                        {tagText && <StatusTag status={tagText} />}
                    </HStack>
                    <Box
                        borderWidth={'1 0 0 0'}
                        style={{ borderColor: 'var(--red-primary)' }}
                        marginInline={'12'}
                        marginBlock={'2 4'}
                    />

                    <Box
                        paddingInline={{
                            xs: '8',
                            xl: maxColumns === 2 ? '32 12' : '8',
                        }}>
                        <HGrid
                            as={'ul'}
                            gap={'6 4'}
                            align={'start'}
                            columns={{
                                sm: 1,
                                md: 2,
                                '2xl': `repeat(${maxColumns ?? 'auto-fit'}, minmax(20rem, 1fr))`,
                            }}>
                            {info.map(
                                (item, index) =>
                                    item.value && (
                                        <VStack width={'fit-content'} as={'li'} key={index}>
                                            <Heading
                                                size="small"
                                                level="3"
                                                style={{ color: 'var(--red-primary)' }}>
                                                {item.label}
                                            </Heading>
                                            <BodyShort
                                                textColor={'subtle'}
                                                style={{ wordBreak: 'break-word' }}>
                                                {item.value}
                                            </BodyShort>
                                        </VStack>
                                    )
                            )}
                            {isOpen &&
                                moreInfo &&
                                moreInfo.length > 0 &&
                                moreInfo.map(
                                    (item, index) =>
                                        item.value && (
                                            <VStack width={'fit-content'} as={'li'} key={index}>
                                                <Heading
                                                    size="small"
                                                    level="3"
                                                    style={{ color: 'var(--red-primary)' }}>
                                                    {item.label}
                                                </Heading>
                                                <BodyShort
                                                    textColor={'subtle'}
                                                    style={{ wordBreak: 'break-word' }}>
                                                    {item.value}
                                                </BodyShort>
                                            </VStack>
                                        )
                                )}
                            {isOpen && moreInfoComponent && moreInfoComponent}
                        </HGrid>
                        {moreInfo && moreInfo.length > 0 && (
                            <VStack
                                width={'100%'}
                                aria-expanded={isOpen ? 'true' : 'false'}
                                align={'center'}
                                marginBlock={'4'}>
                                <Button
                                    className={'info-box-accordion'}
                                    size={'small'}
                                    variant={'tertiary'}
                                    aria-label={isOpen ? 'Se mindre' : 'Se mer'}
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                    }}
                                    icon={
                                        <ChevronDownIcon
                                            className={`chevron-icon ${isOpen ? 'open' : 'closed'}`}
                                            fontSize={'3rem'}
                                        />
                                    }
                                />
                            </VStack>
                        )}
                    </Box>
                </VStack>
            </Box>
        </VStack>
    );
};
