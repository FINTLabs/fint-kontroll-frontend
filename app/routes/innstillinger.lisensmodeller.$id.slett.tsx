import React from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router';
import { deleteLicenseModel, fetchLicenseModel } from '~/data/fetch-kodeverk';
import { BASE_PATH } from '../../environment';
import { SETTINGS_LICENSE_MODEL } from '~/data/paths';
import { EditableListDeleteModal } from '~/components/settings/KodeverkEditableList/EditableListDeleteModal';
import { IKodeverkLicenseModel } from '~/data/types/kodeverkTypes';

export async function action({ params, request }: ActionFunctionArgs) {
    const licenseModelId = params.id;
    if (licenseModelId) {
        const response = await deleteLicenseModel(
            request.headers.get('Authorization'),
            licenseModelId
        );
        return redirect(`${SETTINGS_LICENSE_MODEL}?responseCode=${response.status}`);
    }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const id = params.id;
    if (id === undefined) return null;
    const licenseModel: IKodeverkLicenseModel = await fetchLicenseModel(request, id);
    return {
        licenseModel,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function DeleteLicenseModel() {
    const loaderData = useLoaderData<typeof loader>();
    const licenseModel = loaderData?.licenseModel;

    return (
        <EditableListDeleteModal
            title={`Slett lisensmodell: ${licenseModel?.name}`}
            text={'Er du sikker på at du vil slette denne lisenmodellen?'}
            onCloseUrl={SETTINGS_LICENSE_MODEL}
        />
    );
}
