import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {BodyShort, Heading, HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import { IKodeverkUserType} from "~/data/types";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {fetchUserTypes} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {SETTINGS, SETTINGS_USER_TYPES} from "~/data/constants";
import {UserTypeTable} from "~/components/resource/settings/UserTypeTable";
import {SettingsHeader} from "~/components/resource/settings/SettingsHeader";

export const handle = {
    breadcrumb: () => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <Link to={SETTINGS}>Innstillinger</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={SETTINGS_USER_TYPES}>Brukertyper</Link>
            </HStack>
        </HStack>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const userTypes = await fetchUserTypes(request);
    return json({
        userTypes,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function SettingsUserTypes() {
    const loaderData = useLoaderData<typeof loader>();
    const userTypes: IKodeverkUserType[] = loaderData.userTypes
    const basePath = loaderData.basePath

    return (
        <div className={"content"}>
            <VStack gap="4">
                <SettingsHeader
                    title={"Brukertyper"}
                    text={"Brukertyper definerer hvem som kan få tilgang til og benytte seg av ressursen og/eller lisensen. Her kan du sette egendefinerte navn på de ulike typene av brukere."}
                />
                <UserTypeTable userTypes={userTypes} basePath={basePath}/>
            </VStack>
        </div>
    );
}