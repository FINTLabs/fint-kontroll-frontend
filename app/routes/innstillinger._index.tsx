import {Heading, VStack} from "@navikt/ds-react";
import {CustomLink} from "~/components/settings/CustomLink";
import {CustomLinkPanel} from "~/components/settings/CustomLinkPanel";
import {BASE_PATH} from "../../environment";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {
    SETTINGS_APPLICATION_CATEGORY,
    SETTINGS_LICENSE_ENFORCEMENT,
    SETTINGS_LICENSE_MODEL,
    SETTINGS_USER_TYPES
} from "~/data/constants";

export async function loader() {
    return json({
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}


export default function ResourcesSettings() {
    const loaderData = useLoaderData<typeof loader>()
    const basePath = loaderData.basePath

    return (
        <VStack className={"content"} gap="4">
            <Heading className={"heading"} level="1" size="xlarge">Rediger kodeverk</Heading>

            <CustomLinkPanel>
                <CustomLink
                    title={"Brukertyper"}
                    description={"Endre navn på brukertyper som kan tildeles ressursen."}
                    link={`${basePath}${SETTINGS_USER_TYPES}`}
                />
                <CustomLink
                    title={"Applikasjonskategori"}
                    description={"Innstillinger for applikasjonskategorier som kan brukes for å gruppere og beskrive ressurser."}
                    link={`${basePath}${SETTINGS_APPLICATION_CATEGORY}`}
                />
                <CustomLink
                    title={"Lisensmodeller"}
                    description={"Lisensmodeller som kan knyttes til en lisens."}
                    link={`${basePath}${SETTINGS_LICENSE_MODEL}`}
                />
                <CustomLink
                    title={"Håndhevingstype"}
                    description={"Hvordan ulike lisensmodeller kan håndheves av systemer for forvaltning av applikasjonen."}
                    link={`${basePath}${SETTINGS_LICENSE_ENFORCEMENT}`}
                />
            </CustomLinkPanel>
        </VStack>
    );
}