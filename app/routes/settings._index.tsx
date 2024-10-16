import {Heading, VStack} from "@navikt/ds-react";
import {CustomLink} from "~/components/resource/settings/CustomLink";
import {CustomLinkPanel} from "~/components/resource/settings/CustomLinkPanel";
import {BASE_PATH} from "../../environment";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

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
            <Heading className={"heading"} level="1" size="xlarge">Ressursinnstillinger</Heading>

            <CustomLinkPanel>
                <CustomLink
                    title={"Brukertyper"}
                    description={"Definer hvilke brukertyper som kan tildeles ressursen"}
                    link={`${basePath}/settings/user-types`}
                />
                <CustomLink
                    title={"Applikasjonskategori"}
                    description={"Definer hvilke applikasjonskategorier ressursen tilhører"}
                    link={`${basePath}/settings/application-category`}
                />
            </CustomLinkPanel>
        </VStack>
    );
}