import React from 'react';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router';
import { editLicenseEnforcement, fetchLicenseEnforcements } from '~/data/fetch-kodeverk';
import { SETTINGS_LICENSE_ENFORCEMENT } from '~/data/paths';
import { MappingListModal } from '~/components/settings/KodeverkMappingList/MappingListModal';

export async function action({ params, request }: ActionFunctionArgs) {
    const data = await request.formData();
    const id = params.id;
    if (!id) return null;
    const label = data.get('fkLabel') as string;

    if (!label) return null;

    const response = await editLicenseEnforcement(request.headers.get('Authorization'), id, label);
    return redirect(`${SETTINGS_LICENSE_ENFORCEMENT}?responseCode=${response.status}`);
}

export async function loader({ request }: LoaderFunctionArgs) {
    const allLicenceEnforcements = await fetchLicenseEnforcements(request);
    return { allLicenceEnforcements };
}

export default function EditLicenseEnforcement() {
    const { allLicenceEnforcements } = useLoaderData<typeof loader>();

    return (
        <MappingListModal
            allItems={allLicenceEnforcements}
            title={'Rediger navn på håndhevingstypen'}
            onCloseUrl={SETTINGS_LICENSE_ENFORCEMENT}
            duplicateErrorText={'En håmdhevingstype med samme navn eksisterer allerede'}
        />
    );
}
