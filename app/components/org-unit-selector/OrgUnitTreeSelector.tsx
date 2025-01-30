import React, {useEffect, useState} from "react"
import {Accordion, Checkbox} from "@navikt/ds-react"

import {IUnitItem} from "~/data/types/orgUnitTypes";

interface OrgUnitTreeProps {
    orgUnitList: IUnitItem[]
    selectedOrgUnits: IUnitItem[]
    nodes?: IUnitItem
    setSelectedOrgUnits: (newSelected: IUnitItem[]) => void
    includeSubOrgUnitsState: boolean
}

const OrgUnitTreeSelector = ({
     orgUnitList,
     selectedOrgUnits,
     setSelectedOrgUnits,
     includeSubOrgUnitsState
 }: OrgUnitTreeProps) => {
    const [newOrgUnitList, setNewOrgUnitList] = useState(orgUnitList)

    // If includeSubOrgUnitsState - Reset the chosen orgunits
    useEffect(() => {
        setSelectedOrgUnits([])
        resetAllOrgUnitsToFalse()
    }, [includeSubOrgUnitsState]);

    const resetAllOrgUnitsToFalse = () => {
        setNewOrgUnitList(orgUnitList.map((org) => ({...org, isChecked: false})))
    }

    useEffect(() => {
        setSelectedOrgUnits(newOrgUnitList.filter(org=> org.isChecked === true))
    }, [newOrgUnitList]);


    const toggleOrgUnit = (orgUnit: IUnitItem) => {
        let newSelected: IUnitItem[]
        let changedOrgUnitList: IUnitItem[] = []

        let changedOrgUnit = orgUnit
        changedOrgUnit.isChecked = !changedOrgUnit.isChecked

        if(includeSubOrgUnitsState) {
            newOrgUnitList.map(orgUnitFromList => {
                if(orgUnitFromList.organisationUnitId === changedOrgUnit.organisationUnitId) {
                    changedOrgUnitList.push(changedOrgUnit)
                }
                else {
                    changedOrgUnitList.push(orgUnitFromList)
                }
            })
            setNewOrgUnitList(changedOrgUnitList)
            performFilteringOnSelectedOrgUnits(changedOrgUnit)
            return
        }

        if (!changedOrgUnit.isChecked) {
            newSelected = selectedOrgUnits.filter((unit) => unit.organisationUnitId !== changedOrgUnit.organisationUnitId)
        } else {
            newSelected = [...selectedOrgUnits, {...changedOrgUnit}]
        }
        setSelectedOrgUnits(newSelected)
        changedOrgUnitList = newOrgUnitList.map(unitFromList => unitFromList.organisationUnitId === orgUnit.organisationUnitId ? changedOrgUnit : unitFromList)
        setNewOrgUnitList(changedOrgUnitList)
    }


    const performFilteringOnSelectedOrgUnits = (orgUnitClicked: IUnitItem): IUnitItem[] => {
        const updatedOrgUnits: IUnitItem[] = [...newOrgUnitList]

        // Helper function to recursively collect descendants of an orgUnit
        const collectDescendants = (orgUnit: IUnitItem) => {
            orgUnit.childrenRef.forEach(childRef => {
                const childOrgUnit: IUnitItem | undefined = newOrgUnitList.find(unit => unit.organisationUnitId === childRef)
                if (childOrgUnit) {
                    collectDescendants(childOrgUnit) // Recursively collect descendants
                }
            })
        }

        // Collect descendants of the clicked org unit
        collectDescendants(orgUnitClicked)

        // Update isChecked property for immediate children of the clicked org unit
        orgUnitClicked.childrenRef.forEach(childRef => {
            const childIndex = updatedOrgUnits.findIndex(unit => unit.organisationUnitId === childRef)
            if (childIndex !== -1) {
                updatedOrgUnits[childIndex].isChecked = false // Uncheck immediate children
            }
        })

        // Recursively traverse descendants and update their isChecked property to false
        const uncheckDescendants = (orgUnit: IUnitItem) => {
            orgUnit.childrenRef.forEach(childRef => {
                const childOrgUnit: IUnitItem | undefined = updatedOrgUnits.find(unit => unit.organisationUnitId === childRef)
                if (childOrgUnit) {
                    childOrgUnit.isChecked = false
                    uncheckDescendants(childOrgUnit) // Recursively uncheck descendants
                }
            })
        }

        uncheckDescendants(orgUnitClicked) // Start recursive traversal from the clicked org unit

        return updatedOrgUnits
    };


    const renderTree = (orgUnit: IUnitItem) => {
        const locksChildNodes = includeSubOrgUnitsState && orgUnit.isChecked
        return (
            <Accordion.Item key={orgUnit.id + " " + orgUnit.organisationUnitId}>
                <Accordion.Header>
                    <Checkbox
                        className={"org-unit-checkbox"}
                        checked={orgUnit.isChecked}
                        onClick={(event) => {
                            event.stopPropagation()
                            toggleOrgUnit(orgUnit)
                        }}
                    >
                        {orgUnit.name}
                    </Checkbox>
                </Accordion.Header>
                {!locksChildNodes &&
                    <Accordion.Content>
                        {Array.isArray(orgUnit.childrenRef)
                            ? orgUnit.childrenRef.map((nodeId: string) => {
                                const node = newOrgUnitList.find((n) => n.organisationUnitId === nodeId)
                                if (node) {
                                    return renderTree(node)
                                }
                                return null
                            })
                            : null}
                    </Accordion.Content>
                }
            </Accordion.Item>
        )
    }

    return (
        <>
            {newOrgUnitList.map((node: IUnitItem, index) => {
                if (node.parentRef !== node.organisationUnitId) {
                    return null
                }

                return <Accordion key={node.organisationUnitId + index}>{renderTree(node)}</Accordion>
            })}
        </>
    )
}
export default OrgUnitTreeSelector;