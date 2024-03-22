import React from "react"
import {Accordion, Checkbox} from "@navikt/ds-react"
import type {IUnitItem} from "~/data/types";

interface OrgUnitTreeProps {
    orgUnitList: IUnitItem[]
    selectedOrgUnits: IUnitItem[]
    nodes?: IUnitItem
    setSelectedOrgUnits: (newSelected: IUnitItem[]) => void
}

const OrgUnitTreeSelector = ({
     orgUnitList,
     selectedOrgUnits,
     setSelectedOrgUnits,
 }: OrgUnitTreeProps) => {
    const toggleOrgUnit = (orgUnit: IUnitItem) => {
        const isSelected = selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)
        let newSelected: IUnitItem[]

        if (isSelected) {
            newSelected = selectedOrgUnits.filter((unit) => unit.organisationUnitId !== orgUnit.organisationUnitId)
        } else {
            if (!selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected = [...selectedOrgUnits, orgUnit]
            } else {
                newSelected = selectedOrgUnits
            }
        }

        setSelectedOrgUnits(newSelected) // Updates list of selected org units
    }

    const handleCheckboxClick = (orgUnit: IUnitItem) => {
        toggleOrgUnit(orgUnit)
    }

    const renderTree = (node: IUnitItem) => {
        return (
            <Accordion.Item key={node.id + " " + node.organisationUnitId}>
                <Accordion.Header>
                    <Checkbox
                        className={"org-unit-checkbox"}
                        checked={selectedOrgUnits.some((unit) => unit.organisationUnitId === node.organisationUnitId)}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleCheckboxClick(node)
                        }}
                    >
                        {node.name}
                    </Checkbox>
                </Accordion.Header>
                <Accordion.Content>
                    {Array.isArray(node.childrenRef)
                        ? node.childrenRef.map((nodeId: string) => {
                            const node = orgUnitList.find((n) => n.organisationUnitId === nodeId)
                            if (node) {
                                return renderTree(node)
                            }
                            return null
                        })
                        : null}
                </Accordion.Content>
            </Accordion.Item>
        )
    }

    return (
        <>
            {orgUnitList.map((node: IUnitItem) => {
                if (node.parentRef !== node.organisationUnitId) {
                    return null
                }

                return <Accordion key={node.organisationUnitId}>{renderTree(node)}</Accordion>
            })}
        </>
    )
}
export default OrgUnitTreeSelector;