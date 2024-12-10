import type {IUnitItem} from "~/data/types";
import {
    getAllNestedChildrenOrgUnits,
    getAllTopLevelUnits,
    getOrgUnitByChildrenRef,
    getUnitById
} from "~/components/common/orgUnits/utils";
import {Accordion, AccordionItem} from "~/components/common/orgUnits/CustomAccordion";
import {Checkbox, CheckboxGroup, HStack, TextField} from "@navikt/ds-react";
import React, {Dispatch, SetStateAction, useState} from "react";

interface OrgUnitAllocationProps {
    allOrgUnits: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: Dispatch<SetStateAction<IUnitItem[]>>;
    aggregated?: boolean;
    selectType?: "filter" | "allocation";
}

// TODO: merge this with the one with amount
const OrgUnitSelect = (
    {
        allOrgUnits,
        selectedOrgUnits,
        setSelectedOrgUnits,
        aggregated,
        selectType = "filter"
    }: OrgUnitAllocationProps) => {
    const topLevelUnits = getAllTopLevelUnits(allOrgUnits);
    const [selectedIds, setSelectedIds] = useState<string[]>(selectedOrgUnits.map(unit => unit.organisationUnitId));

    const handleChangeIfIsFilter = (ids: string[]) => {
        const currentSelectedOrgUnits = allOrgUnits.filter(unit => ids.includes(unit.organisationUnitId));
        const removedOrgUnits = selectedOrgUnits.filter(unit => !currentSelectedOrgUnits.includes(unit));

        if (aggregated) {
            let selectedOrgUnitsWithAllChildren = currentSelectedOrgUnits.flatMap(unit => [
                unit,
                ...getAllNestedChildrenOrgUnits(unit, allOrgUnits)
            ]);

            removedOrgUnits.forEach(unit => {
                const allNestedChildrenToRemove = getAllNestedChildrenOrgUnits(unit, allOrgUnits);
                selectedOrgUnitsWithAllChildren = selectedOrgUnitsWithAllChildren.filter(
                    selectedUnit => !allNestedChildrenToRemove.includes(selectedUnit)
                );
            });

            setSelectedIds(selectedOrgUnitsWithAllChildren.map(unit => unit.organisationUnitId));
            setSelectedOrgUnits(selectedOrgUnitsWithAllChildren);
        } else {
            setSelectedIds(ids);
            setSelectedOrgUnits(currentSelectedOrgUnits);
        }
    }

    const handleChangeIsIsAllocation = (ids: string[]) => {
        const unselectChildren = (unit: IUnitItem) => {
            unit.childrenRef.forEach(childId => {
                const childIndex = ids.indexOf(childId);
                if (childIndex > -1) ids.splice(childIndex, 1);
                const child = allOrgUnits.find(u => u.organisationUnitId === childId);
                if (child) unselectChildren(child);
            });
        };

        const newSelected = allOrgUnits.filter(unit => {
            if (ids.includes(unit.organisationUnitId)) unselectChildren(unit);
            return ids.includes(unit.organisationUnitId);
        });

        const newSelectedIds = newSelected.map(unit => unit.organisationUnitId);
        const addedIds = newSelectedIds.filter(id => !selectedIds.includes(id));
        const removedIds = selectedIds.filter(id => !newSelectedIds.includes(id));

        const updatedSelected = selectedOrgUnits.filter(unit => !removedIds.includes(unit.organisationUnitId))
            .concat(allOrgUnits.filter(unit => addedIds.includes(unit.organisationUnitId)));

        setSelectedIds(newSelectedIds);
        setSelectedOrgUnits(updatedSelected);
    }


    const handleLimitChange = (id: string, limit: number) => {
        setSelectedOrgUnits(prevSelected =>
            prevSelected.map(unit =>
                unit.organisationUnitId === id ? {...unit, limit} : unit
            )
        );
    };

    const handleChange = (ids: string[]): void => {
        if (selectType === "filter") {
            handleChangeIfIsFilter(ids);
        } else if (selectType === "allocation") {
            handleChangeIsIsAllocation(ids);
        }
    };


    return (
        <Accordion>
            <CheckboxGroup legend="Velg organisasjonsenhet" hideLegend value={selectedIds} onChange={handleChange}>
                {topLevelUnits.map(unit => (
                    <AccordionItem
                        key={unit.id}
                        isTopLevel
                        title={
                            <HStack width="100%" align="center" justify="space-between" gap="8">
                                <Checkbox name="orgUnit" value={unit.organisationUnitId}>
                                    {unit.name}
                                </Checkbox>
                                {selectType === "allocation" && selectedIds.includes(unit.organisationUnitId) && (
                                    <TextField
                                        type="number"
                                        size="small"
                                        label="Antall"
                                        hideLabel
                                        placeholder="Antall"
                                        min={0}
                                        value={selectedOrgUnits.find(u => u.organisationUnitId === unit.organisationUnitId)?.limit}
                                        onChange={e => handleLimitChange(unit.organisationUnitId, parseInt(e.target.value))}
                                    />
                                )}
                            </HStack>
                        }
                    >
                        {unit.childrenRef.length > 0 && (selectType === "filter" || (selectType === "allocation" && !selectedIds.includes(unit.organisationUnitId))) && unit.childrenRef.map(childRef => {
                            const child = getUnitById(allOrgUnits, childRef);
                            if (!child) return null;
                            return (
                                <CheckboxTreeNode
                                    key={child.id}
                                    unit={child}
                                    orgUnitList={allOrgUnits}
                                    selectedIds={selectedIds}
                                    selectedOrgUnits={selectedOrgUnits}
                                    isAggregated={aggregated}
                                    handleLimitChange={handleLimitChange}
                                    selectType={selectType}
                                />
                            );
                        })}
                    </AccordionItem>
                ))}
            </CheckboxGroup>
        </Accordion>
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
}

const CheckboxTreeNode = (
    {
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

    return (
        <AccordionItem
            title={
                <HStack width="100%" align="center" justify="space-between" gap="8">
                    <Checkbox
                        name="orgUnit"
                        value={unit.organisationUnitId}
                        disabled={isAggregated && selectedOrgUnits.some(selectedUnit => selectedUnit.organisationUnitId === unit.parentRef)}
                    >
                        {unit.name}
                    </Checkbox>
                    {selectType === "allocation" && selectedIds.includes(unit.organisationUnitId) && (
                        <TextField
                            type="number"
                            size="small"
                            label="Antall"
                            hideLabel
                            placeholder="Antall"
                            min={0}
                            value={currentUnit?.limit}
                            onChange={e => handleLimitChange(unit.organisationUnitId, parseInt(e.target.value))}
                        />
                    )}
                </HStack>
            }
        >
            {children && children.length > 0 && (selectType === "filter" || (selectType === "allocation" && !selectedIds.includes(unit.organisationUnitId))) && children.map(child => (
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