import React, {useCallback, useMemo, useState} from 'react';
import {Button, Loader, Modal, Textarea, TextField, VStack} from "@navikt/ds-react";
import {
    Form, useActionData,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
} from "@remix-run/react";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {
    createApplicationCategory,
    editApplicationCategory, fetchApplicationCategories,
    fetchApplicationCategory
} from "~/data/fetch-kodeverk";
import {NotePencilIcon} from "@navikt/aksel-icons";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {BASE_PATH} from "../../environment";
import {SETTINGS_APPLICATION_CATEGORY} from "~/data/constants";

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
    const params = useParams<string>()
    const isEdit = !!params.id

    const navigate = useNavigate()
    const response = useNavigation()

    const loaderData = useLoaderData<typeof loader>()
    const category = loaderData?.category
    const allCategories = loaderData.applicationCategories

    const [name, setName] = useState(category?.name || "");
    const nameAlreadyExist = useCallback(
        (name: string) => allCategories.some(category => category.name === name.trim() && category.id !== category?.id),
        [allCategories]
    );

    const duplicateName = useMemo(() => nameAlreadyExist(name), [nameAlreadyExist, name]);

    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }


    return (
        <Modal
            open={true}
            onClose={() => navigate(SETTINGS_APPLICATION_CATEGORY)}
            header={{
                heading: isEdit ? "Rediger kategori" : "Legg til ny applikasjonskategori",
                closeButton: false,
                icon: <NotePencilIcon aria-hidden/>
            }}
            width="small"
        >
            <Form method={isEdit ? "PUT" : "POST"}>
                <Modal.Body>
                    <VStack gap={"4"}>
                        <TextField
                            label="Navn"
                            name="categoryname"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={duplicateName ? "Denne kategorien finnes allerede." : undefined}
                        />
                        <Textarea
                            label="Beskrivelse"
                            name="description"
                            defaultValue={category?.description}
                            minRows={4}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={response.state === "submitting"}
                        name="intent"
                        value={isEdit ? "edit" : "create"}
                        disabled={!name || duplicateName}
                    >
                        {isEdit ? "Lagre endringer" : "Opprett kategori"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(SETTINGS_APPLICATION_CATEGORY)}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}