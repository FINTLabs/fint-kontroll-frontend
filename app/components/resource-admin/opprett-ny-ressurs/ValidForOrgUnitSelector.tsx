import React, { useEffect, useState } from "react";
import {Accordion, Box, Checkbox, HStack, TextField} from "@navikt/ds-react";
import type { IUnitItem } from "~/data/types";

interface ValidForOrgUnitSelectorProps {
    orgUnitList: IUnitItem[];
    selectedOrgUnits: IUnitItem[];
    nodes?: IUnitItem;
    setSelectedOrgUnits: (newSelected: IUnitItem[]) => void;
}

const ValidForOrgUnitSelector = ({
                                     orgUnitList,
                                     selectedOrgUnits,
                                     setSelectedOrgUnits,
                                 }: ValidForOrgUnitSelectorProps) => {
    const [newOrgUnitList, setNewOrgUnitList] = useState(orgUnitList);

    useEffect(() => {
        setSelectedOrgUnits(newOrgUnitList.filter((org) => org.isChecked === true));
    }, [newOrgUnitList]);

    const toggleOrgUnit = (orgUnit: IUnitItem) => {
        let newSelected: IUnitItem[];
        let changedOrgUnitList: IUnitItem[] = [];

        const changedOrgUnit = orgUnit;
        changedOrgUnit.isChecked = !changedOrgUnit.isChecked;

        if (!changedOrgUnit.isChecked) {
            newSelected = selectedOrgUnits.filter(
                (unit) => unit.organisationUnitId !== changedOrgUnit.organisationUnitId
            );
        } else {
            newSelected = [...selectedOrgUnits, { ...changedOrgUnit }];
        }
        console.log(`Valgt enhet ${changedOrgUnit.organisationUnitId}:`, changedOrgUnit);
        setSelectedOrgUnits(newSelected);
        changedOrgUnitList = newOrgUnitList.map((unitFromList) =>
            unitFromList.organisationUnitId === orgUnit.organisationUnitId
                ? changedOrgUnit
                : unitFromList
        );
        setNewOrgUnitList(changedOrgUnitList);
    };

    const handleAntallChange = (orgUnitId: string, value: string) => {
        const antall = Math.max(0, Math.min(parseInt(value), 1000000));
        console.log(`Endret antall for enhet ${orgUnitId}:`, antall);
        const updatedOrgUnits = newOrgUnitList.map((unit) =>
            unit.organisationUnitId === orgUnitId
                ? { ...unit, limit: isNaN(antall) ? undefined : antall }
                : unit
        );
        setNewOrgUnitList(updatedOrgUnits);
    };

    const renderTree = (orgUnit: IUnitItem) => {
        const locksChildNodes = orgUnit.isChecked;
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
                                    toggleOrgUnit(orgUnit);
                                }}
                            >
                                {orgUnit.name}
                            </Checkbox>
                        </Box>
                        <Box>
                            {orgUnit.isChecked && (
                                <TextField
                                    label={"Antall"}

                                    min="0"
                                    max="100"
                                    value={orgUnit.limit?.toString() || ""}
                                    onChange={(event) =>
                                        handleAntallChange(
                                            orgUnit.organisationUnitId,
                                            event.target.value
                                        )
                                    }

                                />
                            )}

                        </Box>
                    </HStack>
                </Accordion.Header>
                {!locksChildNodes && (
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
                )}
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

export default ValidForOrgUnitSelector;