/*
import React from "react"

import { Accordion, Checkbox } from "@navikt/ds-react"
import { useOrgUnits } from "../../data/OrgUnitContext"
import { IOrgUnit } from "../../data/types"
import styled from "styled-components"

const StyledAccordion = styled(Accordion)`
	* {
		border: none !important;
		box-shadow: none !important;
		padding-top: 0 !important;
		padding-bottom: 0 !important;
		height: inherit;
	}
`

interface OrgUnitTreeProps {
    selectedOrgUnits: IOrgUnit[]
    nodes?: IOrgUnit
    setSelectedOrgUnits: (newSelected: any) => void
    aggregated: boolean
}

const OrgUnitTreeWithUserConnectionOrganism = ({
                                                   selectedOrgUnits,
                                                   setSelectedOrgUnits,
                                                   aggregated
                                               }: OrgUnitTreeProps) => {
    const { orgUnitsData } = useOrgUnits()

    const toggleOrgUnit = (orgUnit: IOrgUnit) => {
        const isSelected = selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)
        let newSelected: IOrgUnit[]

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

    const toggleOrgUnitAndChildren = (orgUnit: IOrgUnit) => {
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

    const findChildrenOrgUnits = (orgUnit: IOrgUnit): IOrgUnit[] => {
        const childrenOrgUnits: IOrgUnit[] = []

        const findChildren = (node: IOrgUnit) => {
            if (Array.isArray(node.childrenRef)) {
                for (const nodeId of node.childrenRef) {
                    const childNode = orgUnitsData?.orgUnits.find((n) => n.organisationUnitId === nodeId)
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

    const handleCheckboxClick = (orgUnit: IOrgUnit) => {
        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit)
        } else {
            toggleOrgUnit(orgUnit)
        }
    }

    const renderTree = (node: IOrgUnit) => {
        return (
            <Accordion.Item key={node.id + " " + node.organisationUnitId}>
                <Accordion.Header>
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
                            const node = orgUnitsData?.orgUnits.find((n) => n.organisationUnitId === nodeId)
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
            <b>Velg orgenheter</b>
            {orgUnitsData?.orgUnits?.map((node: IOrgUnit) => {
                if (node.parentRef !== node.organisationUnitId) {
                    return null
                }

                return <StyledAccordion key={node.organisationUnitId}>{renderTree(node)}</StyledAccordion>
            })}
        </>
    )
}

export default OrgUnitTreeWithUserConnectionOrganism
*/
