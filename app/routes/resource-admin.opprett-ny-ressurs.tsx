import {Link} from "@remix-run/react";
import {LinksFunction} from "@remix-run/node";
import React, {useState} from "react";
import {Button, ExpansionCard, FormSummary, HStack, VStack} from "@navikt/ds-react";
import ResourceData from "~/components/resource-admin/opprett-ny-ressurs/ResourceData";
import {INewResource} from "~/components/resource-admin/types";
import resourceAdmin from "../components/resource-admin/resourceAdmin.css?url"


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

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: resourceAdmin },
];

export default function OpprettNyRessurs () {
    const [newResource, setNewResource] = useState<INewResource>({
        resourceName: "",
        resourceDescription: "",
        validFrom: new Date(),
        validTo: new Date(),
        costPerUse: 0,
        numberOfLicenses: 0,
        needsApprovalFromSupervisor: false
    })

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
                    <ResourceData newResource={newResource} setNewResource={setNewResource} />
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