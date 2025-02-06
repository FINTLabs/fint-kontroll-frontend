import { LoaderFunctionArgs } from '@remix-run/router';
import {
    fetchFeaturesInRole,
    putPermissionDataForRole,
} from '~/data/kontrollAdmin/kontroll-admin-define-role';
import { ActionFunctionArgs, json } from '@remix-run/node';
import {
    Form,
    useActionData,
    useLoaderData,
    useOutletContext,
    useParams,
    useRouteError,
} from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import { Button, HStack, Table } from '@navikt/ds-react';
import PermissionsTableCheckbox from '../components/kontroll-admin/PermissionsTableCheckbox';
import { toast } from 'react-toastify';
import styles from '../components/kontroll-admin/kontroll-admin.css?url';
import { ConfirmSafeRedirectModal } from '~/components/kontroll-admin/ConfirmSafeRedirectModal';
import { getDefineRoleByIdUrl } from '~/data/paths';
import { IPermissionData } from '~/data/types/userTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';

// TODO: Should this be moved into its own Context-file? Or should we refactor it differently?
interface ExpectedSystemAdminContext {
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    hasChanges: boolean;
    setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
    desiredTab: string;
    handleNavigate: (value: string) => void;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const data = await fetchFeaturesInRole(request, params.id);
    return json(data);
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const dataForForm = formData.get('dataForForm');
    if (dataForForm) {
        const response = await putPermissionDataForRole(request, dataForForm as string);
        return { didUpdate: response.ok };
    }
}

const DefineRoleTab = () => {
    const loaderData: IPermissionData = useLoaderData<typeof loader>();
    let actionData = useActionData<typeof action>();
    const params = useParams();
    const {
        isModalVisible,
        setIsModalVisible,
        hasChanges,
        setHasChanges,
        desiredTab,
        handleNavigate,
    } = useOutletContext<ExpectedSystemAdminContext>(); // Context from system-admin.tsx

    const [modifiedPermissionDataForRole, setModifiedPermissionDataForRole] =
        useState<IPermissionData>();
    const [saving, setSaving] = useState(false);

    const [currentOperations, setCurrentOperations] = useState<string[][]>([]);

    useEffect(() => {
        setModifiedPermissionDataForRole(loaderData);
        setCurrentOperations(loaderData.features.map((feature) => feature.operations));
    }, [loaderData]);

    useEffect(() => {
        if (actionData !== undefined) {
            actionData.didUpdate
                ? toast.success('Oppdatering av rolle gjennomført')
                : toast.error('Oppdatering av rolle feilet');
            !saving ? handleNavigate(desiredTab) : null;
            setHasChanges(false);
        } else {
            actionData = undefined;
        }
        setSaving(false);
    }, [actionData]);

    const discardChanges = () => {
        handleNavigate(desiredTab);
        setHasChanges(false);
    };

    const notifyOperationsChanged = (
        indexForOperationsList: number,
        featureId: number,
        operationProp: string
    ) => {
        let changedList: string[] = currentOperations[indexForOperationsList];

        if (changedList.includes(operationProp)) {
            changedList = changedList.filter((operation) => operation !== operationProp);
        } else {
            changedList.push(operationProp);
        }
        // Now, replace the featureOperation in the permission's list of operations
        const newOperationsList: string[][] = [
            ...currentOperations.slice(0, indexForOperationsList),
            changedList,
            ...currentOperations.slice(indexForOperationsList + 1),
        ];
        setCurrentOperations(newOperationsList);
    };

    const handleSubmit = () => {
        setSaving(true);
        const newFeatureOperations: IPermissionData = loaderData;
        currentOperations.forEach((featureOperation, index) => {
            newFeatureOperations.features[index].operations = featureOperation;
        });
        const val = document.getElementById('dataForForm');
        val ? val.setAttribute('value', JSON.stringify(newFeatureOperations)) : '';
    };

    const availableOperations = ['GET', 'POST', 'PUT', 'DELETE'];
    const readableOperations = ['Kan se', 'Kan lage ny', 'Kan oppdatere', 'Kan slette'];

    return (
        <div className={'tab-content-container'}>
            <ConfirmSafeRedirectModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                discardChanges={discardChanges}
            />

            {hasChanges && (
                <div>
                    <Button variant={'secondary'} onClick={() => location.reload()}>
                        Nullstill pågående endringer
                    </Button>
                </div>
            )}

            <Table id={'permissions-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rettighet</Table.HeaderCell>
                        {readableOperations.map((operation, index) => (
                            <Table.HeaderCell key={operation + index} align={'center'}>
                                {operation}
                            </Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {modifiedPermissionDataForRole?.features.map((feature, indexForFeature) => (
                        <Table.Row
                            key={
                                feature.featureName +
                                indexForFeature +
                                modifiedPermissionDataForRole?.accessRoleId
                            }>
                            <Table.DataCell>{feature.featureName}</Table.DataCell>
                            {availableOperations.map((operation: string) => (
                                <Table.DataCell key={operation}>
                                    <PermissionsTableCheckbox
                                        feature={feature}
                                        indexForOperationsList={indexForFeature}
                                        isCheckedProp={feature.operations.includes(operation)}
                                        operationProp={operation}
                                        notifyOperationsChanged={notifyOperationsChanged}
                                        hasChanges={hasChanges}
                                        setHasChanges={setHasChanges}
                                    />
                                </Table.DataCell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Form
                method={'put'}
                name={'putForm'}
                id="putForm"
                onSubmit={handleSubmit}
                action={getDefineRoleByIdUrl(params.id)}>
                <input type={'hidden'} name={'dataForForm'} id={'dataForForm'} value={''} />
                <HStack justify="end">
                    <Button id="save-button">Lagre endringer</Button>
                </HStack>
            </Form>
        </div>
    );
};

export default DefineRoleTab;

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
