import {MenuHamburgerIcon,} from "@navikt/aksel-icons";
import {ActionMenu, BodyShort, Button, HGrid} from "@navikt/ds-react";
import {useNavigate} from "@remix-run/react";
import {IMeInfo} from "~/data/types";
import {RESOURCES, ROLES, SYSTEM_ADMIN_DEFINE_ROLE, SYSTEM_ADMIN_FEATURE_TO_ROLE, USERS} from "~/data/paths";

export const Menu = (props: { me: IMeInfo, basePath?: string, source?: string }) => {
    const navigate = useNavigate();
    return (

        <ActionMenu>
            <ActionMenu.Trigger>
                {props.me ?
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
                    <ActionMenu.Item onSelect={() => navigate(`/#`)}
                                     style={{color: "#5149CA"}}
                    >
                        Til forsiden
                    </ActionMenu.Item>

                    <ActionMenu.Group label="For systemadministrator" style={{fontSize: "100px"}}>
                        <ActionMenu.Item id="define-role" onSelect={() => navigate(SYSTEM_ADMIN_DEFINE_ROLE)}>
                            Definer rolle
                        </ActionMenu.Item>
                        <ActionMenu.Item id="features-to-role"
                                         onSelect={() => navigate(SYSTEM_ADMIN_FEATURE_TO_ROLE)}>
                            Knytt rettigheter til rolle
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                    <ActionMenu.Divider/>

                    <ActionMenu.Group label="For ressursadministrator">
                        <ActionMenu.Item id="resource-module-admin" onSelect={() => navigate(`resource-module-admin`)}>
                            Administrer brukere med rolle
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => navigate(`resource-module-admin/opprett-ny-tildeling`)}>Tildel
                            rolle til bruker</ActionMenu.Item>
                        {props.source === "gui" &&
                            <ActionMenu.Item onSelect={() => navigate(`innstillinger`)}>
                                Innstillinger
                            </ActionMenu.Item>
                        }
                    </ActionMenu.Group>
                    <ActionMenu.Divider/>

                    <ActionMenu.Group label="For tjenesteadministrator">
                        <ActionMenu.Item onSelect={() => navigate(`resource-admin`)}>Ressurser</ActionMenu.Item>
                        {props.source === "gui" &&
                            <ActionMenu.Item onSelect={() => navigate(`resource-admin/opprett-ny-applikasjonsressurs`)}>
                                Opprett ny ressurs</ActionMenu.Item>
                        }
                    </ActionMenu.Group>
                    <ActionMenu.Divider/>

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
                </HGrid>
            </ActionMenu.Content>
        </ActionMenu>

    );
};