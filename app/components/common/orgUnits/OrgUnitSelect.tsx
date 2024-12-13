import type {IUnitItem} from "~/data/types";
import {
    getOrgUnitAndAllNestedChildren,
    getAllTopLevelUnits,
    getOrgUnitByChildrenRef,
} from "~/components/common/orgUnits/utils";
import {Accordion, AccordionItem} from "~/components/common/orgUnits/CustomAccordion";
import {BodyShort, Box, Checkbox, CheckboxGroup, HStack, Label, Switch, TextField} from "@navikt/ds-react";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

interface OrgUnitAllocationProps {
    allOrgUnits: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: Dispatch<SetStateAction<IUnitItem[]>>;
    selectType?: "filter" | "allocation";
    aggregated?: boolean;
    setAggregated?: Dispatch<SetStateAction<boolean>>;
}

// TODO: finn ut av hvordan jeg kan åpne alle accordions whis en av de nested children er selected

const OrgUnitSelect = (
    {
        allOrgUnits,
        selectedOrgUnits,
        setSelectedOrgUnits,
        selectType = "filter",
        aggregated,
        setAggregated
    }: OrgUnitAllocationProps) => {
    const topLevelUnits = getAllTopLevelUnits(allOrgUnits);
    const [selectedIds, setSelectedIds] = useState<string[]>(selectedOrgUnits.map(unit => unit.organisationUnitId));

    useEffect(() => {
        if (selectedOrgUnits.length === 0 && selectedIds.length > 0) {
            setSelectedIds([]);
        }
    }, [selectedIds.length, selectedOrgUnits]);

    const updateSelectedOrgUnits = (ids: string[], isAggregated?: boolean) => {
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
    };

    const handleLimitChange = (id: string, limit: number) => {
        setSelectedOrgUnits(prevSelected =>
            prevSelected.map(unit =>
                unit.organisationUnitId === id ? {...unit, limit} : unit
            )
        );
    };

    const handleSwitchAggregated = (newAggregated: boolean) => {
        if (setAggregated) {
            setAggregated(newAggregated);
        }
        updateSelectedOrgUnits(selectedIds, newAggregated);
    };

    const handleChange = (ids: string[]): void => {
        updateSelectedOrgUnits(ids, aggregated || selectType === "allocation");
    };

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
                    <Label
                        size="small"
                        htmlFor="org-unit-amount"
                    >
                        Max antall tilganger per enhet
                    </Label>
                </HStack>
            )}
            <Accordion>
                <CheckboxGroup legend="Velg organisasjonsenhet" hideLegend value={selectedIds} onChange={handleChange}>
                    {topLevelUnits.map(unit => (
                        <CheckboxTreeNode
                            isTopLevel
                            key={unit.id}
                            unit={unit}
                            isAggregated={aggregated || selectType === "allocation"}
                            orgUnitList={allOrgUnits}
                            selectedIds={selectedIds}
                            selectedOrgUnits={selectedOrgUnits}
                            handleLimitChange={handleLimitChange}
                            selectType={selectType}
                        />
                    ))}
                </CheckboxGroup>
            </Accordion>
        </HStack>

    )
        ;
};

interface CheckboxTreeNodeProps {
    isTopLevel?: boolean;
    unit: IUnitItem;
    orgUnitList: IUnitItem[];
    selectedIds: string[];
    selectedOrgUnits: IUnitItem[];
    isAggregated?: boolean;
    handleLimitChange: (orgUnitId: string, limit: number) => void;
    selectType?: "filter" | "allocation";
}

const CheckboxTreeNode = (
    {
        isTopLevel,
        unit,
        orgUnitList,
        selectedIds,
        selectedOrgUnits,
        isAggregated,
        handleLimitChange,
        selectType = "filter"
    }: CheckboxTreeNodeProps) => {
    const children = getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef);
    const currentUnit = selectedOrgUnits.find(u => u.organisationUnitId === unit.organisationUnitId);
    const disabled = isAggregated && selectedOrgUnits.some(selectedUnit => selectedUnit.organisationUnitId === unit.parentRef);

    return (
        <AccordionItem
            isTopLevel={isTopLevel}
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
                            type="number"
                            size="small"
                            label="Antall"
                            hideLabel
                            disabled={!selectedIds.includes(unit.organisationUnitId)}
                            min={1}
                            value={!selectedIds.includes(unit.organisationUnitId) ? "" : currentUnit?.limit}
                            onChange={e => {
                                handleLimitChange(unit.organisationUnitId, parseInt(e.target.value))
                            }}
                            onError={(e) => {
                                console.log("error", e)
                                return "Ugyldig antall"
                            }}
                        />
                    )}
                </HStack>
            }
        >
            {/*(selectType === "filter" || (selectType === "allocation" && !selectedIds.includes(unit.organisationUnitId))) */}
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
                />
            ))}
        </AccordionItem>
    );
};

export default OrgUnitSelect;