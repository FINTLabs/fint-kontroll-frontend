import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyShort, Box, Button, HGrid } from '@navikt/ds-react';
import { IMeInfo } from '~/data/types/userTypes';
import { groupMenuItems } from '~/utils/helperFunctions';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export const ApiMenu = ({
    me,
    basePath,
    source,
}: {
    me?: IMeInfo;
    basePath?: string;
    source?: string;
}) => {
    const navigate = useNavigate();
    const menuItems = useMemo(() => (me?.menuItems ? groupMenuItems(me.menuItems) : []), [me]);

    const guiOnlyUrls = ['/innstillinger', '/tjeneste-admin/opprett-ny-applikasjonsressurs'];

    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                {me ? (
                    <Button
                        variant="tertiary"
                        icon={<MenuHamburgerIcon aria-hidden />}
                        iconPosition="left"
                        id="dropdown-button">
                        Meny
                    </Button>
                ) : (
                    <BodyShort>Noe er galt!</BodyShort>
                )}
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <HGrid columns={1} padding={'6'}>
                    <Box paddingBlock={'0 4'}>
                        <ActionMenu.Item
                            onSelect={() => navigate(`/#`)}
                            style={{ color: '#5149CA' }}>
                            Til forsiden
                        </ActionMenu.Item>
                        <ActionMenu.Item
                            style={{ color: '#5149CA' }}
                            rel="external noopener noreferrer"
                            target="_blank"
                            as="a"
                            href={`https://kontroll.novari.no/api${basePath}/swagger-ui/index.html`}>
                            Swagger statistikk (åpnes i ny fane)
                        </ActionMenu.Item>
                    </Box>
                    {menuItems
                        /*.filter((item) => {
                            if (source === 'gui') return true;
                            return !guiOnlyUrls.includes(item.url ?? '');
                        })*/
                        .map((item, index) => (
                            <Box key={`${item.sortOrder}-${item.url || item.text}`}>
                                {'children' in item ? (
                                    <ActionMenu.Group
                                        label={item.text}
                                        style={{ fontSize: '100px' }}>
                                        {item.children
                                            .filter((item) => {
                                                if (source === 'gui') return true;
                                                return !guiOnlyUrls.includes(item.url ?? '');
                                            })
                                            .map((child) => (
                                                <ActionMenu.Item
                                                    key={`${child.sortOrder}-${child.url || child.text}`}
                                                    onSelect={() => navigate(child.url)}>
                                                    {child.text}
                                                </ActionMenu.Item>
                                            ))}
                                    </ActionMenu.Group>
                                ) : (
                                    <ActionMenu.Item onSelect={() => navigate(item.url)}>
                                        {item.text}
                                    </ActionMenu.Item>
                                )}
                                {index < menuItems.length - 1 && (
                                    <Box paddingBlock={'4'}>
                                        <ActionMenu.Divider />
                                    </Box>
                                )}
                            </Box>
                        ))}
                </HGrid>
            </ActionMenu.Content>
        </ActionMenu>
    );
};
