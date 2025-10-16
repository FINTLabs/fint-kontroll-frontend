import { ErrorMessage, FormSummary, HStack, Tag } from '@navikt/ds-react';
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
                            {resource.resourceName ? (
                                <Tag variant={'success'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            ) : (
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
                            {cleanedRoles.length > 0 ? (
                                <Tag variant={'success'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            ) : (
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
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Applikasjonskategori</FormSummary.Label>
                            {cleanedApplicationCategory.length > 0 ? (
                                <Tag variant={'success'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            ) : (
                                <Tag variant={'info'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            )}
                        </HStack>
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
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Har ressursen en kostnad?</FormSummary.Label>
                            {resource.hasCost ? (
                                <Tag variant={'success'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            ) : (
                                <Tag variant={'info'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            )}
                        </HStack>
                        <FormSummary.Value>{!resource.hasCost ? 'Nei' : 'Ja'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {resource.hasCost ? (
                        <FormSummary.Answer>
                            <HStack justify={'space-between'} paddingInline="space-0 space-36">
                                <FormSummary.Label>Enhetskostnad</FormSummary.Label>
                                {resource.unitCost ? (
                                    <Tag variant={'success'} size={'small'}>
                                        Valgfritt felt
                                    </Tag>
                                ) : (
                                    <Tag variant={'info'} size={'small'}>
                                        Valgfritt felt
                                    </Tag>
                                )}
                            </HStack>
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
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Håndhevingsregel</FormSummary.Label>
                            {resource.licenseEnforcement ? (
                                <Tag variant={'success'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            ) : (
                                <Tag variant={'error'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            )}
                        </HStack>
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
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Ressursgrense</FormSummary.Label>
                            {resource.resourceLimit ? (
                                <Tag variant={'success'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            ) : (
                                <Tag variant={'info'} size={'small'}>
                                    Valgfritt felt
                                </Tag>
                            )}
                        </HStack>
                        <FormSummary.Value>
                            {!resource.resourceLimit ? (
                                <ErrorMessage size="small">Mangler ressursgrense</ErrorMessage>
                            ) : (
                                resource.resourceLimit
                            )}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <HStack justify={'space-between'} paddingInline="space-0 space-36">
                            <FormSummary.Label>Status</FormSummary.Label>
                            {resource.status ? (
                                <Tag variant={'success'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            ) : (
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
                            {resource.resourceOwnerOrgUnitId ? (
                                <Tag variant={'success'} size={'small'}>
                                    Påkrevd felt
                                </Tag>
                            ) : (
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
