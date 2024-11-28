import MeInfo from "~/components/app-bar/MeInfo";
import {IMeInfo} from "~/data/types";
import {BodyShort, Hide, HStack} from "@navikt/ds-react";
import {Link} from "@remix-run/react";
import {Menu} from "~/components/app-bar/Menu";

export function AppBar(props: { me: IMeInfo, basePath?: string, source?: string }) {

    return (
        <>
            <section className="h-20">
                <HStack as="nav" justify="space-between" align="center">
                    <HStack align="center">
                        <Link to={"/"} className={"kontroll"}>
                            <BodyShort weight="semibold" size={"large"}>
                                FINT-Kontroll
                            </BodyShort>
                        </Link>
                    </HStack>

                    <div className="grid h-full">
                        <HStack align="center">
                            {props.me ?
                                <Menu me={props.me} source={props.source}/>
                                :
                                null
                            }
                            {props.me ?
                                <Hide below="md" asChild>
                                    <MeInfo me={props.me}/>
                                </Hide>
                                :
                                null
                            }

                        </HStack>
                    </div>
                </HStack>
            </section>
        </>
    );
}

