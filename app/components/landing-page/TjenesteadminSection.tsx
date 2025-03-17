import { IMenuItem } from '~/data/types/userTypes';
import { LinkCard, LinkCardGrid } from '~/components/common/LinkCard';
import { SERVICE_ADMIN, SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE } from '~/data/paths';
import { TableIcon } from '@navikt/aksel-icons';

export const TjenesteadminSection = ({
    menuItems,
    basePath,
}: {
    menuItems: IMenuItem[];
    basePath: string;
}) => {
    const hasServiceAdminAccess = menuItems.some((item) => item.url === SERVICE_ADMIN);
    const hasCreateNewResourceAccess = menuItems.some(
        (item) => item.url === SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE
    );

    if (!hasServiceAdminAccess && !hasCreateNewResourceAccess) return null;

    return (
        <LinkCardGrid color={'var(--beige-60)'} title={'Ressursadministrasjon'}>
            {hasServiceAdminAccess && (
                <LinkCard
                    title={'Ressursadministrasjon'}
                    description={'Se en oversikt over alle ressurser i systemet.'}
                    Icon={<TableIcon />}
                    link={`${basePath}${SERVICE_ADMIN}`}
                    colorProfile={'blue'}
                />
            )}
            {hasCreateNewResourceAccess && (
                <LinkCard
                    title={'Ny ressurs'}
                    description={'Opprett en ny ressurs'}
                    Icon={<TableIcon />}
                    link={`${basePath}${SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE}`}
                    colorProfile={'blue'}
                />
            )}
        </LinkCardGrid>
    );
};
