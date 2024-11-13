import React, {useRef, useState} from "react";
import {MenuHamburgerIcon, XMarkIcon} from '@navikt/aksel-icons';
import MeInfo from "~/components/app-bar/MeInfo";
import {IMeInfo} from "~/data/types";
import {BodyShort, Box, Button, HGrid, Hide, HStack, LinkPanel, Popover} from "@navikt/ds-react";
import {SETTINGS} from "~/data/constants";
import {Link} from "@remix-run/react";

export function AppBar(props: { me: IMeInfo, basePath?: string, source?: string }) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <>
            <section className="h-20">
                <HStack as="nav" justify="space-between" align="center">
                    <HStack align="center">
                        <Link to={"/"} className={"kontroll"}>
                            <BodyShort weight="semibold" size={"large"}>
                                Kontroll
                            </BodyShort>
                        </Link>
                    </HStack>

                    <div className="grid h-full">
                        <HStack align="center">
                            {props.me ?
                                <Button
                                    className={"menu-button"}
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
                    <Link to="/#" onClick={() => setMenuOpen(false)} className={"breadcrumb-link"}>Til forsiden</Link>
                    <HGrid gap="4" columns={2}>
                        <Box>
                            <LinkPanel border={false} href={`${props.basePath}/users`}>
                                <LinkPanel.Title>
                                    Brukere
                                </LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href={`${props.basePath}/roles`}>
                                <LinkPanel.Title>
                                    Grupper
                                </LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href={`${props.basePath}/resources`}>
                                <LinkPanel.Title>
                                    Ressurser
                                </LinkPanel.Title>
                            </LinkPanel>
                        </Box>
                        <Box>
                            <LinkPanel border={false} href={`${props.basePath}/resource-module-admin`}>
                                <LinkPanel.Title>
                                    Ressursmoduladministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                            <LinkPanel border={false} href={`${props.basePath}/resource-admin`}>
                                <LinkPanel.Title>
                                    Ressursadministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                            <LinkPanel border={false} href={`${props.basePath}/kontroll-admin/define-role`}>
                                <LinkPanel.Title>
                                    Kontrolladministrasjon
                                </LinkPanel.Title>
                            </LinkPanel>
                            {props.source === "gui" &&
                                <LinkPanel border={false} href={`${props.basePath}${SETTINGS}`}>
                                    <LinkPanel.Title>
                                        Innstillinger
                                    </LinkPanel.Title>
                                </LinkPanel>
                            }
                        </Box>
                    </HGrid>
                </Popover.Content>
            </Popover>
        </>


    );
}

