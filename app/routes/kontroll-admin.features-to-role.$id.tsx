import {LoaderFunctionArgs} from "@remix-run/router";
import {
    fetchAllFeatures,
    fetchFeaturesInRole,
    putPermissionDataForRole
} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {Button, Heading, List, Table} from "@navikt/ds-react";
import {Form, Links, Meta, Scripts, useActionData, useLoaderData, useRouteError} from "@remix-run/react";
import {IFeature, IFeatureOperation, IPermissionData} from "~/data/kontrollAdmin/types";
import React, {useEffect, useState} from "react";
import {ActionFunctionArgs} from "@remix-run/node";
import {toast} from "react-toastify";

export async function loader({params, request}: LoaderFunctionArgs) {
    const auth = request.headers.get("Authorization")
    const permissionDataRes = await fetchFeaturesInRole(auth, params.id)
    const allFeaturesRes = await fetchAllFeatures(auth)

    const permissionData = await permissionDataRes.json()
    const allFeatures = await allFeaturesRes.json()

    return {permissionData: permissionData, allFeatures: allFeatures}
}

export async function action({request}: ActionFunctionArgs) {
    const auth = request.headers.get("Authorization")
    const formData = await request.formData()

    const response = await putPermissionDataForRole(auth, formData.get("permissionData"))

    return {didUpdate: !!response.status}
}




const KontrollAdminFeaturesToRoleId = () => {
    const loaderData = useLoaderData<typeof loader>()
    const permissionData = loaderData.permissionData as IPermissionData
    const allFeatures = loaderData.allFeatures as IFeature[]

    let didUpdate = useActionData<typeof action>()

    const [updatedPermissionData, setUpdatedPermissionData] = useState<IPermissionData>(permissionData)


    useEffect(() => {
        setUpdatedPermissionData(permissionData)
    }, [loaderData]);

    useEffect(() => {
        if(didUpdate !== undefined) {
            didUpdate ? toast.success("Oppdatering av rolle gjennomført") : toast.error("Oppdatering av rolle feilet")
        } else {
            didUpdate = undefined
        }
    }, [didUpdate]);

    const flatListOfIds = updatedPermissionData.features.flatMap((feature) => String(feature.featureId))

    const handleUpdatePermissionData = (feature: IFeature) => {
        const featureIds: string[] = updatedPermissionData.features.flatMap((feature) => String(feature.featureId))

        if (!featureIds.includes(String(feature.id))) {
            const featureConverted: IFeatureOperation = {
                featureId: Number(feature.id),
                featureName: feature.name,
                operations: ["GET"]
            }
            const newFeatureList = updatedPermissionData.features
            newFeatureList.push(featureConverted)
            setUpdatedPermissionData({ ...updatedPermissionData, features: newFeatureList })
        } else {
            const featureConverted: IFeatureOperation = {
                featureId: Number(feature.id),
                featureName: feature.name,
                operations: ["GET"]
            }
            const newFeatureList = updatedPermissionData.features.filter(
                (ele) => ele.featureId !== featureConverted.featureId
            )
            setUpdatedPermissionData({ ...updatedPermissionData, features: newFeatureList })
        }
    }

    const handleSubmit = () => {
        const permissionDataEle = document.getElementById("permissionData")
        permissionDataEle ? permissionDataEle.setAttribute("value", JSON.stringify(updatedPermissionData)) : null
    }


    return (
        <div className={"features-to-roles-container"}>


            <div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope={"col"}>Featurenavn</Table.HeaderCell>
                            <Table.HeaderCell scope={"col"}>Knytt til rolle</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {allFeatures.map((feature: IFeature) =>
                            <Table.Row key={feature.id}>
                                <Table.DataCell>{feature.name}</Table.DataCell>
                                <Table.DataCell>
                                    {!flatListOfIds.includes(String(feature.id)) ? (
                                        <Button variant={"secondary"} onClick={() => handleUpdatePermissionData(feature)}>
                                            Lag knytning til bruker
                                        </Button>
                                    ) : (
                                        <Button variant={"danger"} onClick={() => handleUpdatePermissionData(feature)}>
                                            Fjern knytning
                                        </Button>
                                    )}
                                </Table.DataCell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>

            <div>
                <Heading size={"small"}>Features lagt til</Heading>
                <List as={"ul"}>
                    {updatedPermissionData.features.map((feature) => (
                        <li key={feature.featureId}>{feature.featureName}</li>
                    ))}
                </List>
                <Form onSubmit={handleSubmit} method={"put"}>
                    <input type={"hidden"} name={"permissionData"} id={"permissionData"} />
                    <Button variant={"primary"} >
                        Lagre rolle
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default KontrollAdminFeaturesToRoleId

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <html>
            <head>
                <title>Feil oppstod</title>
                <Meta/>
                <Links/>
            </head>
            <body>
                <div>{error.message}</div>
                <Scripts/>
            </body>
        </html>
    );
}
