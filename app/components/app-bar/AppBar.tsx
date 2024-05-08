import React, {useRef, useState} from "react";
import {
    ClipboardCheckmarkIcon,
    MenuHamburgerIcon,
    PersonGroupIcon,
    PersonIcon,
    SandboxIcon,
    TasklistIcon,
    XMarkIcon
} from '@navikt/aksel-icons';
import {Link} from "@remix-run/react";
import MeInfo from "~/components/app-bar/MeInfo";
import {IMeInfo} from "~/data/types";
import {BodyShort, Box, Button, HGrid, Hide, HStack, LinkPanel, Popover} from "@navikt/ds-react";

export function AppBar(props: { me: IMeInfo, basePath?: string }) {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <>
            <section className="grid h-20">
                <HStack as="nav" justify="space-between" align="center">
                    <HStack align="center">
                        {/*<img src={logo} alt={"Logo"} style={{height: '6em', width: '6em'}}/>*/}
                        <BodyShort className={"kontroll"} weight="semibold" size={"large"}>
                            Kontroll
                        </BodyShort>
                    </HStack>
                    <div className="grid h-full">
                        <HStack align="center">
                            {props.me ?
                                <Button
                                    ref={buttonRef}
                                    icon={menuOpen ? <XMarkIcon aria-hidden/> : <MenuHamburgerIcon aria-hidden/>}
                                    variant="tertiary-neutral"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    id="dropdown-button"
                                >
                                    Meny
                                </Button>
                                :
                                <BodyShort>Noe er galt!</BodyShort>
                            }
                            <Hide below="md" asChild>
                                <MeInfo me={props.me}/>
                            </Hide>
                        </HStack>
                    </div>
                </HStack>
            </section>

            <Popover
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                anchorEl={buttonRef.current}
                offset={0}
                arrow={false}
                placement="bottom"
            >
                <Popover.Content>
                    <Link to="/#" onClick={() => setMenuOpen(false)}>Til forsiden</Link>
                    <HGrid gap="4" columns={2}>


                        <Box>
                            <LinkPanel border={false} href={`${props.basePath}/users`}>
                                <LinkPanel.Title><PersonIcon title="a11y-title"
                                                             fontSize="1.5rem"/> Brukere</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href={`${props.basePath}/roles`}>
                                <LinkPanel.Title><PersonGroupIcon title="a11y-title"
                                                                  fontSize="1.5rem"/> Grupper</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href={`${props.basePath}/resources`}>
                                <LinkPanel.Title><SandboxIcon title="a11y-title"
                                                              fontSize="1.5rem"/> Ressurser</LinkPanel.Title>
                            </LinkPanel>
                        </Box>
                        <Box>
                            <LinkPanel border={false} href={`${props.basePath}/resource-module-admin`}>
                                <LinkPanel.Title>
                                    <ClipboardCheckmarkIcon title="a11y-title" fontSize="1.5rem"/>
                                    Ressursmoduladministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                            <LinkPanel border={false} href={`${props.basePath}/resource-admin`}>
                                <LinkPanel.Title>
                                    <TasklistIcon title="a11y-title" fontSize="1.5rem"/>
                                    Ressursadministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                            <LinkPanel border={false} href={`${props.basePath}/kontroll-admin/define-role`}>
                                <LinkPanel.Title>
                                    <TasklistIcon title="a11y-title" fontSize="1.5rem"/>
                                    Kontrolladministrasjon
                                </LinkPanel.Title>
                            </LinkPanel>
                        </Box>

                    </HGrid>
                </Popover.Content>
            </Popover>
        </>


    );
}

