import React from 'react';
import {Button, Loader, Modal, Textarea, TextField, VStack} from "@navikt/ds-react";
import {
    Form,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
} from "@remix-run/react";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {
    createApplicationCategory,
    editApplicationCategory,
    fetchApplicationCategory
} from "~/data/fetch-kodeverk";
import {NotePencilIcon} from "@navikt/aksel-icons";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {BASE_PATH} from "../../environment";

export async function action({params, request}: ActionFunctionArgs) {
    const data = await request.formData()
    const name = data.get("categoryname") as string
    const description = data.get("description") as string
    const intent = data.get('intent') as string
    const categoryId = params.id

    if (name) {
        if (intent === "edit" && categoryId) {
            const response = await editApplicationCategory(
                request.headers.get("Authorization"),
                categoryId,
                name,
                description
            )
            return redirect(`/settings/application-category?responseCode=${response.status}`)

        }
        if (intent === "create") {
            const response = await createApplicationCategory(
                request.headers.get("Authorization"),
                name,
                description
            )
            return redirect(`/settings/application-category?responseCode=${response.status}`)
        }
    }
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const categoryId = params.id
    if (categoryId === undefined) return null
    const response = await fetchApplicationCategory(request, categoryId);
    const applicationCategory: IKodeverkApplicationCategory = await response.json()

    return json({
        applicationCategory,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function EditApplicationCategory() {
    const params = useParams<string>()
    const isEdit = !!params.id

    const navigate = useNavigate()
    const response = useNavigation()

    const loaderData = useLoaderData<typeof loader>()
    const applicationCategory: IKodeverkApplicationCategory | undefined = loaderData?.applicationCategory


    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }

    return (
        <Modal
            open={true}
            onClose={() => navigate(`/settings/application-category`)}
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
                            defaultValue={applicationCategory?.name}
                        />
                        <Textarea
                            label="Beskrivelse"
                            name="description"
                            defaultValue={applicationCategory?.description}
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
                    >
                        {isEdit ? "Lagre endringer" : "Opprett kategori"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`/settings/application-category`)}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}