import React from 'react';
import {useLoaderData} from "@remix-run/react";
import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {
    createApplicationCategory,
    editApplicationCategory,
    fetchApplicationCategories,
    fetchApplicationCategory
} from "~/data/fetch-kodeverk";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {BASE_PATH} from "../../environment";
import {SETTINGS_APPLICATION_CATEGORY} from "~/data/paths";
import {EditableListEditModal} from "~/components/settings/KodeverkEditableList/EditableListEditModal";

export async function action({params, request}: ActionFunctionArgs) {
    const data = await request.formData()
    const name = data.get("categoryname") as string
    const description = data.get("description") as string
    const intent = data.get('intent') as string
    const categoryId = params.id

    if (!name) return null


    if (intent === "edit" && categoryId) {
        const response = await editApplicationCategory(
            request.headers.get("Authorization"),
            categoryId,
            name,
            description
        )
        return redirect(`${SETTINGS_APPLICATION_CATEGORY}?responseCode=${response.status}`)

    }
    if (intent === "create") {
        const response = await createApplicationCategory(
            request.headers.get("Authorization"),
            name,
            description
        )
        return redirect(`${SETTINGS_APPLICATION_CATEGORY}?responseCode=${response.status}`)
    }

}

export async function loader({params, request}: LoaderFunctionArgs) {
    const categoryId = params.id
    const applicationCategories = await fetchApplicationCategories(request);
    let category: IKodeverkApplicationCategory | undefined;
    if (categoryId !== undefined) {
        category = await fetchApplicationCategory(request, categoryId);
    }

    return json({
        category,
        applicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function EditApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>()
    const category = loaderData?.category
    const allCategories = loaderData.applicationCategories

    return (
        <EditableListEditModal
            onCloseUrl={SETTINGS_APPLICATION_CATEGORY}
            editTitle={"Rediger kategori"}
            createNewTitle={"Legg til ny applikasjonskategori"}
            errorText={"Denne kategorien finnes allerede."}
            nameText={category?.name || ""}
            descriptionText={category?.description || ""}
            saveChangesButtonText={"Lagre endringer"}
            saveNewButtonText={"Opprett kategori"}
            items={allCategories}
        />
    )
}