import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyShort, Button, HGrid, HStack } from '@navikt/ds-react';
import { useNavigate } from '@remix-run/react';
import { IMeInfo, IMenuItem } from '~/data/types/userTypes';
import { groupMenuItems } from '~/components/common/CommonFunctions';

export const ApiMenu = ({ me }: { me?: IMeInfo; basePath?: string }) => {
    const navigate = useNavigate();

    console.log('APIMenu menuItems', menuItems);

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
                    <ActionMenu.Item onSelect={() => navigate(`/#`)} style={{ color: '#5149CA' }}>
                        Til forsiden
                    </ActionMenu.Item>
                    {me?.menuItems &&
                        groupMenuItems(me?.menuItems).map((item) =>
                            'children' in item ? (
                                <HStack key={item.id || item.url} paddingBlock={'6 0'}>
                                    <ActionMenu.Group
                                        label={item.text}
                                        style={{ fontSize: '100px' }}>
                                        {item.children.map((child) => (
                                            <MenuItem key={child.id} item={child} />
                                        ))}
                                    </ActionMenu.Group>
                                </HStack>
                            ) : (
                                <MenuItem key={item.id || item.url} item={item} />
                            )
                        )}
                </HGrid>
            </ActionMenu.Content>
        </ActionMenu>
    );
};

const MenuItem = ({ item }: { item: IMenuItem }) => {
    const navigate = useNavigate();
    return <ActionMenu.Item onSelect={() => navigate(item.url)}>{item.text}</ActionMenu.Item>;
};
