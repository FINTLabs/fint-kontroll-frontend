import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { editUserType, fetchUserTypes } from '~/data/fetch-kodeverk';
import { LoaderFunctionArgs } from '@remix-run/router';
import { SETTINGS_USER_TYPES } from '~/data/paths';
import { MappingListModal } from '~/components/settings/KodeverkMappingList/MappingListModal';

export async function action({ params, request }: ActionFunctionArgs) {
    const data = await request.formData();
    const id = params.id;
    if (!id) return null;
    const label = data.get('fkLabel') as string;

    if (!label) return null;

    const response = await editUserType(request.headers.get('Authorization'), id, label);
    return redirect(`${SETTINGS_USER_TYPES}?responseCode=${response.status}`);
}

export async function loader({ request }: LoaderFunctionArgs) {
    const allUserTypes = await fetchUserTypes(request);
    return { allUserTypes };
}

export default function EditUserType() {
    const { allUserTypes } = useLoaderData<typeof loader>();

    return (
        <MappingListModal
            allItems={allUserTypes}
            title={'Rediger navn på brukertype'}
            onCloseUrl={SETTINGS_USER_TYPES}
            duplicateErrorText={'En brukertype med samme navn eksisterer allerede.'}
        />
    );
}
