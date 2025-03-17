import { IMenuItem } from '~/data/types/userTypes';
import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';
import { RESOURCE_ADMIN, RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT } from '~/data/paths';
import { TableIcon } from '@navikt/aksel-icons';

export const RessursadminSection = ({
    menuItems,
    basePath,
}: {
    menuItems: IMenuItem[];
    basePath: string;
}) => {
    if (
        !menuItems.some((item) =>
            [RESOURCE_ADMIN, RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT].includes(item.url)
        )
    ) {
        return null;
    }
    return (
        <LinkCardGrid color={'var(--beige-60)'} title={'Roller og rettigheter'}>
            {menuItems.some((item) => item.url === `${RESOURCE_ADMIN}`) && (
                <LinkCard
                    title={'Administrer brukere med rolletilknytning'}
                    description={'Se en oversikt over alle brukere med rolletilknytning.'}
                    Icon={<TableIcon />}
                    link={`${basePath}${RESOURCE_ADMIN}`}
                    colorProfile={'blue'}
                />
            )}
            {menuItems.some((item) => item.url === `${RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT}`) && (
                <LinkCard
                    title={'Tildel rettigheter'}
                    description={'Tildel en rolle til en bruker.'}
                    Icon={<TableIcon />}
                    link={`${basePath}${RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT}`}
                    colorProfile={'blue'}
                />
            )}
        </LinkCardGrid>
    );
};
