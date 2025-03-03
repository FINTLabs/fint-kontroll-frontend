import { Bleed, Heading, HStack, VStack } from '@navikt/ds-react';
import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';
import {
    RESOURCE_ADMIN,
    RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT,
    RESOURCES,
    ROLES,
    SERVICE_ADMIN,
    SETTINGS,
    USERS,
} from '~/data/paths';
import {
    PersonGroupIcon,
    PersonIcon,
    TableIcon,
    PersonGroupFillIcon,
    PersonSuitFillIcon,
} from '@navikt/aksel-icons';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { json } from '@remix-run/node';
import { BASE_PATH } from '../../environment';
import { fetchMeInfo } from '~/data/fetch-me-info';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const me = await fetchMeInfo(request);

    return json({
        menuItems: me.menuItems,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

// TODO: Change icons, colors and descriptions
export default function Index() {
    const { basePath, menuItems } = useLoaderData<typeof loader>();

    console.log('menuItems', menuItems);

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
                {menuItems.some((item) =>
                    [`${USERS}`, `${ROLES}`, `${RESOURCES}`].includes(item.url)
                ) && (
                    <>
                        <LinkCardGrid color={'var(--beige-60)'} title={'Tilgansstyring'}>
                            {menuItems.some((item) => item.url === `${USERS}`) && (
                                <LinkCard
                                    title={'Administrer brukertildelinger'}
                                    description={
                                        'Se en oversikt over alle brukere. Her kan du gi eller endre tildelinger på brukernivå.'
                                    }
                                    link={`${basePath}${USERS}`}
                                    Icon={<PersonIcon />}
                                    colorProfile={'blue'}
                                />
                            )}
                            {menuItems.some((item) => item.url === `${ROLES}`) && (
                                <LinkCard
                                    title={'Administrer gruppetildelinger'}
                                    description={
                                        'Se en oversikt over alle grupper, og deres medlemmer og ressurser. Her kan du gi eller endre tilgang til en ressurs på gruppenivå.'
                                    }
                                    link={`${basePath}${ROLES}`}
                                    Icon={<PersonGroupIcon />}
                                    colorProfile={'blue'}
                                />
                            )}
                            {menuItems.some((item) => item.url === `${RESOURCES}`) && (
                                <LinkCard
                                    title={'Gi eller endre tilgang til en ressurs'}
                                    description={
                                        'Se en oversikt over alle ressurser i systemet og redigere hvilkne brukere og grupper som har tilgang til dem.'
                                    }
                                    Icon={<TableIcon />}
                                    link={`${basePath}${RESOURCES}`}
                                    colorProfile={'blue'}
                                />
                            )}
                        </LinkCardGrid>
                        <LinkCardGrid color={'var(--orange-20)'} title={'Brukertildelinger'}>
                            <LinkCard
                                title={'Studenter'}
                                link={`${basePath}${USERS}?userType=STUDENT`}
                                Icon={<PersonGroupFillIcon />}
                                colorProfile={'red'}
                            />
                            <LinkCard
                                title={'Ansatte'}
                                link={`${basePath}${USERS}?userType=EMPLOYEESTAFF`}
                                Icon={<PersonSuitFillIcon />}
                                colorProfile={'red'}
                            />
                        </LinkCardGrid>
                    </>
                )}
                {menuItems.some((item) =>
                    [`${SERVICE_ADMIN}`, `${SETTINGS}`].includes(item.url)
                ) && (
                    <LinkCardGrid color={'var(--beige-60)'} title={'Ressursadministrasjon'}>
                        {menuItems.some((item) => item.url === `${SERVICE_ADMIN}`) && (
                            <LinkCard
                                title={'Ressursadministrasjon'}
                                description={'Se en oversikt over alle ressurser i systemet.'}
                                Icon={<TableIcon />}
                                link={`${basePath}${SERVICE_ADMIN}`}
                                colorProfile={'red'}
                            />
                        )}
                        {menuItems.some((item) => item.url === `${SETTINGS}`) && (
                            <LinkCard
                                title={'Innstillinger'}
                                description={'Se og endre kodeverk, systemtyper og kategorier.'}
                                Icon={<TableIcon />}
                                link={`${basePath}${SETTINGS}`}
                                colorProfile={'red'}
                            />
                        )}
                    </LinkCardGrid>
                )}
                {menuItems.some((item) =>
                    [`${RESOURCE_ADMIN}`, `${RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT}`].includes(
                        item.url
                    )
                ) && (
                    <LinkCardGrid color={'var(--beige-60)'} title={'Roller og rettigheter'}>
                        {menuItems.some((item) => item.url === `${RESOURCE_ADMIN}`) && (
                            <LinkCard
                                title={'Administrer brukere med rolletilknytning'}
                                description={
                                    'Se en oversikt over alle brukere med rolletilknytning.'
                                }
                                Icon={<TableIcon />}
                                link={`${basePath}${RESOURCE_ADMIN}`}
                                colorProfile={'red'}
                            />
                        )}
                        {menuItems.some(
                            (item) => item.url === `${RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT}`
                        ) && (
                            <LinkCard
                                title={'Tildel rettigheter'}
                                description={'Tildel en rolle til en bruker.'}
                                Icon={<TableIcon />}
                                link={`${basePath}${RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT}`}
                                colorProfile={'red'}
                            />
                        )}
                    </LinkCardGrid>
                )}
            </VStack>
        </section>
    );
}
