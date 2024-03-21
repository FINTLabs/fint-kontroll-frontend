import {IResourceModuleAssignment} from "~/data/resourceModuleAdmin/types";
import {Alert, Heading} from "@navikt/ds-react";

interface SummaryOfTildelingProps {
    assignment: IResourceModuleAssignment
}

const SummaryOfTildeling = ({assignment}: SummaryOfTildelingProps) => {
    return (
        <div>
            <Heading size={"medium"}>Oppsummering</Heading>
            {assignment.user?.firstName && <p>Valgt bruker: {assignment.user?.firstName + " " + assignment.user?.lastName} </p>}
            {assignment.accessRoleId && <p>Valgt aksessrolle: {assignment.accessRoleId}</p>}

            {assignment.includeSubOrgUnits ?
                <p>Orgenheter  med underenheter</p>
            :
                <p>Orgenheter uten underenheter</p>
            }

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
        </div>
    )
}

export default SummaryOfTildeling