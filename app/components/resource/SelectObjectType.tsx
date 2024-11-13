import {BodyShort, HStack} from "@navikt/ds-react";
import {PersonGroupIcon, PersonIcon} from "@navikt/aksel-icons";
import {NavLink, useParams} from "@remix-run/react";

export const SelectObjectType = () => {

    const params = useParams();

    return (
        <div>
            <BodyShort weight="semibold" size="medium">Hvem ønsker du å se tildelinger for?</BodyShort>
            <HStack gap="6" className={"SelectObjectType"}>
                <NavLink to={`/resources/${params.id}/user-assignments`}
                         className={"objectTypeLink"}
                         style={({isActive, isPending}) => {
                             return {
                                 fontWeight: isActive ? "bold" : "",
                                 color: isPending ? "indigo" : "black",
                             };
                         }}
                         id="brukere-link"
                >
                    <div className={"objectTypeLink"}>
                        <PersonIcon title="a11y-title" fontSize="1.2rem"/>
                        Brukere
                    </div>
                </NavLink>

                <NavLink to={`/resources/${params.id}/role-assignments`}
                         className={"objectTypeLink"}
                         style={({isActive, isPending}) => {
                             return {
                                 fontWeight: isActive ? "bold" : "",
                                 color: isPending ? "indigo" : "black",
                             };
                         }}
                         id="grupper-link"
                >
                    <div className={"objectTypeLink"}>
                        <PersonGroupIcon title="a11y-title" fontSize="1.2rem"/>
                        Grupper
                    </div>
                </NavLink>
            </HStack>
        </div>
    );
};