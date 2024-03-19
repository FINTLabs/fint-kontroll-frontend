import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchFeaturesInRole, putPermissionDataForRole} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {IPermissionData} from "~/data/kontrollAdmin/types";
import {
    Form,
    useActionData,
    useLoaderData,
    useParams,
} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {Button, Table} from "@navikt/ds-react";
import PermissionsTableCheckbox from "~/components/kontroll-admin/PermissionsTableCheckbox";
import {toast} from "react-toastify";
import styles from "~/components/kontroll-admin/kontroll-admin.css";

export async function loader({params, request}: LoaderFunctionArgs) {
    const auth = request.headers.get("Authorization")
    const response = await fetchFeaturesInRole(auth, params.id);
    const data = await response.json()
    return json(data);
}


export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData()
    const auth = request.headers.get("Authorization")
    const response = await putPermissionDataForRole(auth, formData.get("dataForForm"))
    return {didUpdate: !!response.status}
}

export default () => {
    const loaderData: IPermissionData = useLoaderData<typeof loader>()
    let didUpdate = useActionData<typeof action>()
    const params = useParams()

    const [modifiedPermissionDataForRole, setModifiedPermissionDataForRole] = useState<IPermissionData>()

    const [currentOperations, setCurrentOperations] = useState<string[][]>([])

    useEffect(() => {
        setModifiedPermissionDataForRole(loaderData)
        setCurrentOperations(loaderData.features.map((feature) => feature.operations))
    }, [loaderData]);

    useEffect(() => {
        if(didUpdate !== undefined) {
            didUpdate ? toast.success("Oppdatering av rolle gjennomført") : toast.error("Oppdatering av rolle feilet")
        } else {
            didUpdate = undefined
        }
    }, [didUpdate]);

    const notifyOperationsChanged = (indexForOperationsList: number, featureId: number, operationProp: string) => {
        let changedList: string[] = currentOperations[indexForOperationsList]

        if (changedList.includes(operationProp)) {
            changedList = changedList.filter((operation) => operation !== operationProp)
        } else {
            changedList.push(operationProp)
        }
        // Now, replace the featureOperation in the permission's list of operations
        const newOperationsList: string[][] = [
            ...currentOperations.slice(0, indexForOperationsList),
            changedList,
            ...currentOperations.slice(indexForOperationsList + 1)
        ]
        setCurrentOperations(newOperationsList)
    }

    const handleSubmit = () => {
        let newFeatureOperations: IPermissionData = loaderData
        currentOperations.forEach((featureOperation, index) => {
            newFeatureOperations.features[index].operations = featureOperation
        })
        const val = document.getElementById("dataForForm")
        val ? val.setAttribute("value", JSON.stringify(newFeatureOperations)) : ""
    }


    const availableOperations = ["GET", "POST", "PUT", "DELETE"]
    const readableOperations = ["Kan hente", "Kan lage ny", "Kan oppdatere", "Kan slette"]


    return (
        <div className={"tab-content-container"}>
            <Form method={"put"} name={"putForm"} id="putForm" onSubmit={handleSubmit} action={`/kontroll-admin/define-role/${params.id}`}>
                <input type={"hidden"} name={"dataForForm"} id={"dataForForm"} value={""} />

                <Table id={"permissions-table"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Feature</Table.HeaderCell>
                            {readableOperations.map((operation, index) => (
                                <Table.HeaderCell key={operation + index} align={"center"}>
                                    {operation}
                                </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {modifiedPermissionDataForRole?.features.map((feature, indexForFeature) => (
                            <Table.Row key={feature.featureName + indexForFeature + modifiedPermissionDataForRole?.accessRoleId}>
                                <Table.DataCell>{feature.featureName}</Table.DataCell>
                                {availableOperations.map((operation: string, index) => (
                                    <Table.DataCell key={operation}>
                                        <PermissionsTableCheckbox
                                            feature={feature}
                                            indexForOperationsList={indexForFeature}
                                            isCheckedProp={feature.operations.includes(operation)}
                                            operationProp={operation}
                                            notifyOperationsChanged={notifyOperationsChanged}
                                        />
                                    </Table.DataCell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <div className={"button-container"}>
                    <Button>
                        Lagre endringer
                    </Button>
                </div>

            </Form>
        </div>
    )
}
