import {Checkbox} from "@navikt/ds-react"
import React, {useState} from "react"

import {IFeatureOperation} from "~/data/types/userTypes";

interface IPermissionTableCheckbox {
    indexForOperationsList: number
    isCheckedProp: boolean
    feature: IFeatureOperation
    operationProp: string
    notifyOperationsChanged: (indexForOperationsList: number, featureId: number, operationProp: string) => void
    hasChanges: boolean
    setHasChanges: (newVal: boolean) => void
}
const PermissionsTableCheckbox = ({
          indexForOperationsList,
          isCheckedProp,
          feature,
          operationProp,
          notifyOperationsChanged,
          hasChanges,
          setHasChanges
      }: IPermissionTableCheckbox) => {
    const [isChecked, setIsChecked] = useState(isCheckedProp)

    const handleCheckboxChange = () => {
        if (operationProp !== "GET") {
            !hasChanges ? setHasChanges(true) : null
            setIsChecked(!isChecked)
            notifyOperationsChanged(indexForOperationsList, feature.featureId, operationProp)
        }
    }

    return (
        <Checkbox
            hideLabel={true}
            checked={isChecked}
            color={"primary"}
            onChange={handleCheckboxChange}
            disabled={operationProp === "GET"}
            className={"center-checkbox-in-table"}
        >
            `${feature.featureName}: ${operationProp}`
        </Checkbox>
    )
}

export default PermissionsTableCheckbox
