import React, {useState} from "react";
import {Accordion, Box, Checkbox, HStack} from "@navikt/ds-react";
import type {IUnitItem} from "~/data/types";

interface ValidForOrgUnitSelectorProps {
    orgUnitList: IUnitItem[];
    selectedOrgUnit: IUnitItem | null;
    setSelectedOrgUnit: (newSelected: IUnitItem | null) => void;
}

const ResourceOwnerSelector = ({
                                   orgUnitList,
                                   setSelectedOrgUnit,
                               }: ValidForOrgUnitSelectorProps) => {
    const [newOrgUnitList, setNewOrgUnitList] = useState(
        orgUnitList.map(unit => ({...unit, isChecked: unit.isChecked ?? false}))
    );

    const toggleOrgUnitSelection = (orgUnit: IUnitItem) => {
        const updatedOrgUnitList = newOrgUnitList.map((unit) => {
            if (unit.organisationUnitId === orgUnit.organisationUnitId) {
                return {...unit, isChecked: !unit.isChecked};
            }
            return {...unit, isChecked: false};
        });

        const selectedUnit = orgUnit.isChecked ? null : orgUnit;
        setSelectedOrgUnit(selectedUnit);
        setNewOrgUnitList(updatedOrgUnitList);
    };

    const renderTree = (orgUnit: IUnitItem) => {
        return (
            <Accordion.Item key={orgUnit.id + " " + orgUnit.organisationUnitId}>
                <Accordion.Header>
                    <HStack gap={"24"} align={"center"} justify={"center"}>
                        <Box>
                            <Checkbox
                                className={"org-unit-checkbox"}
                                checked={orgUnit.isChecked}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggleOrgUnitSelection(orgUnit);
                                }}
                            >
                                {orgUnit.name}
                            </Checkbox>
                        </Box>
                    </HStack>
                </Accordion.Header>
                <Accordion.Content>
                    {Array.isArray(orgUnit.childrenRef)
                        ? orgUnit.childrenRef.map((nodeId: string) => {
                            const node = newOrgUnitList.find(
                                (n) => n.organisationUnitId === nodeId
                            );
                            if (node) {
                                return renderTree(node);
                            }
                            return null;
                        })
                        : null}
                </Accordion.Content>
            </Accordion.Item>
        );
    };

    return (
        <>
            {newOrgUnitList.map((node: IUnitItem, index) => {
                if (node.parentRef !== node.organisationUnitId) {
                    return null;
                }

                return (
                    <Accordion key={node.organisationUnitId + index}>
                        {renderTree(node)}
                    </Accordion>
                );
            })}
        </>
    );
};

export default ResourceOwnerSelector;