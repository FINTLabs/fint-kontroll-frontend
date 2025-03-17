import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';
import { IMenuItem } from '~/data/types/userTypes';
import { RESOURCES, ROLES, USERS } from '~/data/paths';
import { PersonGroupIcon, PersonIcon, TableIcon } from '@navikt/aksel-icons';

export const TildelerSection = ({
    menuItems,
    basePath,
}: {
    menuItems: IMenuItem[];
    basePath: string;
}) => {
    const hasUsersAccess = menuItems.some((item) => item.url === USERS);
    const hasRolesAccess = menuItems.some((item) => item.url === ROLES);
    const hasResourcesAccess = menuItems.some((item) => item.url === RESOURCES);

    if (!hasUsersAccess && !hasRolesAccess && !hasResourcesAccess) return null;

    return (
        <LinkCardGrid color={'var(--beige-60)'} title={'Tilgansstyring'}>
            {hasUsersAccess && (
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
            {hasRolesAccess && (
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
            {hasResourcesAccess && (
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
    );
};
