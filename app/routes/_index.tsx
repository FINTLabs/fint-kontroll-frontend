import illustration from "/illustrasjon.svg"
import { Heading, HStack, VStack} from "@navikt/ds-react";
import {LinkCard, LinkCardGrid} from "~/components/common/LinkCard";
import {RESOURCES, ROLES, USERS} from "~/data/constants";
import {
    PersonGroupIcon,
    PersonIcon,
    TableIcon, PersonGroupFillIcon, PersonSuitFillIcon
} from '@navikt/aksel-icons';
import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";

export async function loader({params, request}: LoaderFunctionArgs) {
    return json({
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function Index() {
    const data = useLoaderData<typeof loader>();
    const basePath = data.basePath;

    return (
        <section className={"full-width"}>
            <HStack align={"center"} justify={"center"} gap={"8"} marginBlock={"0 12"}>
                <img src={illustration} alt={"illustrasjon"} style={{height: '6em', width: '6em'}}/>
                <Heading level="1" size="medium">Velkommen til FINT-Kontroll!</Heading>
            </HStack>

            <VStack gap="12">
                <LinkCardGrid color={'var( --beige-40)'} title={"Hva vil du gjøre?"}>
                    <LinkCard
                        title={"Rediger tildeling til en bruker"}
                        description={"Se en oversikt over alle brukere i systemet og gjør tildelinger på brukernivå."}
                        link={`${basePath}${USERS}`}
                        Icon={<PersonIcon/>}
                        colorProfile={"blue"}
                    />


                    <LinkCard
                        title={"Rediger grupper og gruppetildelinger"}
                        description={"Se en oversikt over alle grupper, og deres medlemmer og ressurser. Her kan du gi tilgang til en ressurs på gruppenivå."}
                        link={`${basePath}${ROLES}`}
                        Icon={<PersonGroupIcon/>}
                        colorProfile={"blue"}

                    />

                    <LinkCard
                        title={"Gi eller endre tilgang til en ressurs"}
                        description={"Se en oversikt over alle ressurser i systemet og redigere hvilkne brukere og grupper som har tilgang til dem."}
                        Icon={<TableIcon/>}
                        link={`${basePath}${RESOURCES}`}
                        colorProfile={"blue"}

                    />
                </LinkCardGrid>


                <LinkCardGrid color={'var( --orange-20)'} title={"Administrer brukere"}>
                    <LinkCard
                        title={"Studenter"}
                        link={`${basePath}${USERS}?userType=STUDENT`}
                        Icon={<PersonGroupFillIcon/>}
                        colorProfile={"red"}
                    />

                    <LinkCard
                        title={"Ansatte"}
                        link={`${basePath}${USERS}?userType=EMPLOYEESTAFF`}
                        Icon={<PersonSuitFillIcon/>}
                        colorProfile={"red"}
                    />

                </LinkCardGrid>
            </VStack>
        </section>
    )
}