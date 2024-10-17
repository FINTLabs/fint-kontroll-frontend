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
import {BASE_PATH} from "../../environment";
import {SETTINGS_APPLICATION_CATEGORY} from "~/data/constants";

export async function action({params, request}: ActionFunctionArgs) {
    const categoryId = params.id
    if (categoryId) {
        const response = await deleteApplicationCategory(
            request.headers.get("Authorization"),
            categoryId
        )
        return redirect(`${SETTINGS_APPLICATION_CATEGORY}?responseCode=${response.status}`)
    }

}

export async function loader({params, request}: LoaderFunctionArgs) {
    const categoryId = params.id
    if (categoryId === undefined) return null
    const applicationCategory = await fetchApplicationCategory(request, categoryId);

    return json({
        applicationCategory,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function DeleteApplicationCategory() {
    const navigate = useNavigate()
    const response = useNavigation()

    const loaderData = useLoaderData<typeof loader>()
    const applicationCategory = loaderData?.applicationCategory

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
                        onClick={() => navigate(SETTINGS_APPLICATION_CATEGORY)}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}