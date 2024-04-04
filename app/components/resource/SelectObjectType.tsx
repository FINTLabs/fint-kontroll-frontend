import {BodyShort, HStack, Link} from "@navikt/ds-react";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import React from "react";
import {useParams} from "@remix-run/react";


export const SelectObjectType = () => {

    const params = useParams();

    return (
        <div>
            <BodyShort weight="semibold" size="medium">Hvem ønsker du å se tildelinger for?</BodyShort>
            <HStack gap="12" className={"SelectObjectType"}>

                {/* <Link underline={false} variant="neutral"
                          className={"objectTypeLink"}
                          href={`/resources/${params.id}/all-assignments`}>
                        <BubbleChartIcon title="a11y-title" fontSize="1.5rem"/>
                        Alle
                    </Link>*/}
                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/resources/${params.id}/user-assignments`}>
                    <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                    Brukere
                </Link>
                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/resources/${params.id}/role-assignments`}>
                    <PersonGroupIcon title="a11y-title" fontSize="1.5rem"/>
                    Grupper
                </Link>
            </HStack>
        </div>
    );
};