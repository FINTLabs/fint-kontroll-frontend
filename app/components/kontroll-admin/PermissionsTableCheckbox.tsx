import {Checkbox, CheckboxGroup} from "@navikt/ds-react"
import React, {useEffect, useState} from "react"
import {IFeatureOperation} from "~/data/kontrollAdmin/types";

interface IPermissionTableCheckbox {
    indexForOperationsList: number
    isCheckedProp: boolean
    feature: IFeatureOperation
    operationProp: string
    notifyOperationsChanged: (indexForOperationsList: number, featureId: number, operationProp: string) => void
}
const PermissionsTableCheckbox = ({
          indexForOperationsList,
          isCheckedProp,
          feature,
          operationProp,
          notifyOperationsChanged
      }: IPermissionTableCheckbox) => {
    const [isChecked, setIsChecked] = useState(isCheckedProp)

    const handleCheckboxChange = () => {
        if (operationProp !== "GET") {
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
