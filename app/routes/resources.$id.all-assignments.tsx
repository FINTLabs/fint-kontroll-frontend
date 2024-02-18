import React from "react";
import {SelectObjectType} from "~/components/resource/SelectObjectType";
import {Box, Heading} from "@navikt/ds-react";

export default function AllAssignments() {

    return (
        <>
            <Box paddingBlock="16 16">
                <Heading level="2" size="xlarge" align={"center"}>Tildelinger</Heading>
            </Box>
            <section className={"filters"}>
                <SelectObjectType/>
            </section>
            <main className={"WelcomeSection"}>
                <h1>
                    Her kommer tabell alle
                </h1>
            </main>
        </>
    )
}