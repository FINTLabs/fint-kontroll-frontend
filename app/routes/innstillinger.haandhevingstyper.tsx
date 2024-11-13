import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkLicenceEnforcement} from "~/data/types";
import {json} from "@remix-run/node";
import {fetchLicenseEnforcements} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {getEditLicenceEnforcement, SETTINGS, SETTINGS_LICENSE_ENFORCEMENT} from "~/data/constants";
import {SettingsHeader} from "~/components/settings/SettingsHeader";
import {MappingList} from "~/components/settings/KodeverkMappingList/MappingList";

export const handle = {
    breadcrumb: () => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={SETTINGS} className={"breadcrumb-link"}>Innstillinger</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={SETTINGS_LICENSE_ENFORCEMENT} className={"breadcrumb-link"}>Håndhevingstyper</Link>
            </HStack>
        </HStack>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const licenseEnforcements = await fetchLicenseEnforcements(request);
    return json({licenseEnforcements})
}

export default function SettingsLicenceEnforcement() {
    const loaderData = useLoaderData<typeof loader>();
    const licenseEnforcements: IKodeverkLicenceEnforcement[] = loaderData.licenseEnforcements

    return (
        <div className={"content"}>
            <VStack gap="4">
                <SettingsHeader
                    title={"Håndhevingstyper"}
                    text={"Hvordan ulike lisensmodeller kan håndheves av systemer for forvaltning av applikasjonen."}
                />
                <MappingList
                    listItems={licenseEnforcements}
                    name={"Håndhevingstype"}
                    getEditItemUrl={getEditLicenceEnforcement}
                />
            </VStack>
        </div>
    );
}