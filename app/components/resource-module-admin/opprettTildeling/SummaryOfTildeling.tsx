import { IResourceModuleAssignment } from '~/data/types/resourceTypes';
import { ErrorMessage, FormSummary, List } from '@navikt/ds-react';
import { IAccessRole } from '~/data/types/userTypes';

interface SummaryOfTildelingProps {
    assignment: IResourceModuleAssignment;
    accessRoles: IAccessRole[];
}

const SummaryOfTildeling = ({ assignment, accessRoles }: SummaryOfTildelingProps) => {
    const findAccessRoleById = (id: string): string => {
        const foundRole: string | undefined = accessRoles.find(
            (role) => role.accessRoleId === id
        )?.name;
        return foundRole ? foundRole : 'Noe har gått galt ved rollematch';
    };

    return (
        <div>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Oppsummering</FormSummary.Heading>
                </FormSummary.Header>

                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Valgt bruker</FormSummary.Label>
                        <FormSummary.Value>
                            {!assignment.user ? (
                                <ErrorMessage size="small">Ingen bruker valgt</ErrorMessage>
                            ) : (
                                assignment.user?.firstName + ' ' + assignment.user?.lastName
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>

                    <FormSummary.Answer>
                        <FormSummary.Label>Valgt aksessrolle</FormSummary.Label>
                        <FormSummary.Value>
                            {!assignment.accessRoleId ? (
                                <ErrorMessage size="small">Ingen aksessrolle valgt</ErrorMessage>
                            ) : (
                                findAccessRoleById(assignment.accessRoleId)
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>

                    {assignment.orgUnits.length > 0 ? (
                        assignment.includeSubOrgUnits ? (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    Inkluderte org.enheter - da MED tilhørende underenheter
                                </FormSummary.Label>
                                <FormSummary.Value>
                                    <List className={'list-two-columns'}>
                                        {assignment.orgUnits.map((orgunit) => (
                                            <li key={orgunit.id}>{orgunit.name}</li>
                                        ))}
                                    </List>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        ) : (
                            <FormSummary.Answer>
                                <FormSummary.Label>Valgte org.enheter</FormSummary.Label>
                                <FormSummary.Value>
                                    <List className={'list-two-columns'}>
                                        {assignment.orgUnits.map((orgunit) => (
                                            <li key={orgunit.id}>{orgunit.name}</li>
                                        ))}
                                    </List>
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        )
                    ) : (
                        <FormSummary.Answer>
                            <FormSummary.Label>Valgte org.enheter</FormSummary.Label>
                            <FormSummary.Value>
                                <ErrorMessage size="small">Ingen org.enheter valgt</ErrorMessage>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>
        </div>
    );
};

export default SummaryOfTildeling;
