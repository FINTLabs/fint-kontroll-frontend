import React, {useEffect} from "react"
import {Accordion, Checkbox} from "@navikt/ds-react"
import type {IUnitItem} from "~/data/types";

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
    // If includeSubOrgUnitsState - Reset the chosen orgunits
    useEffect(() => {
        setSelectedOrgUnits([])
    }, [includeSubOrgUnitsState]);
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

    const handleCheckboxClick = (orgUnit: IUnitItem, includeIsTrue: boolean) => {
        toggleOrgUnit(orgUnit)
    }

    const handleClearOrgUnitsIfParentChecked = () => {
        // const parentContainsChildren =
    //     Fortsett med følgende pseudokode
    //     HVIS en parent har children, og noen av childrensa ligger i selectedOrgUnits -> Da skal alle childsa ut av lista, og erstattes med parent-noden.
    }

    console.log(selectedOrgUnits)
    const renderTree = (node: IUnitItem) => {
        const locksChildNodes = includeSubOrgUnitsState && selectedOrgUnits.some((unit) => unit.organisationUnitId === node.organisationUnitId)
        return (
            <Accordion.Item key={node.id + " " + node.organisationUnitId}>
                <Accordion.Header>
                    <Checkbox
                        className={"org-unit-checkbox"}
                        checked={selectedOrgUnits.some((unit) => unit.organisationUnitId === node.organisationUnitId)}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleCheckboxClick(node, locksChildNodes)
                        }}
                    >
                        {node.name}
                    </Checkbox>
                </Accordion.Header>
                {!locksChildNodes &&
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
                }
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