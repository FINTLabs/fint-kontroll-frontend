import type {IUnitItem} from "~/data/types";
import {
    getOrgUnitAndAllNestedChildren,
    getAllTopLevelUnits,
    getOrgUnitByChildrenRef,
    getAllParents
} from "~/components/common/orgUnits/utils";
import {Accordion, AccordionItem} from "~/components/common/orgUnits/CustomAccordion";
import {BodyShort, Box, Checkbox, CheckboxGroup, HStack, Label, Switch, TextField} from "@navikt/ds-react";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from "react";

interface OrgUnitAllocationProps {
    allOrgUnits: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: Dispatch<SetStateAction<IUnitItem[]>>;
    selectType?: "filter" | "allocation";
    aggregated?: boolean;
    setAggregated?: Dispatch<SetStateAction<boolean>>;
}

const OrgUnitSelect = (
    {
        allOrgUnits,
        selectedOrgUnits,
        setSelectedOrgUnits,
        selectType = "filter",
        aggregated,
        setAggregated
    }: OrgUnitAllocationProps) => {
    const topLevelUnits = useMemo(() => getAllTopLevelUnits(allOrgUnits), [allOrgUnits]);
    const [selectedIds, setSelectedIds] = useState<string[]>(selectedOrgUnits.map(unit => unit.organisationUnitId));
    const accordionItemsToOpenOnRender = useMemo(() => getAllParents(selectedOrgUnits, allOrgUnits), [selectedOrgUnits, allOrgUnits]);

    useEffect(() => {
        if (selectedOrgUnits.length === 0 && selectedIds.length > 0) {
            setSelectedIds([]);
        }
    }, [selectedIds.length, selectedOrgUnits]);

    const updateSelectedOrgUnits = useCallback((ids: string[], isAggregated?: boolean) => {
        const currentSelectedOrgUnits = allOrgUnits.filter(unit => ids.includes(unit.organisationUnitId));

        if (isAggregated) {
            let selectedOrgUnitsWithAllChildren = getOrgUnitAndAllNestedChildren(currentSelectedOrgUnits, allOrgUnits);

            const removedOrgUnits = selectedOrgUnits.filter(unit => !currentSelectedOrgUnits.includes(unit));
            if (removedOrgUnits.length) {
                const allOrgUnitsToRemove = getOrgUnitAndAllNestedChildren(removedOrgUnits, allOrgUnits);
                selectedOrgUnitsWithAllChildren = selectedOrgUnitsWithAllChildren.filter(
                    unit => !allOrgUnitsToRemove.includes(unit)
                );
            }

            setSelectedIds(selectedOrgUnitsWithAllChildren.map(unit => unit.organisationUnitId));
            setSelectedOrgUnits(selectedOrgUnitsWithAllChildren);
        } else {
            setSelectedIds(ids);
            setSelectedOrgUnits(currentSelectedOrgUnits);
        }
    }, [allOrgUnits, selectedOrgUnits, setSelectedOrgUnits]);

    const handleLimitChange = useCallback((id: string, limit: number) => {
        setSelectedOrgUnits(prevSelected =>
            prevSelected.map(unit =>
                unit.organisationUnitId === id ? {...unit, limit} : unit
            )
        );
    }, [setSelectedOrgUnits]);

    const handleSwitchAggregated = useCallback((newAggregated: boolean) => {
        if (setAggregated) {
            setAggregated(newAggregated);
        }
        updateSelectedOrgUnits(selectedIds, newAggregated);
    }, [setAggregated, selectedIds, updateSelectedOrgUnits]);

    const handleChange = useCallback((ids: string[]): void => {
        updateSelectedOrgUnits(ids, aggregated || selectType === "allocation");
    }, [aggregated, selectType, updateSelectedOrgUnits]);

    return (
        <HStack>
            {selectType === "filter" && (
                <Box paddingInline={"4"} paddingBlock={"0 4"}>
                    <Switch
                        id="sub-org-unit-switch"
                        checked={aggregated}
                        onChange={(event) => handleSwitchAggregated(event.target.checked)}
                    >
                        Inkluder underliggende enheter
                    </Switch>
                </Box>
            )}
            {selectType === "allocation" && (
                <HStack width={"100%"} justify={"end"} paddingInline={"4"}>
                    <Label size="small" htmlFor="org-unit-amount">
                        Max antall tilganger per enhet
                    </Label>
                </HStack>
            )}
            <Accordion>
                <CheckboxGroup legend="Velg organisasjonsenhet" hideLegend value={selectedIds} onChange={handleChange}>
                    {topLevelUnits.map(unit => (
                        <CheckboxTreeNode
                            key={unit.id}
                            unit={unit}
                            isAggregated={aggregated || selectType === "allocation"}
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
    handleLimitChange: (orgUnitId: string, limit: number) => void;
    selectType?: "filter" | "allocation";
    openOnRender: IUnitItem[];
}

const CheckboxTreeNode = (
    {
        unit,
        orgUnitList,
        selectedIds,
        selectedOrgUnits,
        isAggregated,
        handleLimitChange,
        selectType = "filter",
        openOnRender = []
    }: CheckboxTreeNodeProps) => {
    const children = useMemo(() => getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef), [orgUnitList, unit.childrenRef]);
    const currentUnit = useMemo(() => selectedOrgUnits.find(u => u.organisationUnitId === unit.organisationUnitId), [selectedOrgUnits, unit.organisationUnitId]);
    const disabled = useMemo(() => isAggregated && selectedOrgUnits.some(selectedUnit => selectedUnit.organisationUnitId === unit.parentRef), [isAggregated, selectedOrgUnits, unit.parentRef]);
    const isTopLevel = useMemo(() => unit.parentRef === unit.organisationUnitId, [unit]);

    const handleTextFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const limit = value ? Number(value) : 0;
        if (!isNaN(limit)) {
            handleLimitChange(unit.organisationUnitId, limit);
        }
    }, [handleLimitChange, unit.organisationUnitId]);

    return (
        <AccordionItem
            paddingInline={isTopLevel ? "0" : "8 0"}
            initialState={isTopLevel || openOnRender.some(openUnit => openUnit.organisationUnitId === unit.organisationUnitId)}
            title={
                <HStack
                    width="100%"
                    align="center"
                    justify="space-between"
                    style={{textAlign: "start"}}
                    wrap={false}
                >
                    <HStack align={"center"} gap={"2"}>
                        <Checkbox
                            name="orgUnit"
                            className="org-unit-checkbox"
                            id={unit.organisationUnitId}
                            value={unit.organisationUnitId}
                            disabled={!isTopLevel && disabled}
                            hideLabel={true}
                        >
                            {unit.name}
                        </Checkbox>
                        <Label htmlFor={unit.organisationUnitId}><BodyShort
                            textColor={!isTopLevel && disabled && selectType === "filter" ? "subtle" : "default"}>
                            {unit.name}
                        </BodyShort></Label>
                    </HStack>
                    {selectType === "allocation" && (
                        <TextField
                            className={"org-unit-amount"}
                            inputMode={"numeric"}
                            size="small"
                            label="Antall"
                            hideLabel
                            disabled={!selectedIds.includes(unit.organisationUnitId)}
                            min={1}
                            value={selectedIds.includes(unit.organisationUnitId) ? (currentUnit?.limit ?? "") : ""}
                            onChange={handleTextFieldChange}
                            onError={(e) => {
                                console.log("error", e)
                                return "Ugyldig antall"
                            }}
                        />
                    )}
                </HStack>
            }
        >
            {children && children.length > 0 && children.map(child => (
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