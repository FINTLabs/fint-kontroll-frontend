import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyShort, Box, Button, HGrid } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { IMeInfo } from '~/data/types/userTypes';
import { groupMenuItems } from '~/utils/helperFunctions';
import { useMemo } from 'react';

export const ApiMenu = ({ me }: { me?: IMeInfo; basePath?: string }) => {
    const navigate = useNavigate();
    const menuItems = useMemo(() => (me?.menuItems ? groupMenuItems(me.menuItems) : []), [me]);

    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                {me ? (
                    <Button
                        className={'menu-button'}
                        variant="tertiary-neutral"
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
                    </Box>
                    {menuItems.length &&
                        menuItems.map((item, index) => (
                            <Box key={`${item.sortOrder}-${item.url || item.text}`}>
                                {'children' in item ? (
                                    <ActionMenu.Group
                                        label={item.text}
                                        style={{ fontSize: '100px' }}>
                                        {item.children.map((child) => (
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
