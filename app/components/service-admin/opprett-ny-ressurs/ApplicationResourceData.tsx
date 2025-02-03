import React, { SetStateAction } from 'react';
import { IApplicationResource } from '~/components/service-admin/types';
import { Checkbox, CheckboxGroup, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';

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
                        label="Navn på ressurs"
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
                    <TextField
                        className={'input-small'}
                        label="Ressursgrense"
                        description={'Totalt antall av ressursen'}
                        value={newApplicationResource.resourceLimit || 0}
                        onChange={(event) =>
                            setNewApplicationResource({
                                ...newApplicationResource,
                                resourceLimit: Number(event.target.value),
                            })
                        }
                    />
                </li>
                <li>
                    <CheckboxGroup
                        legend="Velg roller ressursen skal være gyldig for"
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
                        legend="Velg applikasjonskategori"
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
                        legend="Har ressursen en kostnad?"
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
                <li>
                    <RadioGroup
                        legend="Håndhevingsregel"
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
                <li>
                    <TextField
                        className={'input-small'}
                        label="Kostnad ressurs (pr. stk.)"
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
                <li>
                    <RadioGroup
                        legend="Status"
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
