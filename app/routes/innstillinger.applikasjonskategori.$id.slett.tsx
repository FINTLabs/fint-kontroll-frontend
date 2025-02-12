import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { deleteApplicationCategory, fetchApplicationCategory } from '~/data/fetch-kodeverk';
import { LoaderFunctionArgs } from '@remix-run/router';
import { BASE_PATH } from '../../environment';
import { SETTINGS_APPLICATION_CATEGORY } from '~/data/paths';
import { EditableListDeleteModal } from '~/components/settings/KodeverkEditableList/EditableListDeleteModal';

export async function action({ params, request }: ActionFunctionArgs) {
    const categoryId = params.id;
    if (categoryId) {
        const response = await deleteApplicationCategory(
            request.headers.get('Authorization'),
            categoryId
        );
        return redirect(`${SETTINGS_APPLICATION_CATEGORY}?responseCode=${response.status}`);
    }
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const categoryId = params.id;
    if (categoryId === undefined) return null;
    const applicationCategory = await fetchApplicationCategory(request, categoryId);
    return {
        applicationCategory,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function DeleteApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const applicationCategory = loaderData?.applicationCategory;

    return (
        <EditableListDeleteModal
            title={`Slett kategori: ${applicationCategory?.name}`}
            text={'Er du sikker på at du vil slette denne kategorien?'}
            onCloseUrl={SETTINGS_APPLICATION_CATEGORY}
        />
    );
}
