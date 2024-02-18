import {BodyShort, HStack, Link} from "@navikt/ds-react";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import React from "react";
import {useParams} from "@remix-run/react";


export const SelectObjectType = () => {

    const params = useParams();

    return (
        <div>
            <BodyShort weight="semibold" size="medium">Hvem ønsker du å gjøre tildelinger for?</BodyShort>
            <HStack gap="12" className={"SelectObjectType"}>
                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/assignment/resource/${params.id}/user`}>
                    <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                    Brukere
                </Link>
                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/assignment/resource/${params.id}/role`}>
                    <PersonGroupIcon title="a11y-title" fontSize="1.5rem"/>
                    Grupper
                </Link>
            </HStack>
        </div>
    );
};