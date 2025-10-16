import React, { SetStateAction } from 'react';
import { IApplicationResource } from '~/components/service-admin/types';
import {
    Checkbox,
    CheckboxGroup,
    HelpText,
    HStack,
    Radio,
    RadioGroup,
    TextField,
    VStack,
} from '@navikt/ds-react';

import {
    IKodeverkApplicationCategory,
    IKodeverkLicenseEnforcement,
    IKodeverkUserType,
} from '~/data/types/kodeverkTypes';

interface ResourceDataProps {
    newApplicationResource: IApplicationResource;
    setNewApplicationResource: React.Dispatch<SetStateAction<IApplicationResource>>;
    applicationCategories: IKodeverkApplicationCategory[];
    userTypes: IKodeverkUserType[];
    licenseEnforcements: IKodeverkLicenseEnforcement[];
}

export default function ApplicationResourceData({
    newApplicationResource,
    setNewApplicationResource,
    applicationCategories,
    userTypes,
    licenseEnforcements,
}: ResourceDataProps) {
    const doesValueContainNumbersOnly = (value: string) => {
        return /^\d*$/.test(value);
    };

    return (
        <ul>
            <VStack gap={'8'} marginInline={'4'}>
                <li>
                    <TextField
                        className={'input-large'}
                        label={
                            <HStack gap={'2'}>
                                Navn på ressurs
                                <HelpText title="Hva er navn på ressurs?" placement="right">
                                    Navnet vil vises i FINT Kontroll og kan brukes i søkefelt for å
                                    finne ressursen. <br />
                                    Navnet blir brukt for å opprette gruppenavn i EntraID, der blir
                                    mellomrom erstattet med punktum. <br />
                                    Gruppenavnet vil vises under 'Se info' for ressursen i FINT
                                    Kontroll.
                                </HelpText>
                            </HStack>
                        }
                        description={'Fullt navn på ressursen'}
                        value={newApplicationResource.resourceName || ''}
                        onChange={(event) =>
                            setNewApplicationResource({
                                ...newApplicationResource,
                                resourceName: event.target.value,
                            })
                        }
                    />
                </li>

                <li>
                    <CheckboxGroup
                        legend={
                            <HStack gap={'2'}>
                                Velg brukertype ressursen skal være gyldig for
                                <HelpText title="Hva er navn på ressurs?" placement="right">
                                    Noen applikasjoner har ulike priser/vilkår for elever og
                                    ansatte. Brukertype kan brukes som filter for å sikre at det
                                    ikke skal være mulig å gi tilganger til feil brukertype, og
                                    hjelper til å følge avtalevilkår.
                                </HelpText>
                            </HStack>
                        }
                        value={newApplicationResource.validForRoles || []}
                        onChange={(value: string[]) => {
                            setNewApplicationResource((prevState) => {
                                return {
                                    ...prevState,
                                    validForRoles: value,
                                };
                            });
                        }}>
                        {userTypes?.map((userType) => {
                            return (
                                <Checkbox key={userType.id} value={userType.label}>
                                    {userType.fkLabel}
                                </Checkbox>
                            );
                        })}
                    </CheckboxGroup>
                </li>
                <li>
                    <CheckboxGroup
                        legend={
                            <HStack gap={'2'}>
                                Velg applikasjonskategori
                                <HelpText title="Hva er applikasjonskategori?" placement="right">
                                    Brukes for å kategorisere applikasjoner.
                                </HelpText>
                            </HStack>
                        }
                        description={'(Valgfritt)'}
                        value={newApplicationResource.applicationCategory || []}
                        onChange={(value: string[]) => {
                            setNewApplicationResource((prevState) => {
                                return {
                                    ...prevState,
                                    applicationCategory: value,
                                };
                            });
                        }}>
                        {applicationCategories?.map((category) => {
                            return (
                                <Checkbox key={category.id} value={category.name}>
                                    {category.name}
                                </Checkbox>
                            );
                        })}
                    </CheckboxGroup>
                </li>
                <li>
                    <RadioGroup
                        legend={
                            <HStack gap={'2'}>
                                Håndhevingsregel
                                <HelpText title="Hva er håndhevingsregel?" placement="right">
                                    Håndhevingsregel settes for å kontrollere om det kreves
                                    godkjenning ved tildeling av ressursen, og hvordan det skal
                                    håndheves dersom lisensantall blir overskredet.
                                </HelpText>
                            </HStack>
                        }
                        value={newApplicationResource.licenseEnforcement || false}
                        onChange={(value: string) =>
                            setNewApplicationResource({
                                ...newApplicationResource,
                                licenseEnforcement: value,
                            })
                        }>
                        <VStack>
                            {licenseEnforcements?.map((enforcement) => {
                                return (
                                    <Radio key={enforcement.id} value={enforcement.label}>
                                        {enforcement.fkLabel}
                                    </Radio>
                                );
                            })}
                        </VStack>
                    </RadioGroup>
                </li>
                {newApplicationResource.licenseEnforcement === 'HARDSTOP' ||
                newApplicationResource.licenseEnforcement === 'FLOATING' ? (
                    <li>
                        <TextField
                            className={'input-small'}
                            label={
                                <HStack gap={'2'}>
                                    Ressursgrense
                                    <HelpText title="Hva er ressursgrense?" placement="right">
                                        Ressursgrense er antallet som kan tildeles av ressursen.
                                    </HelpText>
                                </HStack>
                            }
                            description={'Totalt antall av ressursen (Valgfritt)'}
                            value={newApplicationResource.resourceLimit || 0}
                            onChange={(event) =>
                                setNewApplicationResource({
                                    ...newApplicationResource,
                                    resourceLimit: Number(event.target.value),
                                })
                            }
                        />
                    </li>
                ) : null}

                <li>
                    <RadioGroup
                        legend={
                            <HStack gap={'2'}>
                                Har ressursen en kostnad?
                                <HelpText title="Hva er kostnad?" placement="right">
                                    Følger det en økonomisk kostnad med ressursen? <br />
                                    Dette feltet står default til 'Nei'.
                                </HelpText>
                            </HStack>
                        }
                        value={newApplicationResource.hasCost || false}
                        onChange={(value: boolean) =>
                            setNewApplicationResource({
                                ...newApplicationResource,
                                hasCost: value,
                            })
                        }>
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RadioGroup>
                </li>
                {newApplicationResource.hasCost ? (
                    <li>
                        <TextField
                            className={'input-small'}
                            label={
                                <HStack gap={'2'}>
                                    Enhetskostnad
                                    <HelpText title="Hva er kostnad på ressurs?" placement="right">
                                        Kostnad per ressurs.
                                    </HelpText>
                                </HStack>
                            }
                            description={'Kostnad oppgis i øre'}
                            value={Number(newApplicationResource.unitCost) || 0}
                            inputMode="numeric"
                            onChange={(event) => {
                                Number(event.target.value) &&
                                    setNewApplicationResource({
                                        ...newApplicationResource,
                                        unitCost: Number(event.target.value),
                                    });
                            }}
                        />
                    </li>
                ) : null}

                <li>
                    <RadioGroup
                        legend={
                            <HStack gap={'2'}>
                                Status
                                <HelpText title="Hva er status?" placement="right">
                                    Status må settes til 'Aktiv' for at en ressurs skal være
                                    tilgjengelig for bruk. Ressursen vil da være tilgjengelig frem
                                    til status endres.
                                </HelpText>
                            </HStack>
                        }
                        value={newApplicationResource.status || false}
                        onChange={(value: string) =>
                            setNewApplicationResource({
                                ...newApplicationResource,
                                status: value,
                            })
                        }>
                        <VStack>
                            <Radio value={'ACTIVE'}>Aktiv</Radio>
                            <Radio value={'DISABLED'}>Deaktivert</Radio>
                            <Radio value={'DELETED'}>Slettet</Radio>
                        </VStack>
                    </RadioGroup>
                </li>
            </VStack>
        </ul>
    );
}
