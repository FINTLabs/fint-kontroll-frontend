import {Link, useActionData, useLoaderData, useNavigation} from "@remix-run/react";
import React from "react";
import {HStack, Loader, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkLicenseModel} from "~/data/types";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {
    createLicenseModel,
    deleteLicenseModel,
    editLicenseModel,
    fetchLicenseModels
} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {
    SETTINGS,
    SETTINGS_LICENSE_MODEL,
    getLicenseModelEditUrl
} from "~/data/constants";
import {EditableList} from "~/components/settings/KodeverkEditableList/EditableList_new";
import {SettingsHeader} from "~/components/settings/SettingsHeader";
import {EditableListEditModalNew} from "~/components/settings/KodeverkEditableList/EditableListEditModal_new";
import {EditableListDeleteModal} from "~/components/settings/KodeverkEditableList/EditableListDeleteModal_new";

export const handle = {
    breadcrumb: () => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <Link to={SETTINGS}>Innstillinger</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={SETTINGS_LICENSE_MODEL}>Lisensmodeller</Link>
            </HStack>
        </HStack>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const licenseModels = await fetchLicenseModels(request);
    return json({
        licenseModels,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function SettingsApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const response = useNavigation()
    const actionData = useActionData<typeof action>()

    const licenseModels: IKodeverkLicenseModel[] = loaderData.licenseModels

    const [openNewModal, setOpenNewModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [opedDeleteModal, setOpedDeleteModal] = React.useState(false);
    const [licenseModel, setLicenseModel] = React.useState<IKodeverkLicenseModel | undefined>(undefined);

    const handleNewLicenseModel = () => {
        setLicenseModel(undefined)
        setOpenNewModal(true)
    }

    const handleEditLicenseModel = (licenseModel: IKodeverkLicenseModel) => {
        setLicenseModel(licenseModel)
        setOpenEditModal(true)
    }

    const handleClickDelete = (licenseModel: IKodeverkLicenseModel) => {
        setLicenseModel(licenseModel)
        setOpedDeleteModal(true)
    }
    const handleCloseModal = () => {
        setOpenNewModal(false)
        setOpenEditModal(false)
        setOpedDeleteModal(false)
        setLicenseModel(undefined)
    }

    return (
        <div className={"content"}>
            <VStack gap="4">
                <SettingsHeader title={"Lisensmodeller"} text={"Lisensmodeller som kan knyttes til en lisens."}/>
                <EditableListEditModalNew
                    open={openNewModal}
                    onClose={handleCloseModal}
                    title={"Legg til ny lisensmodell"}
                    errorText={"Denne lisensmodellen finnes allerede."}
                    buttonText={"Opprett lisensmodell"}
                    items={licenseModels}
                    method={"post"}
                    actionType={"CREATE"}
                />
                <EditableListEditModalNew
                    open={openEditModal}
                    onClose={handleCloseModal}
                    title={"Rediger lisensmodell"}
                    errorText={"Denne lisensmodellen finnes allerede."}
                    buttonText={"Lagre endringer"}
                    item={licenseModel}
                    items={licenseModels}
                    method={"put"}
                    actionType={"EDIT"}
                />
                <EditableListDeleteModal
                    open={opedDeleteModal}
                    id={licenseModel?.id}
                    onClose={handleCloseModal}
                    title={`Slett lisensmodell: ${licenseModel?.name}`}
                    text={"Er du sikker på at du vil slette denne lisenmodellen?"}
                />
                <EditableList
                    list={licenseModels}
                    onCreateNew={handleNewLicenseModel}
                    onEdit={handleEditLicenseModel}
                    onDelete={handleClickDelete}
                />

            </VStack>
        </div>
    )
        ;
}

export async function action({params, request}: ActionFunctionArgs) {
    const data = await request.formData()
    const actionType = data.get('actionType') as string

    console.log("actionType", actionType)

    let apiResponse;
    let response;

    switch (actionType) {
        case "CREATE": {
            console.log("inside create")

            const name = data.get("categoryname") as string;
            if (!name) {
                return json({show: true, message: 'Kunne ikke opprette, mangler navn', variant: 'error'});
            }
            const description = data.get("description") as string;
            apiResponse = await createLicenseModel(
                request.headers.get("Authorization"),
                name,
                description
            );
            response = handleApiResponse(apiResponse, "Lisensmodellen er lagret");
            break;
        }
        case "EDIT": {
            const id = data.get("id") as string;
            const name = data.get("categoryname") as string;
            if (!name) {
                return json({show: true, message: 'Kunne ikke lagre endringer, mangler navn', variant: 'error'});
            }
            const description = data.get("description") as string;
            apiResponse = await editLicenseModel(
                request.headers.get("Authorization"),
                id,
                name,
                description
            )
            response = handleApiResponse(apiResponse, "Lisensmodellen ble lagret");
            break
        }
        case "DELETE": {
            const id = data.get("id") as string;
            if (!id) {
                return json({show: true, message: 'Kunne ikke slette, mangler id', variant: 'error'});
            }
            apiResponse = await deleteLicenseModel(
                request.headers.get("Authorization"),
                id
            )
            response = handleApiResponse(apiResponse, "Lisensmodellen ble lagret");
            break;
        }
        default: {
            console.log("found default")
            return json({show: true, message: 'Ukjent handlingstype', variant: 'error'});
        }

    }
    return json(response);
}

export const handleApiResponse = (
    apiResponse: Response,
    successMessage: string,
    variant?: 'success' | 'warning' | 'error' | 'info'
) => {
    if (apiResponse.ok) {
        return {
            message: successMessage,
            variant: variant || 'success',
        };
    } else {
        return {
            message: `Error updating. More info: Status: ${apiResponse.status}. StatusText: ${apiResponse.statusText}`,
            variant: 'error',
        };
    }
};

