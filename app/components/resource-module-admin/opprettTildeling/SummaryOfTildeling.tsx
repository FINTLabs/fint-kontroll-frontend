import {IResourceModuleAccessRole, IResourceModuleAssignment} from "~/data/resourceModuleAdmin/types";
import {Alert, Box, Heading, List} from "@navikt/ds-react";

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
            <Box
                padding={"4"}
                borderWidth={"2"}
                borderRadius={"large"}
                className={"tildeling-summary"}
            >
                <Heading size={"medium"}>Oppsummering</Heading>
                {assignment.user?.firstName && <p>Valgt bruker: <b>{assignment.user?.firstName + " " + assignment.user?.lastName}</b> </p>}
                {assignment.accessRoleId && <p>Valgt aksessrolle: <b>{findAccessRoleById(assignment.accessRoleId)}</b></p>}

                {assignment.orgUnits.length > 0 &&
                    (assignment.includeSubOrgUnits ?
                        <div className={"summary-org-units-wrapper"}>
                            <span>Inkluderte orgenheter - da MED tilhørende underenheter:</span>
                            <List className={"list-two-columns"}>
                                {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                            </List>
                        </div>
                    :
                        <div className={"summary-org-units-wrapper"}>
                            <span>Valgte orgenheter:</span>
                            <List className={"list-two-columns"}>
                                {assignment.orgUnits.map(orgunit => <li key={orgunit.id}>{orgunit.name}</li>)}
                            </List>
                        </div>
                    )
                }
            </Box>

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