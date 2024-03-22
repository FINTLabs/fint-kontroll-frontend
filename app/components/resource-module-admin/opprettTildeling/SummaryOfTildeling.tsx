import {IResourceModuleAssignment} from "~/data/resourceModuleAdmin/types";
import {Alert, Heading, List} from "@navikt/ds-react";

interface SummaryOfTildelingProps {
    assignment: IResourceModuleAssignment
    missingFields: boolean
}

const SummaryOfTildeling = ({assignment, missingFields}: SummaryOfTildelingProps) => {
    return (
        <div>
            <Heading size={"medium"}>Oppsummering</Heading>
            {assignment.user?.firstName && <p>Valgt bruker: {assignment.user?.firstName + " " + assignment.user?.lastName} </p>}
            {assignment.accessRoleId && <p>Valgt aksessrolle: {assignment.accessRoleId}</p>}

            {assignment.orgUnits.length > 0 &&
                (assignment.includeSubOrgUnits ?
                    <>
                        Inkluderte orgenheter - da MED tilhørende underenheter:
                        <List className={"list-two-columns"}>
                            {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                        </List>
                    </>
                :
                    <>Valgte orgenheter:
                        <List className={"list-two-columns"}>
                            {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                        </List>
                    </>
                )
            }

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