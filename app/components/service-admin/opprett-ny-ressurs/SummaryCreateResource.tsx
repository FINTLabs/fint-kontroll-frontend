import { ErrorMessage, FormSummary, HStack, Tag } from '@navikt/ds-react';
import { IApplicationResource } from '~/components/service-admin/types';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface SummaryCreateResourceProps {
    resource: IApplicationResource;
    resourceOwner: IUnitItem | null;
}

const SummaryCreateResource = ({ resource }: SummaryCreateResourceProps) => {
    const cleanedRoles = Array.isArray(resource.validForRoles)
        ? resource.validForRoles.filter((r) => r.trim() !== '')
        : [];

    const cleanedApplicationCategory = Array.isArray(resource.applicationCategory)
        ? resource.applicationCategory.filter((r) => r.trim() !== '')
        : [];

    return (
        <div>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Oppsummering</FormSummary.Heading>
                </FormSummary.Header>

                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>Navn på ressurs (Påkrevd)</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.resourceName ? (
                                <ErrorMessage size="small">Mangler navn på ressurs</ErrorMessage>
                            ) : (
                                resource.resourceName
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            Brukertyper ressursen skal være gyldig for (Påkrevd)
                        </FormSummary.Label>

                        <FormSummary.Value>
                            {cleanedRoles.length > 0 ? (
                                cleanedRoles.join(', ')
                            ) : (
                                <ErrorMessage size="small">Ingen rolle valgt</ErrorMessage>
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Applikasjonskategori (Valgfritt)</FormSummary.Label>
                        <FormSummary.Value>
                            {cleanedApplicationCategory.length > 0 ? (
                                cleanedApplicationCategory.join(', ')
                            ) : (
                                <ErrorMessage size="small">
                                    Ingen applikasjonskategori valgt
                                </ErrorMessage>
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Har ressursen en kostnad?</FormSummary.Label>
                        <FormSummary.Value>{!resource.hasCost ? 'Nei' : 'Ja'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {resource.hasCost ? (
                        <FormSummary.Answer>
                            <FormSummary.Label>Enhetskostnad (Valgfritt)</FormSummary.Label>
                            <FormSummary.Value>
                                {!resource.unitCost ? (
                                    <ErrorMessage size="small">Mangler kostnad</ErrorMessage>
                                ) : (
                                    resource.unitCost
                                )}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    ) : null}
                    <FormSummary.Answer>
                        <FormSummary.Label>Håndhevingsregel (Påkrevd)</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.licenseEnforcement ? (
                                <ErrorMessage size="small">
                                    Håndhevingsregel ikke valgt
                                </ErrorMessage>
                            ) : (
                                resource.licenseEnforcement
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Ressursgrense (Valgfritt)</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.resourceLimit ? (
                                <ErrorMessage size="small">Mangler ressursgrense</ErrorMessage>
                            ) : (
                                resource.resourceLimit
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Status (Påkrevd)</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.status ? (
                                <ErrorMessage size="small">Status ikke valgt</ErrorMessage>
                            ) : (
                                resource.status
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>
                                Organisasjonsenhet som er eier av ressursen (Påkrevd)
                            </FormSummary.Label>
                        </HStack>
                        <FormSummary.Value>
                            {!resource.resourceOwnerOrgUnitId ? (
                                <ErrorMessage size="small">
                                    Organisasjonsenhet som er eier av ressursen ikke satt
                                </ErrorMessage>
                            ) : (
                                resource.resourceOwnerOrgUnitName
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </FormSummary.Answers>
            </FormSummary>
        </div>
    );
};

export default SummaryCreateResource;
