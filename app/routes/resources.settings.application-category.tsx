import {Link, useLoaderData} from "@remix-run/react";
import React from "react";
import {BodyShort, Heading, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {IKodeverkApplicationCategory} from "~/data/types";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {fetchApplicationCategories} from "~/data/fetch-kodeverk";
import {ApplicationCategoryTable} from "~/components/resource/settings/ApplicationCategoryTable";

// finn ut hvorfor instilliner-lenken ikke funker her
export const handle = {
    breadcrumb: () => (
        <>
            <Link to={`/resources/settings`}>Innstillinger</Link>
            {" > "}
            <Link to={`/resources/settings/application-category`}>Applikasjonskategori</Link>
        </>
    )
}

export async function loader({request}: LoaderFunctionArgs) {
    const response = await fetchApplicationCategories(request);
    const kodeverkApplicationCategories: IKodeverkApplicationCategory[] = await response.json()

    return json({
        kodeverkApplicationCategories,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function ResourcesSettingsApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const kodeverkApplicationCategories: IKodeverkApplicationCategory[] = loaderData.kodeverkApplicationCategories
    const basePath = loaderData.basePath

    return (
        <div className={"content"}>
            <VStack gap="4">
                <VStack gap="4">
                    <Heading level="1" size="large">Applikasjonskategori</Heading>
                    <BodyShort spacing>
                        Her kan du endre egendefinerte kategorier som kan brukes for å gruppere og beskrive
                        ressurser.Vil i
                        fremtiden også kunne brukes til å begrense tilgang til ressurser basert på for eksempel
                        brukertype.
                    </BodyShort>
                </VStack>

                <ApplicationCategoryTable applicationCategories={kodeverkApplicationCategories} basePath={basePath}/>
            </VStack>
        </div>
    );
}