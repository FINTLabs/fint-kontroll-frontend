import { Heading, VStack } from '@navikt/ds-react';
import { BASE_PATH } from '../../environment';
import { useLoaderData } from 'react-router';
import {
    SETTINGS_APPLICATION_CATEGORY,
    SETTINGS_LICENSE_ENFORCEMENT,
    SETTINGS_USER_TYPES,
} from '~/data/paths';
import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';

export async function loader() {
    return {
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function ResourcesSettings() {
    const loaderData = useLoaderData<typeof loader>();
    const basePath = loaderData.basePath;

    return (
        <VStack className={'content'} gap="space-12">
            <Heading className={'heading'} level="1" size="xlarge">
                Innstillinger for kodeverk
            </Heading>

            <LinkCardGrid bleed={false}>
                <LinkCard
                    title={'Brukertyper'}
                    description={'Endre navn på brukertyper som kan tildeles ressursen.'}
                    link={`${basePath}${SETTINGS_USER_TYPES}`}
                    hover={true}
                    border={true}
                />
                <LinkCard
                    title={'Applikasjonskategori'}
                    description={
                        'Innstillinger for applikasjonskategorier som kan brukes for å gruppere og beskrive ressurser.'
                    }
                    link={`${basePath}${SETTINGS_APPLICATION_CATEGORY}`}
                    hover={true}
                    border={true}
                />
                {/*<CustomLink
                    title={"Lisensmodeller"}
                    description={"Lisensmodeller som kan knyttes til en lisens."}
                    link={`${basePath}${SETTINGS_LICENSE_MODEL}`}
                />*/}
                <LinkCard
                    title={'Håndhevingstype'}
                    description={
                        'Hvordan ulike lisensmodeller kan håndheves av systemer for forvaltning av applikasjonen.'
                    }
                    link={`${basePath}${SETTINGS_LICENSE_ENFORCEMENT}`}
                    hover={true}
                    border={true}
                />
            </LinkCardGrid>
        </VStack>
    );
}
