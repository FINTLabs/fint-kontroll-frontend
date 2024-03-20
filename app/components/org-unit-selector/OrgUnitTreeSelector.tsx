import React from "react"
import {Accordion, Checkbox} from "@navikt/ds-react"
import type {IUnitItem} from "~/data/types";

interface OrgUnitTreeProps {
    orgUnitList: IUnitItem[]
    selectedOrgUnits: IUnitItem[]
    nodes?: IUnitItem
    setSelectedOrgUnits: (newSelected: IUnitItem[]) => void
    aggregated: boolean
}

const OrgUnitTreeSelector = ({
                         orgUnitList,
                         selectedOrgUnits,
                         setSelectedOrgUnits,
                         aggregated
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

    const toggleOrgUnitAndChildren = (orgUnit: IUnitItem) => {
        const isSelected = selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)
        let newSelected = [...selectedOrgUnits]

        if (isSelected) {
            newSelected = selectedOrgUnits.filter((unit) => unit.organisationUnitId !== orgUnit.organisationUnitId)
        } else {
            if (!selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected.push(orgUnit)
            }
        }

        const childrenOrgUnits = findChildrenOrgUnits(orgUnit)
        for (const childOrgUnit of childrenOrgUnits) {
            if (isSelected) {
                newSelected = newSelected.filter((unit) => unit.organisationUnitId !== childOrgUnit.organisationUnitId)
            } else {
                if (!newSelected.some((unit) => unit.organisationUnitId === childOrgUnit.organisationUnitId)) {
                    newSelected.push(childOrgUnit)
                }
            }
        }

        setSelectedOrgUnits(newSelected) // Updates list of selected org units
    }

    const findChildrenOrgUnits = (orgUnit: IUnitItem): IUnitItem[] => {
        const childrenOrgUnits: IUnitItem[] = []

        const findChildren = (node: IUnitItem) => {
            if (Array.isArray(node.childrenRef)) {
                for (const nodeId of node.childrenRef) {
                    const childNode = orgUnitList.find((n) => n.organisationUnitId === nodeId)
                    if (childNode) {
                        childrenOrgUnits.push(childNode)
                        findChildren(childNode)
                    }
                }
            }
        }

        findChildren(orgUnit)
        return childrenOrgUnits
    }

    const handleCheckboxClick = (orgUnit: IUnitItem) => {
        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit)
        } else {
            toggleOrgUnit(orgUnit)
        }
    }

    const renderTree = (node: IUnitItem) => {
        return (
            <Accordion.Item key={node.id + " " + node.organisationUnitId} className={"styled-accordion"}>
                <Accordion.Header className={"styled-accordion"}>
                    <Checkbox
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
            {/* <b>Velg orgenheter</b>*/}
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