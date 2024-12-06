import {IResourceModuleAccessRole, IResourceModuleAssignment} from "~/data/resourceModuleAdmin/types";
import {Alert, FormSummary, List} from "@navikt/ds-react";

interface SummaryOfTildelingProps {
    assignment: IResourceModuleAssignment
    missingFields: boolean
    accessRoles: IResourceModuleAccessRole[]
}

const SummaryOfTildeling = ({assignment, missingFields, accessRoles}: SummaryOfTildelingProps) => {
    const findAccessRoleById = (id: string): string => {
        const foundRole: string| undefined = accessRoles.find(role => role.accessRoleId === id)?.name
        return foundRole ? foundRole : "Noe har gått galt ved rollematch"
    }

    return (
        <div>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Oppsummering</FormSummary.Heading>
                </FormSummary.Header>

                <FormSummary.Answers>
                    {assignment.user?.firstName &&
                        <FormSummary.Answer>
                            <FormSummary.Label>Valgt bruker</FormSummary.Label>
                            <FormSummary.Value>{assignment.user?.firstName + " " + assignment.user?.lastName}</FormSummary.Value>
                        </FormSummary.Answer>
                    }
                    {assignment.accessRoleId &&
                        <FormSummary.Answer>
                            <FormSummary.Label>Valgt aksessrolle</FormSummary.Label>
                            <FormSummary.Value>{findAccessRoleById(assignment.accessRoleId)}</FormSummary.Value>
                        </FormSummary.Answer>
                    }

                    {assignment.orgUnits.length > 0 &&
                        (assignment.includeSubOrgUnits ?
                            <FormSummary.Answer>
                                <FormSummary.Label>Inkluderte org.enheter - da MED tilhørende underenheter</FormSummary.Label>
                                <FormSummary.Value>
                                    <List className={"list-two-columns"}>
                                        {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                                    </List>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        :
                            <FormSummary.Answer>
                                <FormSummary.Label>Valgte org.enheter</FormSummary.Label>
                                <FormSummary.Value>
                                    <List className={"list-two-columns"}>
                                        {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                                    </List>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )
                    }
                </FormSummary.Answers>
            </FormSummary>

            {missingFields &&
                <Alert variant={"error"} >
                    <ul>
                        {!assignment.user &&
                            <li>
                                Må ha valgt en bruker
                            </li>
                        }
                        {!assignment.accessRoleId &&
                            <li>
                                Må ha valgt en aksessrolle
                            </li>
                        }
                        {assignment.orgUnits.length === 0 &&
                            <li>
                                Må ha valgt orgenheter
                            </li>
                        }
                    </ul>
                </Alert>
            }
        </div>
    )
}

export default SummaryOfTildeling