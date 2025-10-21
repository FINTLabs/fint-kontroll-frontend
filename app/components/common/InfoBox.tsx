import { BodyShort, Box, Button, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { StatusTag } from '~/components/service-admin/StatusTag';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@navikt/aksel-icons';

type Info = {
    label: string | React.ReactNode;
    value?: string;
};

export const InfoBox = ({
    title,
    tagText,
    info,
    maxColumns = 3,
    moreInfo,
    moreInfoComponent,
}: {
    title: string;
    tagText?: string;
    info: Info[];
    moreInfo?: Info[];
    moreInfoComponent?: React.ReactNode;
    maxColumns?: number;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const gridRef = useRef(null);
    const [visibleInfo, setVisibleInfo] = useState<Info[]>(info);
    const [remainingMoreInfo, setRemainingMoreInfo] = useState<Info[]>(moreInfo ?? []);
    const hasCalculated = useRef(false);

    useEffect(() => {
        if (!gridRef.current || moreInfo?.length === 0 || hasCalculated.current) return;

        const { gridTemplateRows, gridTemplateColumns } = window.getComputedStyle(gridRef.current);
        const rows = gridTemplateRows.split(' ').length;
        const columns = gridTemplateColumns.split(' ').length;

        const totalItems = rows * columns;
        const visibleItemsCount = info.filter((item) => item?.value?.trim()).length;
        const remainingItems = totalItems - visibleItemsCount;

        if (remainingItems > 0 && remainingMoreInfo) {
            const additionalItems = remainingMoreInfo.slice(0, remainingItems);
            setVisibleInfo([...info, ...additionalItems]);
            setRemainingMoreInfo(remainingMoreInfo.slice(remainingItems));
        }
        hasCalculated.current = true;
    }, [info]);
    return (
        <VStack
            align="center"
            width={'100%'}
            id={'info-box'}
            marginBlock={'4 8'}
            className={`info-box ${isOpen ? 'open' : 'closed'}`}>
            <Box
                paddingInline="8"
                paddingBlock={remainingMoreInfo && remainingMoreInfo.length > 0 ? '8 0' : '8 12'}
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
                            ref={gridRef}
                            as={'ul'}
                            gap={'6'}
                            align={'start'}
                            className={'info-box-gridx'}
                            columns={{
                                sm: 1,
                                md: 2,
                                '2xl': `repeat(${maxColumns}, minmax(auto, 1fr))`,
                            }}>
                            {visibleInfo.map(
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
                                remainingMoreInfo &&
                                remainingMoreInfo.length > 0 &&
                                remainingMoreInfo.map(
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
                        </HGrid>
                        {isOpen && moreInfoComponent !== undefined && (
                            <Box paddingBlock={'12 4'}>{moreInfoComponent}</Box>
                        )}
                        {((remainingMoreInfo && remainingMoreInfo.length > 0) ||
                            moreInfoComponent) && (
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
