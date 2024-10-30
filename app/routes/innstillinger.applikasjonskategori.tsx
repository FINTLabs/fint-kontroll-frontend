import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {BodyShort, Heading, HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {fetchApplicationCategories} from "~/data/fetch-kodeverk";
import {ApplicationCategoryTable} from "~/components/settings/ApplicationCategoryTable";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {SETTINGS_APPLICATION_CATEGORY, SETTINGS} from "~/data/constants";

export const handle = {
    breadcrumb: () => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <Link to={SETTINGS}>Innstillinger</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={SETTINGS_APPLICATION_CATEGORY}>Applikasjonskategori</Link>
            </HStack>
        </HStack>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const applicationCategories = await fetchApplicationCategories(request);
    return json({
        applicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function SettingsApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const applicationCategories: IKodeverkApplicationCategory[] = loaderData.applicationCategories
    const basePath = loaderData.basePath

    return (
        <div className={"content"}>
            <VStack gap="4">
                <VStack gap="4">
                    <Heading level="1" size="large">Applikasjonskategori</Heading>
                    <BodyShort spacing>
                        Her kan du endre egendefinerte kategorier som brukes for å gruppere og beskrive
                        ressurser. Disse kategoriene vil i fremtiden også kunne brukes til å begrense tilgang
                        til ressurser basert på for eksempel brukertype.
                    </BodyShort>
                </VStack>

                <ApplicationCategoryTable applicationCategories={applicationCategories} basePath={basePath}/>
            </VStack>
        </div>
    );
}