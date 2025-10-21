import { Detail, ErrorMessage, FormSummary, HStack, Tag } from '@navikt/ds-react';
import { IApplicationResource } from '~/components/service-admin/types';
import { IUnitItem } from '~/data/types/orgUnitTypes';

interface SummaryCreateResourceProps {
    resource: IApplicationResource;
    resourceOwner: IUnitItem | null;
}

const SummaryCreateResource2 = ({ resource }: SummaryCreateResourceProps) => {
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
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Navn på ressurs</FormSummary.Label>
                            {!resource.resourceName && (
                                <Tag variant={'error'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            )}
                        </HStack>
                        <FormSummary.Value>
                            {!resource.resourceName ? (
                                <ErrorMessage size="small">Mangler navn på ressurs</ErrorMessage>
                            ) : (
                                resource.resourceName
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>
                                Brukertyper ressursen skal være gyldig for
                            </FormSummary.Label>
                            {cleanedRoles.length == 0 && (
                                <Tag variant={'error'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            )}
                        </HStack>

                        <FormSummary.Value>
                            {cleanedRoles.length > 0 ? (
                                cleanedRoles.join(', ')
                            ) : (
                                <ErrorMessage size="small">Ingen rolle valgt</ErrorMessage>
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Applikasjonskategori</FormSummary.Label>
                        <FormSummary.Value>
                            {cleanedApplicationCategory.length > 0 ? (
                                cleanedApplicationCategory.join(', ')
                            ) : (
                                <Detail>Ingen applikasjonskategori valgt</Detail>
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Har ressursen en kostnad?</FormSummary.Label>
                        <FormSummary.Value>{!resource.hasCost ? 'Nei' : 'Ja'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {resource.hasCost ? (
                        <FormSummary.Answer>
                            <FormSummary.Label>Enhetskostnad</FormSummary.Label>
                            <FormSummary.Value>
                                {!resource.unitCost ? (
                                    <Detail>Mangler kostnad</Detail>
                                ) : (
                                    resource.unitCost
                                )}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    ) : null}
                    <FormSummary.Answer>
                        <FormSummary.Label>Håndhevingsregel</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.licenseEnforcement ? (
                                <Detail>Håndhevingsregel ikke valgt</Detail>
                            ) : (
                                resource.licenseEnforcement
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Antall lisenser</FormSummary.Label>
                        <FormSummary.Value>
                            {!resource.resourceLimit ? (
                                <Detail>Mangler antall lisenser</Detail>
                            ) : (
                                resource.resourceLimit
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Status</FormSummary.Label>
                            {!resource.status && (
                                <Tag variant={'error'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            )}
                        </HStack>
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
                                Organisasjonsenhet som er eier av ressursen
                            </FormSummary.Label>
                            {!resource.resourceOwnerOrgUnitId && (
                                <Tag variant={'error'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            )}
                        </HStack>
                        <FormSummary.Value>
                            {!resource.resourceOwnerOrgUnitId ? (
                                <ErrorMessage size="small">
                                    Organisasjonsenhet som er eier av ressursen ikke valgt
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

export default SummaryCreateResource2;
