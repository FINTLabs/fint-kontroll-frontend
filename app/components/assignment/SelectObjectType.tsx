import {BodyShort, HStack} from "@navikt/ds-react";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import React from "react";
import {NavLink, useParams} from "@remix-run/react";

export const SelectObjectType = () => {

    const params = useParams();

    return (
        <div>
            <BodyShort weight="semibold" size="medium">Hvem ønsker du å gjøre tildelinger for?</BodyShort>
            <HStack gap="12" className={"SelectObjectType"}>
                <NavLink to={`/assignment/resource/${params.id}/user`}
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
                <NavLink to={`/assignment/resource/${params.id}/role`}
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
                {/*<Link underline={false}
                      variant="neutral"
                      value={"user-assignments"}
                      className={"objectTypeLink"}
                      href={`/assignment/resource/${params.id}/user`}>
                    <PersonIcon title="a11y-title" fontSize="1.5rem"/>
                    Brukere
                </Link>
                <Link underline={false}
                      variant="neutral"
                      value={"role-assignments"}
                      className={"objectTypeLink"}
                      href={`/assignment/resource/${params.id}/role`}>
                    <PersonGroupIcon title="a11y-title" fontSize="1.5rem"/>
                    Grupper
                </Link>*/}
            </HStack>
        </div>
    );
};