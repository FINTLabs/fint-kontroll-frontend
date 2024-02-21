import React, {useRef, useState} from "react";
import {BodyShort, Box, Button, HGrid, Hide, HStack, LinkPanel, Popover} from "@navikt/ds-react";
import {
    ClipboardCheckmarkIcon,
    MenuHamburgerIcon,
    PersonGroupIcon, PersonIcon, SandboxIcon, TasklistIcon,
    XMarkIcon
} from '@navikt/aksel-icons';
import {Link} from "@remix-run/react";
import MeInfo from "~/components/app-bar/MeInfo";
import type {IMeInfo} from "~/data/types";
import logo from "../../../public/fint-by-novari (1).svg"

export function AppBar (props: {me: IMeInfo}) {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <>
            <section className="grid h-20">
                <HStack as="nav" justify="space-between" align="center">
                    <HStack align="center">
                    {/*<img src={logo} alt={"Logo"} style={{height: '6em', width: '6em'}}/>*/}
                    <BodyShort weight="semibold" truncate size="large" style={{color: '#0067C5'}}>
                        Kontroll
                    </BodyShort>
                    </HStack>
                    <div className="grid h-full">
                        <HStack align="center">
                            <Button
                                ref={buttonRef}
                                icon={menuOpen ? <XMarkIcon aria-hidden /> : <MenuHamburgerIcon aria-hidden />}
                                variant="tertiary"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                Meny
                            </Button>
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
                    <Link to="/#" onClick={() => setMenuOpen(false)} >Til forsiden</Link>
                    <HGrid gap="4" columns={2}>

                        <Box>
                            <LinkPanel border={false} href="/users">
                                <LinkPanel.Title><PersonIcon title="a11y-title" fontSize="1.5rem" /> Brukere</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href="/roles">
                                <LinkPanel.Title><PersonGroupIcon title="a11y-title" fontSize="1.5rem" /> Grupper</LinkPanel.Title>
                            </LinkPanel>

                            <LinkPanel border={false} href="/resources">
                                <LinkPanel.Title><SandboxIcon title="a11y-title" fontSize="1.5rem" /> Ressurser</LinkPanel.Title>
                            </LinkPanel>
                        </Box>
                        <Box>
                            <LinkPanel border={false} href="/access">
                                <LinkPanel.Title>
                                    <ClipboardCheckmarkIcon title="a11y-title" fontSize="1.5rem" />
                                    Ressursstyringsadministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                            <LinkPanel border={false} href="/tools">
                                <LinkPanel.Title>
                                    <TasklistIcon title="a11y-title" fontSize="1.5rem" />
                                    Applikasjonsadministrator
                                </LinkPanel.Title>
                            </LinkPanel>
                        </Box>

                    </HGrid>
                </Popover.Content>
            </Popover>
        </>


    );
}

