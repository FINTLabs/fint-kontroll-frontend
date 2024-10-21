import React, {useCallback, useMemo, useState} from 'react';
import {Button, Loader, Modal, TextField, VStack} from "@navikt/ds-react";
import {
    Form,
    useLoaderData,
    useNavigate,
    useNavigation,
    useParams,
} from "@remix-run/react";
import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {
    editUserType,
    fetchUserTypes
} from "~/data/fetch-kodeverk";
import {NotePencilIcon} from "@navikt/aksel-icons";
import {LoaderFunctionArgs} from "@remix-run/router";
import {BASE_PATH} from "../../environment";
import {SETTINGS_USER_TYPES} from "~/data/constants";

export async function action({params, request}: ActionFunctionArgs) {
    const data = await request.formData()
    const id = params.id
    if (!id) return null
    const label = data.get("fkLabel") as string

    if (!label) return null

    const response = await editUserType(
        request.headers.get("Authorization"),
        id,
        label
    )
    return redirect(`${SETTINGS_USER_TYPES}?responseCode=${response.status}`)
}


export async function loader({request}: LoaderFunctionArgs) {
    const allUserTypes = await fetchUserTypes(request);
    return json({
        allUserTypes,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function EditUserType() {
    const params = useParams<string>()
    const navigate = useNavigate()
    const response = useNavigation()

    const loaderData = useLoaderData<typeof loader>()
    const allUserTypes = loaderData.allUserTypes

    const currentUserType = useMemo(() => allUserTypes.find(userType => userType.id === Number(params.id)), [allUserTypes, params.id])
    const [label, setLabel] = useState<string | undefined>(currentUserType?.fkLabel)

    const labelAlreadyExist = useCallback(
        (label: string) => allUserTypes.some(userType => userType.fkLabel === label.trim() && userType.id !== currentUserType?.id),
        [allUserTypes, currentUserType?.id]
    );

    const duplicateLabel = useMemo(() => labelAlreadyExist(label || ""), [labelAlreadyExist, label]);
    const unchangedLabel = useMemo(() => label?.trim() === currentUserType?.fkLabel, [currentUserType?.fkLabel, label]);


    if (response.state === "loading") {
        return <div className={"spinner"}>
            <Loader size="3xlarge" title="Venter..."/>
        </div>
    }


    return (
        <Modal
            open={true}
            onClose={() => navigate(SETTINGS_USER_TYPES)}
            header={{
                heading: "Rediger navn på brukertype: " + currentUserType?.label,
                closeButton: false,
                icon: <NotePencilIcon aria-hidden/>
            }}
            width="small"
        >
            <Form method={"PATCH"}>
                <Modal.Body>
                    <VStack gap={"4"}>
                        <TextField
                            label="Egendefinert navn"
                            name="fkLabel"
                            type="text"
                            autoComplete="off"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            error={duplicateLabel ? "Dette navnet finnes allerede på en annen brukertype." : undefined}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={response.state === "submitting"}
                        disabled={!label || duplicateLabel || unchangedLabel}
                    >
                        {"Lagre endringer"}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate(SETTINGS_USER_TYPES)}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}