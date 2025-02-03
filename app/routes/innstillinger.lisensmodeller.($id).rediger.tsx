import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import {
    createLicenseModel,
    editLicenseModel,
    fetchLicenseModel,
    fetchLicenseModels,
} from '~/data/fetch-kodeverk';
import { LoaderFunctionArgs } from '@remix-run/router';
import { BASE_PATH } from '../../environment';
import { SETTINGS_LICENSE_MODEL } from '~/data/paths';
import { EditableListEditModal } from '~/components/settings/KodeverkEditableList/EditableListEditModal';
import { IKodeverkLicenseModel } from '~/data/types/kodeverkTypes';

export async function action({ params, request }: ActionFunctionArgs) {
    const data = await request.formData();
    const name = data.get('categoryname') as string;
    const description = data.get('description') as string;
    const intent = data.get('intent') as string;
    const categoryId = params.id;

    if (!name) return null;

    if (intent === 'edit' && categoryId) {
        const response = await editLicenseModel(
            request.headers.get('Authorization'),
            categoryId,
            name,
            description
        );
        return redirect(`${SETTINGS_LICENSE_MODEL}?responseCode=${response.status}`);
    }
    if (intent === 'create') {
        const response = await createLicenseModel(
            request.headers.get('Authorization'),
            name,
            description
        );
        return redirect(`${SETTINGS_LICENSE_MODEL}?responseCode=${response.status}`);
    }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const id = params.id;
    const licenseModels = await fetchLicenseModels(request);
    let licenseModel: IKodeverkLicenseModel | undefined;
    if (id !== undefined) {
        licenseModel = await fetchLicenseModel(request, id);
    }

    return json({
        licenseModel,
        licenseModels,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

export default function EditLicenseModel() {
    const { licenseModel, licenseModels } = useLoaderData<typeof loader>();

    return (
        <EditableListEditModal
            onCloseUrl={SETTINGS_LICENSE_MODEL}
            editTitle={'Rediger lisensmodell'}
            createNewTitle={'Legg til ny lisensmodell'}
            errorText={'Denne lisensmodellen finnes allerede.'}
            nameText={licenseModel?.name || ''}
            descriptionText={licenseModel?.description || ''}
            saveChangesButtonText={'Lagre endringer'}
            saveNewButtonText={'Opprett lisensmodell'}
            items={licenseModels}
        />
    );
}
