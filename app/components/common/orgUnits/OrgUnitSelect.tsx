import {
    getAllParents,
    getAllTopLevelUnits,
    getOrgUnitAndAllNestedChildren,
    getOrgUnitByChildrenRef,
} from '~/components/common/orgUnits/utils';
import { Accordion, AccordionItem } from '~/components/common/orgUnits/CustomAccordion';
import {
    BodyShort,
    Box,
    Checkbox,
    CheckboxGroup,
    HStack,
    Label,
    Switch,
    TextField,
} from '@navikt/ds-react';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface OrgUnitAllocationProps {
    allOrgUnits: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: Dispatch<SetStateAction<IUnitItem[]>>;
    selectType?: 'filter' | 'allocation';
    aggregated?: boolean;
    setAggregated?: Dispatch<SetStateAction<boolean>>;
}

const OrgUnitSelect = ({
    allOrgUnits,
    selectedOrgUnits,
    setSelectedOrgUnits,
    selectType = 'filter',
    aggregated,
    setAggregated,
}: OrgUnitAllocationProps) => {
    const topLevelUnits = useMemo(() => getAllTopLevelUnits(allOrgUnits), [allOrgUnits]);
    const [selectedIds, setSelectedIds] = useState<string[]>(
        selectedOrgUnits.map((unit) => unit.organisationUnitId)
    );
    const accordionItemsToOpenOnRender = useMemo(
        () => getAllParents(selectedOrgUnits, allOrgUnits),
        [selectedOrgUnits, allOrgUnits]
    );

    useEffect(() => {
        if (selectedOrgUnits.length === 0 && selectedIds.length > 0) {
            setSelectedIds([]);
        }
    }, [selectedIds.length, selectedOrgUnits]);

    const updateNewSelectionAndKeepLimitInputs = useCallback(
        (selectedOrgUnitsWithAllChildren: IUnitItem[]) => {
            setSelectedOrgUnits((prevSelectedOrgUnits) => {
                const newOrgUnits = selectedOrgUnitsWithAllChildren.filter(
                    (newUnit) =>
                        !prevSelectedOrgUnits.some(
                            (prevUnit) => prevUnit.organisationUnitId === newUnit.organisationUnitId
                        )
                );

                const remainingOrgUnits = prevSelectedOrgUnits.filter((prevUnit) =>
                    selectedOrgUnitsWithAllChildren.some(
                        (newUnit) => newUnit.organisationUnitId === prevUnit.organisationUnitId
                    )
                );

                return [...remainingOrgUnits, ...newOrgUnits];
            });
        },
        [setSelectedOrgUnits]
    );

    const updateSelectedOrgUnits = useCallback(
        (ids: string[], isAggregated?: boolean) => {
            const currentSelectedOrgUnits = allOrgUnits.filter((unit) =>
                ids.includes(unit.organisationUnitId)
            );
            if (isAggregated) {
                let selectedOrgUnitsWithAllChildren = getOrgUnitAndAllNestedChildren(
                    currentSelectedOrgUnits,
                    allOrgUnits
                );
                const removedOrgUnits = selectedOrgUnits.filter(
                    (selectedUnit) =>
                        !currentSelectedOrgUnits.some(
                            (currentUnit) =>
                                currentUnit.organisationUnitId === selectedUnit.organisationUnitId
                        )
                );
                if (removedOrgUnits.length) {
                    const allOrgUnitsToRemove = getOrgUnitAndAllNestedChildren(
                        removedOrgUnits,
                        allOrgUnits
                    );
                    selectedOrgUnitsWithAllChildren = selectedOrgUnitsWithAllChildren.filter(
                        (unit) => !allOrgUnitsToRemove.includes(unit)
                    );
                }
                setSelectedIds(
                    selectedOrgUnitsWithAllChildren.map((unit) => unit.organisationUnitId)
                );
                updateNewSelectionAndKeepLimitInputs(selectedOrgUnitsWithAllChildren);
            } else {
                setSelectedIds(ids);
                updateNewSelectionAndKeepLimitInputs(currentSelectedOrgUnits);
            }
        },
        [allOrgUnits, selectedOrgUnits, setSelectedOrgUnits]
    );

    const handleLimitChange = useCallback(
        (id: string, limit: number | undefined) => {
            setSelectedOrgUnits((prevSelected) =>
                prevSelected.map((unit) =>
                    unit.organisationUnitId === id ? { ...unit, limit } : unit
                )
            );
        },
        [setSelectedOrgUnits]
    );

    const handleSwitchAggregated = useCallback(
        (newAggregated: boolean) => {
            if (setAggregated) {
                setAggregated(newAggregated);
            }
            updateSelectedOrgUnits(selectedIds, newAggregated);
        },
        [setAggregated, selectedIds, updateSelectedOrgUnits]
    );

    const handleChange = useCallback(
        (ids: string[]): void => {
            updateSelectedOrgUnits(ids, aggregated);
        },
        [aggregated, updateSelectedOrgUnits]
    );

    return (
        <HStack>
            {selectType === 'filter' && (
                <Box paddingInline={'4'} paddingBlock={'0 4'}>
                    <Switch
                        id="sub-org-unit-switch"
                        checked={aggregated}
                        onChange={(event) => handleSwitchAggregated(event.target.checked)}>
                        Inkluder underliggende enheter
                    </Switch>
                </Box>
            )}
            {selectType === 'allocation' && (
                <HStack width={'100%'} justify={'end'} paddingInline={'4'}>
                    <Label size="small" htmlFor="org-unit-amount">
                        Max antall tilganger per enhet
                    </Label>
                </HStack>
            )}
            <Accordion>
                <CheckboxGroup
                    legend="Velg organisasjonsenhet"
                    hideLegend
                    value={selectedIds}
                    onChange={handleChange}>
                    {topLevelUnits.map((unit) => (
                        <CheckboxTreeNode
                            key={unit.id}
                            unit={unit}
                            isAggregated={aggregated}
                            orgUnitList={allOrgUnits}
                            selectedIds={selectedIds}
                            selectedOrgUnits={selectedOrgUnits}
                            handleLimitChange={handleLimitChange}
                            selectType={selectType}
                            openOnRender={accordionItemsToOpenOnRender}
                        />
                    ))}
                </CheckboxGroup>
            </Accordion>
        </HStack>
    );
};

interface CheckboxTreeNodeProps {
    unit: IUnitItem;
    orgUnitList: IUnitItem[];
    selectedIds: string[];
    selectedOrgUnits: IUnitItem[];
    isAggregated?: boolean;
    handleLimitChange: (orgUnitId: string, limit: number | undefined) => void;
    selectType?: 'filter' | 'allocation';
    openOnRender: IUnitItem[];
}

const CheckboxTreeNode = ({
    unit,
    orgUnitList,
    selectedIds,
    selectedOrgUnits,
    isAggregated,
    handleLimitChange,
    selectType = 'filter',
    openOnRender = [],
}: CheckboxTreeNodeProps) => {
    const children = useMemo(
        () => getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef),
        [orgUnitList, unit.childrenRef]
    );
    const currentUnit = useMemo(
        () => selectedOrgUnits.find((u) => u.organisationUnitId === unit.organisationUnitId),
        [selectedOrgUnits, unit.organisationUnitId]
    );
    const disabled = useMemo(
        () =>
            isAggregated &&
            selectedOrgUnits.some(
                (selectedUnit) => selectedUnit.organisationUnitId === unit.parentRef
            ),
        [isAggregated, selectedOrgUnits, unit.parentRef]
    );

    const isTopLevel = unit.parentRef === unit.organisationUnitId;
    const isEnabled = selectedIds.includes(unit.organisationUnitId);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleTextFieldChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.trim();

            if (!value) {
                setErrorMessage('Du må oppgi antall');
                handleLimitChange(unit.organisationUnitId, undefined);
                return;
            }

            const limit = Number(value);
            if (Number.isNaN(limit) || limit < 1) {
                setErrorMessage('Verdien må være et heltall større enn 0');
                handleLimitChange(unit.organisationUnitId, undefined);
                return;
            }

            setErrorMessage(undefined);
            handleLimitChange(unit.organisationUnitId, limit);
        },
        [handleLimitChange, unit.organisationUnitId]
    );

    useEffect(() => {
        if (!isEnabled) {
            setErrorMessage(undefined);
        }
    }, [isEnabled]);

    return (
        <AccordionItem
            paddingInline={isTopLevel ? '0' : '8 0'}
            initialState={
                isTopLevel ||
                openOnRender.some(
                    (openUnit) => openUnit.organisationUnitId === unit.organisationUnitId
                )
            }
            title={
                <HStack
                    width="100%"
                    align="center"
                    justify="space-between"
                    style={{ textAlign: 'start' }}
                    wrap={false}>
                    <HStack align={'center'} gap={'2'}>
                        <Checkbox
                            name="orgUnit"
                            className="org-unit-checkbox"
                            id={unit.organisationUnitId}
                            value={unit.organisationUnitId}
                            disabled={!isTopLevel && disabled}
                            hideLabel>
                            {unit.name}
                        </Checkbox>
                        <Label htmlFor={unit.organisationUnitId}>
                            <BodyShort
                                textColor={
                                    !isTopLevel && disabled && selectType === 'filter'
                                        ? 'subtle'
                                        : 'default'
                                }>
                                {unit.name}
                            </BodyShort>
                        </Label>
                    </HStack>
                    {selectType === 'allocation' && (
                        <HStack gap="2" align="center">
                            {isEnabled && (
                                <Label
                                    htmlFor={`antall-${unit.organisationUnitId}`}
                                    style={{
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'var(--a-text-danger)',
                                    }}>
                                    *
                                </Label>
                            )}
                            <TextField
                                id={`antall-${unit.organisationUnitId}`}
                                label="Antall"
                                hideLabel
                                inputMode="numeric"
                                size="small"
                                type="number"
                                min={1}
                                disabled={!isEnabled}
                                className="org-unit-amount"
                                value={isEnabled ? (currentUnit?.limit?.toString() ?? '') : ''}
                                error={isEnabled && errorMessage}
                                onChange={handleTextFieldChange}
                            />
                        </HStack>
                    )}
                </HStack>
            }>
            {children &&
                children.length > 0 &&
                children.map((child) => (
                    <CheckboxTreeNode
                        key={child.id}
                        unit={child}
                        orgUnitList={orgUnitList}
                        selectedIds={selectedIds}
                        selectedOrgUnits={selectedOrgUnits}
                        isAggregated={isAggregated}
                        handleLimitChange={handleLimitChange}
                        selectType={selectType}
                        openOnRender={openOnRender}
                    />
                ))}
        </AccordionItem>
    );
};

export default OrgUnitSelect;
