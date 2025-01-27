import {MenuHamburgerIcon,} from "@navikt/aksel-icons";
import {ActionMenu, BodyShort, Button, HGrid} from "@navikt/ds-react";
import {useNavigate} from "@remix-run/react";
import {IMeInfo} from "~/data/types";
import {
    RESOURCE_ADMIN,
    RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT,
    RESOURCES,
    ROLES,
    SERVICE_ADMIN,
    SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE,
    SETTINGS,
    SYSTEM_ADMIN_DEFINE_ROLE,
    SYSTEM_ADMIN_FEATURE_TO_ROLE,
    USERS
} from "~/data/paths";

export const Menu = ({me, source}: { me: IMeInfo, basePath?: string, source?: string }) => {
    const navigate = useNavigate();
    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                {me ?
                    <Button
                        className={"menu-button"}
                        variant="tertiary-neutral"
                        icon={<MenuHamburgerIcon aria-hidden/>}
                        iconPosition="left"
                        id="dropdown-button"
                    >
                        Meny
                    </Button>
                    :
                    <BodyShort>Noe er galt!</BodyShort>
                }
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <HGrid gap="6" columns={1} padding={"6"}>
                    <ActionMenu.Item
                        onSelect={() => navigate(`/#`)}
                        style={{color: "#5149CA"}}
                    >
                        Til forsiden
                    </ActionMenu.Item>

                    {me?.roles.some(role => role.id === "sa") && (
                        <>
                            <ActionMenu.Group label="For systemadministrator" style={{fontSize: "100px"}}>
                                <ActionMenu.Item
                                    id="define-role"
                                    onSelect={() => navigate(SYSTEM_ADMIN_DEFINE_ROLE)}
                                >
                                    Definer rolle
                                </ActionMenu.Item>
                                <ActionMenu.Item
                                    id="features-to-role"
                                    onSelect={() => navigate(SYSTEM_ADMIN_FEATURE_TO_ROLE)}
                                >
                                    Knytt rettigheter til rolle
                                </ActionMenu.Item>
                            </ActionMenu.Group>
                            <ActionMenu.Divider/>
                        </>
                    )}

                    {me?.roles.some(role => ["sa", "ra"].includes(role.id)) && (
                        <>
                            <ActionMenu.Group label="For ressursadministrator">
                                <ActionMenu.Item
                                    id="resource-module-admin"
                                    onSelect={() => navigate(RESOURCE_ADMIN)}
                                >
                                    Administrer brukere med rolle
                                </ActionMenu.Item>
                                <ActionMenu.Item
                                    onSelect={() => navigate(RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT)}
                                >
                                    Tildel rolle til bruker
                                </ActionMenu.Item>
                                {source === "gui" &&
                                    <ActionMenu.Item onSelect={() => navigate(SETTINGS)}>
                                        Innstillinger
                                    </ActionMenu.Item>
                                }
                            </ActionMenu.Group>
                            <ActionMenu.Divider/>
                        </>
                    )}

                    {me?.roles.some(role => ["sa", "ra", "ta"].includes(role.id)) && (
                        <>
                            <ActionMenu.Group label="For tjenesteadministrator">
                                <ActionMenu.Item
                                    onSelect={() => navigate(SERVICE_ADMIN)}>Ressurser</ActionMenu.Item>
                                {source === "gui" &&
                                    <ActionMenu.Item
                                        onSelect={() => navigate(SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE)}
                                    >
                                        Opprett ny ressurs
                                    </ActionMenu.Item>
                                }
                            </ActionMenu.Group>
                            <ActionMenu.Divider/>
                        </>
                    )}
                    {me?.roles.some(role => ["sa", "ra", "ta", "td"].includes(role.id)) && (
                        <>
                            <ActionMenu.Group label="For tildeler">
                                <ActionMenu.Item id="users" onSelect={() => navigate(USERS)}>
                                    Brukere
                                </ActionMenu.Item>
                                <ActionMenu.Item onSelect={() => navigate(ROLES)}>
                                    Grupper
                                </ActionMenu.Item>
                                <ActionMenu.Item onSelect={() => navigate(RESOURCES)}>
                                    Ressurser
                                </ActionMenu.Item>
                            </ActionMenu.Group>
                        </>
                    )}
                </HGrid>
            </ActionMenu.Content>
        </ActionMenu>
    );
};