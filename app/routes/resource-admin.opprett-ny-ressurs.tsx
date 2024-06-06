import {Link} from "@remix-run/react";
import React from "react";
import {Button, ExpansionCard, FormSummary, HStack, VStack} from "@navikt/ds-react";

export const handle = {
    // @ts-ignore
    breadcrumb: () => (
        <>
            <Link to={`/resource-admin`}>Ressurser</Link>
            {" > "}
            <Link to={`/resource-admin/opprett-ny-ressurs`}>Ny ressurs</Link>
        </>
    )
}

export default function OpprettNyRessurs () {
    return (
        <VStack gap="8">
            <ExpansionCard
                size="small"
                aria-label="Small-variant"
                defaultOpen={true}
                // className={newAssignment.user ? "expansion-green" : ""}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Ressursinfo</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    Seksjon 1
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard
                size="small"
                aria-label="Small-variant"
                // className={newAssignment.user ? "expansion-green" : ""}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Ressursinfo</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    Seksjon 2
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard
                size="small"
                aria-label="Small-variant"
                // className={newAssignment.user ? "expansion-green" : ""}
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Ressursinfo</ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    Seksjon 3
                </ExpansionCard.Content>
            </ExpansionCard>

            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Oppsummering</FormSummary.Heading>
                </FormSummary.Header>

                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>qweqwe</FormSummary.Label>
                        <FormSummary.Value>ASD</FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>

            <HStack gap="4">
                <Button variant="secondary">Avbryt</Button>
                <Button>Lagre ressurs</Button>
            </HStack>
        </VStack>
    )
}