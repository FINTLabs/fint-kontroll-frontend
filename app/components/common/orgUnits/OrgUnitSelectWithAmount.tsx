import type {IUnitItem} from "~/data/types";
import {getAllTopLevelUnits, getOrgUnitByChildrenRef, getUnitById} from "~/components/common/orgUnits/utils";
import {Accordion, AccordionItem} from "~/components/common/orgUnits/CustomAccordion";
import {Checkbox, CheckboxGroup, HStack, TextField} from "@navikt/ds-react";
import React, {Dispatch, SetStateAction, useState} from "react";

interface OrgUnitAllocationProps {
    orgUnitList: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    setSelectedOrgUnits: Dispatch<SetStateAction<IUnitItem[]>>;
}

const OrgUnitSelectWithAmount = ({orgUnitList, selectedOrgUnits, setSelectedOrgUnits}: OrgUnitAllocationProps) => {
    const topLevelUnits = getAllTopLevelUnits(orgUnitList);
    const [selectedIds, setSelectedIds] = useState<string[]>(selectedOrgUnits.map(unit => unit.organisationUnitId));

    const handleChange = (ids: string[]): void => {
        const unselectChildren = (unit: IUnitItem) => {
            unit.childrenRef.forEach(childId => {
                const childIndex = ids.indexOf(childId);
                if (childIndex > -1) ids.splice(childIndex, 1);
                const child = orgUnitList.find(u => u.organisationUnitId === childId);
                if (child) unselectChildren(child);
            });
        };

        const newSelected = orgUnitList.filter(unit => {
            if (ids.includes(unit.organisationUnitId)) unselectChildren(unit);
            return ids.includes(unit.organisationUnitId);
        });

        const newSelectedIds = newSelected.map(unit => unit.organisationUnitId);
        const addedIds = newSelectedIds.filter(id => !selectedIds.includes(id));
        const removedIds = selectedIds.filter(id => !newSelectedIds.includes(id));

        const updatedSelected = selectedOrgUnits.filter(unit => !removedIds.includes(unit.organisationUnitId))
            .concat(orgUnitList.filter(unit => addedIds.includes(unit.organisationUnitId)));

        setSelectedIds(newSelectedIds);
        setSelectedOrgUnits(updatedSelected);
    };

    const handleLimitChange = (id: string, limit: number) => {
        setSelectedOrgUnits(prevSelected =>
            prevSelected.map(unit =>
                unit.organisationUnitId === id ? {...unit, limit} : unit
            )
        );
    };

    return (
        <Accordion>
            <CheckboxGroup legend="Velg orgenhet" hideLegend value={selectedIds} onChange={handleChange}>
                {topLevelUnits.map(unit => (
                    <AccordionItem
                        key={unit.id}
                        isTopLevel
                        title={
                            <HStack width="100%" align="center" justify="space-between" gap="8">
                                <Checkbox name="orgUnit" value={unit.organisationUnitId}>
                                    {unit.name}
                                </Checkbox>
                                {selectedIds.includes(unit.organisationUnitId) && (
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
                        {!selectedIds.includes(unit.organisationUnitId) && unit.childrenRef.length > 0 && unit.childrenRef.map(childRef => {
                            const child = getUnitById(orgUnitList, childRef);
                            if (!child) return null;
                            return (
                                <CheckboxTreeNode
                                    key={child.id}
                                    unit={child}
                                    orgUnitList={orgUnitList}
                                    selectedIds={selectedIds}
                                    handleLimitChange={handleLimitChange}
                                    selectedOrgUnits={selectedOrgUnits}
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
    handleLimitChange: (orgUnitId: string, limit: number) => void;
    selectedOrgUnits: IUnitItem[];
}

const CheckboxTreeNode = (
    {
        unit,
        orgUnitList,
        selectedIds,
        handleLimitChange,
        selectedOrgUnits
    }: CheckboxTreeNodeProps) => {
    const children = getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef);
    const currentUnit = selectedOrgUnits.find(u => u.organisationUnitId === unit.organisationUnitId);

    return (
        <AccordionItem
            title={
                <HStack width="100%" align="center" justify="space-between" gap="8">
                    <Checkbox name="orgUnit" value={unit.organisationUnitId}>
                        {unit.name}
                    </Checkbox>
                    {selectedIds.includes(unit.organisationUnitId) && (
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
            {!selectedIds.includes(unit.organisationUnitId) && children && children.length > 0 && children.map(child => (
                <CheckboxTreeNode
                    key={child.id}
                    unit={child}
                    orgUnitList={orgUnitList}
                    selectedIds={selectedIds}
                    handleLimitChange={handleLimitChange}
                    selectedOrgUnits={selectedOrgUnits}
                />
            ))}
        </AccordionItem>
    );
};

export default OrgUnitSelectWithAmount;