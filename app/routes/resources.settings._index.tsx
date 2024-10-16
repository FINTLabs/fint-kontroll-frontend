import {Heading, VStack} from "@navikt/ds-react";
import {CustomLink} from "~/components/resource/settings/CustomLink";
import {CustomLinkPanel} from "~/components/resource/settings/CustomLinkPanel";
import {BASE_PATH} from "../../environment";

export default function ResourcesSettings() {
    return (
        <VStack className={"content"} gap="4">
            <Heading className={"heading"} level="1" size="xlarge">Ressursinnstillinger</Heading>

            <CustomLinkPanel>
                <CustomLink
                    title={"Brukertyper"}
                    description={"Definer hvilke brukertyper som kan tildeles ressursen"}
                    link={`${BASE_PATH}/resources/settings/user-types`}
                />
                <CustomLink
                    title={"Applikasjonskategori"}
                    description={"Definer hvilke applikasjonskategorier ressursen tilhører"}
                    link={`${BASE_PATH}/resources/settings/application-category`}
                />
            </CustomLinkPanel>
        </VStack>
    );
}