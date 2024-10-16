import React from 'react';
import {BodyShort, Button, Loader, Modal} from "@navikt/ds-react";
import {
    Form,
    useLoaderData,
    useNavigate,
    useNavigation,
} from "@remix-run/react";
import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {
    deleteApplicationCategory,
    fetchApplicationCategory
} from "~/data/fetch-kodeverk";
import {TrashIcon} from "@navikt/aksel-icons";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {BASE_PATH} from "../../environment";

export async function action({params, request}: ActionFunctionArgs) {
    const categoryId = params.id
    if (categoryId) {
        const response = await deleteApplicationCategory(
            request.headers.get("Authorization"),
            categoryId
        )
        return redirect(`/resources/settings/application-category?responseCode=${response.status}`)
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
            onClose={() => navigate(`/resources/settings/application-category`)}
            header={{
                heading: `Slett kategori: ${applicationCategory?.name}`,
                closeButton: false,
                icon: <TrashIcon aria-hidden/>
            }}
            width="small"
        >
            <Form method={"DELETE"}>
                <Modal.Body>
                    <BodyShort>Er du sikker på at du vil slette denne kategorien?</BodyShort>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        type="submit"
                        variant="danger"
                        loading={response.state === "submitting"}
                    >
                        Slett
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(`/resources/settings/application-category`)}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}