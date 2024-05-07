import {BodyShort, HStack} from "@navikt/ds-react";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import React from "react";
import {NavLink, useParams} from "@remix-run/react";

export const SelectObjectType = () => {

    const params = useParams();

    return (
        <div>
            <BodyShort weight="semibold" size="medium">Hvem ønsker du å se tildelinger for?</BodyShort>
            <HStack gap="12" className={"SelectObjectType"}>
                {/* TODO: Refactor when this is to be used. NavLink inline-styling etc causes console warning */}
                <NavLink to={`/resources/${params.id}/user-assignments`}
                         style={({isActive, isPending}) => {
                             return {
                                 fontWeight: isActive ? "bold" : "",
                                 color: isPending ? "blue" : "black",
                             };
                         }}
                >
                    <div className={"objectTypeLink"}>
                        <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                        Brukere
                    </div>
                </NavLink>

                {/* TODO: Refactor when this is to be used. NavLink inline-styling etc causes console warning */}
                <NavLink to={`/resources/${params.id}/role-assignments`}
                         className={"objectTypeLink"}
                         style={({isActive, isPending}) => {
                             return {
                                 fontWeight: isActive ? "bold" : "",
                                 color: isPending ? "blue" : "black",
                             };
                         }}>
                    <div className={"objectTypeLink"}>
                        <PersonGroupIcon title="a11y-title" fontSize="1.5rem"/>
                        Grupper
                    </div>
                </NavLink>
            </HStack>


            {/*   <HStack gap="12" className={"SelectObjectType"}>

                 <Link underline={false} variant="neutral"
                          className={"objectTypeLink"}
                          href={`/resources/${params.id}/all-assignments`}>
                        <BubbleChartIcon title="a11y-title" fontSize="1.5rem"/>
                        Alle
                    </Link>

                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/resources/${params.id}/user-assignments`}
                >
                    <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                    Brukere
                </Link>
                <Link underline={false} variant="neutral"
                      className={"objectTypeLink"}
                      href={`/resources/${params.id}/role-assignments`}>
                    <PersonGroupIcon title="a11y-title" fontSize="1.5rem"/>
                    Grupper
                </Link>
            </HStack>*/}
        </div>
    );
};