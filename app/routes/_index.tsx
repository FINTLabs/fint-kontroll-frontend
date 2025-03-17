import { Bleed, Heading, HStack, VStack } from '@navikt/ds-react';

import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { json } from '@remix-run/node';
import { BASE_PATH } from '../../environment';
import { fetchMeInfo } from '~/data/fetch-me-info';
import { TildelerSection } from '~/components/landing-page/TildelerSection';
import { RessursadminSection } from '~/components/landing-page/RessursadminSection';
import { TjenesteadminSection } from '~/components/landing-page/TjenesteadminSection';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const me = await fetchMeInfo(request);
    return json({
        menuItems: me.menuItems,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

export default function Index() {
    const { basePath, menuItems } = useLoaderData<typeof loader>();

    return (
        <section className={'full-width'}>
            <Bleed marginInline="full" asChild>
                <HStack
                    paddingBlock="4"
                    justify={'center'}
                    style={{ backgroundColor: 'var(--beige-60)' }}>
                    <Heading
                        id={'welcome-text'}
                        level="1"
                        size="medium"
                        style={{ color: 'var(--red-primary)' }}>
                        Velkommen til FINT Kontroll!
                    </Heading>
                </HStack>
            </Bleed>
            <VStack gap="4">
                <TildelerSection basePath={basePath} menuItems={menuItems} />
                <RessursadminSection basePath={basePath} menuItems={menuItems} />
                <TjenesteadminSection basePath={basePath} menuItems={menuItems} />
            </VStack>
        </section>
    );
}
