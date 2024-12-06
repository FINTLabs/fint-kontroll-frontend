import type {IUnitItem} from "~/data/types";
import React, {Dispatch, SetStateAction} from "react";
import {Radio, RadioGroup} from "@navikt/ds-react";
import {Accordion, AccordionItem} from "~/components/common/orgUnits/CustomAccordion";
import {getAllTopLevelUnits, getOrgUnitByChildrenRef, getUnitById} from "~/components/common/orgUnits/utils";

interface ValidForOrgUnitSelectorProps {
    orgUnitList: IUnitItem[];
    selectedOrgUnit: IUnitItem | null;
    setSelectedOrgUnit: Dispatch<SetStateAction<IUnitItem | null>>
}

const OrgUnitRadioSelection = ({orgUnitList, setSelectedOrgUnit, selectedOrgUnit}: ValidForOrgUnitSelectorProps) => {
    const topLevelUnits = getAllTopLevelUnits(orgUnitList);

    const handleChange = (value: string) => {
        const unit = orgUnitList.find(u => u.organisationUnitId === value)
        if (unit) setSelectedOrgUnit(unit)
    }

    return (
        <Accordion>
            <RadioGroup onChange={handleChange} legend={"Velg organisasjonsenhet"} hideLegend={true} value={selectedOrgUnit?.organisationUnitId}>
                {topLevelUnits.map(unit => (
                    <AccordionItem
                        key={unit.id}
                        isTopLevel={true}
                        title={
                            <Radio
                                name="orgUnit"
                                value={unit.organisationUnitId}
                                checked={selectedOrgUnit?.organisationUnitId === unit.organisationUnitId}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setSelectedOrgUnit(unit);
                                }}
                                size={"medium"}
                            >
                                {unit.name}
                            </Radio>
                        }
                    >

                        {unit.childrenRef.length > 0 && unit.childrenRef.map(childRef => {
                            const child = getUnitById(orgUnitList, childRef)
                            if (!child) return null
                            return (
                                <RadioTreeNode
                                    key={child.organisationUnitId}
                                    unit={child}
                                    orgUnitList={orgUnitList}
                                    selectedOrgUnit={selectedOrgUnit}
                                    setSelectedOrgUnit={setSelectedOrgUnit}
                                />
                            )
                        })}

                    </AccordionItem>

                ))}
            </RadioGroup>
        </Accordion>

    );
};

interface RadioTreeNodeProps {
    unit: IUnitItem;
    orgUnitList: IUnitItem[];
    selectedOrgUnit: IUnitItem | null;
    setSelectedOrgUnit: (newSelected: IUnitItem | null) => void;
}

const RadioTreeNode = (
    {
        unit,
        orgUnitList,
        selectedOrgUnit,
        setSelectedOrgUnit
    }: RadioTreeNodeProps) => {
    const children = getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef);

    return (
        <AccordionItem
            title={
                <Radio
                    name="orgUnit"
                    value={unit.organisationUnitId}
                    checked={selectedOrgUnit?.organisationUnitId === unit.organisationUnitId}
                    onChange={() => setSelectedOrgUnit(unit)}
                >
                    {unit.name}
                </Radio>
            }
        >
            {children && children.length > 0 && children.map(child => (
                <RadioTreeNode
                    key={child.organisationUnitId}
                    unit={child}
                    orgUnitList={orgUnitList}
                    selectedOrgUnit={selectedOrgUnit}
                    setSelectedOrgUnit={setSelectedOrgUnit}
                />
            ))}

        </AccordionItem>
    );
};

export default OrgUnitRadioSelection;
