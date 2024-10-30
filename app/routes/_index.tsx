import illustration from "/illustrasjon.svg"
import {Bleed, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {CustomLinkPanel} from "~/components/common/LinkPanel/CustomLinkPanel";
import {CustomLink} from "~/components/common/LinkPanel/CustomLink";
import {
    RESOURCES,
    ROLES,
    SETTINGS_APPLICATION_CATEGORY,
    SETTINGS_LICENSE_ENFORCEMENT,
    SETTINGS_LICENSE_MODEL,
    SETTINGS_USER_TYPES, USERS
} from "~/data/constants";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchRoleById} from "~/data/fetch-roles";
import {IRole} from "~/data/types";
import {json} from "@remix-run/node";
import {BASE_PATH} from "../../environment";
import {useLoaderData} from "@remix-run/react";
import {
    PersonGroupIcon,
    ToiletIcon,
    PersonCheckmarkIcon,
    PersonSuitIcon,
    PersonIcon,
    TableIcon
} from '@navikt/aksel-icons';

export async function loader({params, request}: LoaderFunctionArgs) {
    return json({
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    })
}

export default function Index() {
    const {basePath} = useLoaderData<typeof loader>();

    return (
        <section className={"full-width"}>
            {/*
            <main className={"WelcomeSection"}>
                <Heading level="1" size="medium">Velkommen til FINT-Kontroll!</Heading>
                <img src={illustration} alt={"illustrasjon"} style={{height: '6em', width: '6em'}}/>
            </main>
*/}
            <VStack gap="12">

                <Bleed marginInline="full" asChild>
                    <Box padding="4" className="p" background={"surface-alt-3-subtle"}>
                        <section className={"content"}>
                            <VStack gap="4">
                                <Heading level="2" size="medium">Hva vil du gjøre?</Heading>

                                <CustomLinkPanel>
                                    <CustomLink
                                        title={"Oversikt over alle brukere"}
                                        link={`${basePath}${USERS}`}
                                        Image={<PersonIcon title="a11y tittel" fontSize="2.5rem"/>}
                                    />


                                    <CustomLink
                                        title={"Se grupper og roller"}
                                        link={`${basePath}${ROLES}`}
                                        Image={<PersonGroupIcon title="a11y tittel" fontSize="2.5rem"/>}
                                    />

                                    <CustomLink
                                        title={"Få en oversikt over alle ressurser"}
                                        Image={<TableIcon title="a11y tittel" fontSize="2.5rem"/>}
                                        link={`${basePath}${RESOURCES}`}
                                    />


                                </CustomLinkPanel>
                            </VStack>
                        </section>
                    </Box>
                </Bleed>

                <Bleed marginInline="full" asChild>
                    <Box padding="4" className="p" background="surface-alt-1-moderate">
                        <section className={"content"}>
                            <VStack gap="4">
                                <Heading level="2" size="medium">Se lister over brukere</Heading>

                                <CustomLinkPanel>
                                    <CustomLink
                                        title={"Studenter"}
                                        link={`${basePath}${USERS}?userType=STUDENT`}
                                        Image={<PersonGroupIcon title="a11y tittel" fontSize="2.5rem"/>}
                                        backgroundColor={"surface-alt-1-subtle"}
                                    />

                                    <CustomLink
                                        title={"Ansatte"}
                                        link={`${basePath}${USERS}?userType=EMPLOYEESTAFF`}
                                        Image={<PersonSuitIcon title="a11y tittel" fontSize="2.5rem"/>}
                                        backgroundColor={"surface-alt-1-subtle"}
                                    />

                                </CustomLinkPanel>
                            </VStack>
                        </section>
                    </Box>
                </Bleed>
            </VStack>
        </section>
    )
}