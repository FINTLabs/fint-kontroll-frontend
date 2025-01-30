import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchUserTypes} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {getEditUserTypeUrl, SETTINGS, SETTINGS_USER_TYPES} from "~/data/paths";
import {SettingsHeader} from "~/components/settings/SettingsHeader";
import {MappingList} from "~/components/settings/KodeverkMappingList/MappingList";
import {IKodeverkUserType} from "~/data/types/kodeverkTypes";

export const handle = {
    breadcrumb: () => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={SETTINGS} className={"breadcrumb-link"}>Innstillinger</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={SETTINGS_USER_TYPES} className={"breadcrumb-link"}>Brukertyper</Link>
            </HStack>
        </HStack>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const userTypes = await fetchUserTypes(request);
    return json({userTypes})
}

export default function SettingsUserTypes() {
    const loaderData = useLoaderData<typeof loader>();
    const userTypes: IKodeverkUserType[] = loaderData.userTypes

    return (
        <div className={"content"}>
            <VStack gap="4">
                <SettingsHeader
                    title={"Brukertyper"}
                    text={
                        "FINT Kontroll har et sett ferdigdefinerte brukertyper. " +
                        "Disse brukes til å kontrollere hvem som kan få tilgang til de ulike ressursene. " +
                        "Her kan du endre navnet på disse brukertypene som vises i FINT Kontroll. " +
                        "I fremtiden vil det komme mer funksjonalitet knyttet til brukertyper."
                    }
                />
                <MappingList
                    listItems={userTypes}
                    name={"Brukertype"}
                    getEditItemUrl={getEditUserTypeUrl}
                />
            </VStack>
        </div>
    );
}