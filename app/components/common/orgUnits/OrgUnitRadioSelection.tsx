import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Accordion, AccordionItem } from '~/components/common/orgUnits/CustomAccordion';
import {
    getAllParents,
    getAllTopLevelUnits,
    getOrgUnitByChildrenRef,
} from '~/components/common/orgUnits/utils';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface ValidForOrgUnitSelectorProps {
    orgUnitList: IUnitItem[];
    selectedOrgUnit: IUnitItem | null;
    setSelectedOrgUnit: (selected: IUnitItem | null) => void;
    //setSelectedOrgUnit: Dispatch<SetStateAction<IUnitItem | null>>;
}

const OrgUnitRadioSelection = ({
    orgUnitList,
    setSelectedOrgUnit,
    selectedOrgUnit,
}: ValidForOrgUnitSelectorProps) => {
    const topLevelUnits = getAllTopLevelUnits(orgUnitList);
    const accordionItemsToOpenOnRender = useMemo(
        () => (selectedOrgUnit ? getAllParents([selectedOrgUnit], orgUnitList) : []),
        [selectedOrgUnit, orgUnitList]
    );

    const handleChange = (value: string) => {
        const unit = orgUnitList.find((u) => u.organisationUnitId === value);
        if (unit) setSelectedOrgUnit(unit);
    };

    return (
        <Accordion>
            <RadioGroup
                onChange={handleChange}
                legend={'Velg organisasjonsenhet'}
                hideLegend={true}
                value={selectedOrgUnit?.organisationUnitId}>
                {topLevelUnits.map((unit) => (
                    <RadioTreeNode
                        key={unit.organisationUnitId}
                        unit={unit}
                        orgUnitList={orgUnitList}
                        selectedOrgUnit={selectedOrgUnit}
                        setSelectedOrgUnit={setSelectedOrgUnit}
                        openOnRender={accordionItemsToOpenOnRender}
                    />
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
    openOnRender?: IUnitItem[];
}

const RadioTreeNode = ({
    unit,
    orgUnitList,
    selectedOrgUnit,
    setSelectedOrgUnit,
    openOnRender = [],
}: RadioTreeNodeProps) => {
    const children = getOrgUnitByChildrenRef(orgUnitList, unit.childrenRef);
    const isTopLevel = useMemo(() => unit.parentRef === unit.organisationUnitId, [unit]);

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
                <Radio
                    name="orgUnit"
                    value={unit.organisationUnitId}
                    checked={selectedOrgUnit?.organisationUnitId === unit.organisationUnitId}
                    onChange={() => setSelectedOrgUnit(unit)}>
                    {unit.name}
                </Radio>
            }>
            {children &&
                children.length > 0 &&
                children.map((child) => (
                    <RadioTreeNode
                        key={child.organisationUnitId}
                        unit={child}
                        orgUnitList={orgUnitList}
                        selectedOrgUnit={selectedOrgUnit}
                        setSelectedOrgUnit={setSelectedOrgUnit}
                        openOnRender={openOnRender}
                    />
                ))}
        </AccordionItem>
    );
};

export default OrgUnitRadioSelection;
