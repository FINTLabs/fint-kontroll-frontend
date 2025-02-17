import { Bleed, Heading, HStack, VStack } from '@navikt/ds-react';
import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';
import { RESOURCES, ROLES, USERS } from '~/data/paths';
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

export async function loader({ params, request }: LoaderFunctionArgs) {
    return json({
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const basePath = data.basePath;

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
                <LinkCardGrid color={'var(--beige-60)'} title={'Hva vil du gjøre?'}>
                    <LinkCard
                        title={'Administrer brukertildelinger'}
                        description={
                            'Se en oversikt over alle brukere. Her kan du gi eller endre tildelinger på brukernivå.'
                        }
                        link={`${basePath}${USERS}`}
                        Icon={<PersonIcon />}
                        colorProfile={'blue'}
                    />
                    <LinkCard
                        title={'Administrer gruppetildelinger'}
                        description={
                            'Se en oversikt over alle grupper, og deres medlemmer og ressurser. Her kan du gi eller endre tilgang til en ressurs på gruppenivå.'
                        }
                        link={`${basePath}${ROLES}`}
                        Icon={<PersonGroupIcon />}
                        colorProfile={'blue'}
                    />
                    <LinkCard
                        title={'Gi eller endre tilgang til en ressurs'}
                        description={
                            'Se en oversikt over alle ressurser i systemet og redigere hvilkne brukere og grupper som har tilgang til dem.'
                        }
                        Icon={<TableIcon />}
                        link={`${basePath}${RESOURCES}`}
                        colorProfile={'blue'}
                    />
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
            </VStack>
        </section>
    );
}
