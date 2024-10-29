import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkLicenseModel} from "~/data/types";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {fetchLicenseModels} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {
    SETTINGS,
    SETTINGS_LICENSE_MODEL,
    getLicenseModelEditUrl,
    getLicenseModelDeleteUrl,
    SETTINGS_LICENSE_MODEL_CREATE
} from "~/data/constants";
import {EditableList} from "~/components/resource/settings/KodeverkEditableList/EditableList";
import {SettingsHeader} from "~/components/resource/settings/SettingsHeader";

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
    const licenseModels: IKodeverkLicenseModel[] = loaderData.licenseModels
    const basePath = loaderData.basePath

    return (
        <div className={"content"}>
            <VStack gap="4">
                <SettingsHeader title={"Lisensmodeller"} text={"Lisensmodeller som kan knyttes til en lisens."}/>

                <EditableList
                    list={licenseModels}
                    getEditUrl={getLicenseModelEditUrl}
                    getDeleteUrl={getLicenseModelDeleteUrl}
                    createNewUrl={`${basePath}${SETTINGS_LICENSE_MODEL_CREATE}`}
                />
            </VStack>
        </div>
    );
}