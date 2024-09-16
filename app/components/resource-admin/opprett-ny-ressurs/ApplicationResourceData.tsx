import React, {SetStateAction} from "react";
import {INewApplicationResource} from "~/components/resource-admin/types";
import {Checkbox, CheckboxGroup, Radio, RadioGroup, Select, TextField, VStack} from "@navikt/ds-react";

interface ResourceDataProps {
    newApplicationResource: INewApplicationResource
    setNewApplicationResource: React.Dispatch<SetStateAction<INewApplicationResource>>
}

export default function ApplicationResourceData({
                                                    newApplicationResource,
                                                    setNewApplicationResource
                                                }: ResourceDataProps) {

    const doesValueContainNumbersOnly = (value: string) => {
        return /^\d*$/.test(value)
    }

    return (
        <ul>
            <VStack gap={"8"}>
                <li>
                    <TextField className={"input-large"}
                               label="Ressurs ID"
                               description={"Skriv inn unik id til ressursen uten mellomrom"}
                               value={newApplicationResource.resourceId}
                               onChange={(event) =>
                                   setNewApplicationResource({
                                       ...newApplicationResource,
                                       resourceId: event.target.value,
                                   })}/>
                </li>
                <li>
                    <TextField className={"input-large"}
                               label="Navn på ressurs"
                               description={"Fullt navn på ressursen"}
                               value={newApplicationResource.resourceName}
                               onChange={(event) => setNewApplicationResource({
                                   ...newApplicationResource,
                                   resourceName: event.target.value
                               })}/>
                </li>
                <li>
                    <Select
                        className={"input-medium"}
                        label={"Velg ressurstype"}
                        onChange={(event) => setNewApplicationResource({
                            ...newApplicationResource,
                            resourceType: event.target.value
                        })}
                    >
                        <option value={""}></option>
                        <option value={"ApplicationResource"}>Applikasjonsressurs</option>
                    </Select>
                </li>
                <li>
                    <CheckboxGroup legend="Velg plattform" onChange={(value: string[]) => {
                        setNewApplicationResource((prevState) => {
                            return {
                                ...prevState,
                                platform: value
                            };
                        });
                    }}>
                        <Checkbox value="win">Win</Checkbox>
                        <Checkbox value="mac">Mac</Checkbox>
                        <Checkbox value="linux">Linux</Checkbox>
                        <Checkbox value="web">Web</Checkbox>
                        <Checkbox value="android">Android</Checkbox>
                        <Checkbox value="ios">iOS</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <Select
                        className={"input-medium"}
                        label={"Velg tilgangstype"}

                        onChange={(event) => setNewApplicationResource({
                            ...newApplicationResource,
                            accessType: event.target.value
                        })}>
                        <option value={""}></option>
                        <option value={"Device based license"}>Device based license</option>

                    </Select>
                </li>
                <li>
                    <TextField className={"input-small"}
                               label="Ressursgrense"
                               description={"Totalt antall av ressursen"}
                               value={newApplicationResource.resourceLimit}
                               onChange={(event) => setNewApplicationResource({
                                   ...newApplicationResource,
                                   resourceLimit: Number(event.target.value)
                               })}/>
                </li>
                <li>
                    <CheckboxGroup legend="Velg roller ressursen skal være gyldig for"
                                   onChange={(value: string[]) => {
                                       setNewApplicationResource((prevState) => {
                                           return {
                                               ...prevState,
                                               validForRoles: value
                                           };
                                       });
                                   }}>
                        <Checkbox value={"Elev"}>Elev</Checkbox>
                        <Checkbox value={"Ansatt skole"}>Ansatt skole</Checkbox>
                    </CheckboxGroup>
                </li>
                <li>
                    <Select
                        className={"input-medium"}
                        label={"Velg applikasjonskategori"}
                        onChange={(e) => {
                            const selectedAppCategory = e.target.value;
                            setNewApplicationResource((prevState) => {
                                return {
                                    ...prevState,
                                    applicationCategory: selectedAppCategory ? [selectedAppCategory] : []
                                };
                            });
                        }}
                    >
                        <option value={""}></option>
                        <option value={"Pedagogisk programvare"}>Pedagogisk programvare</option>
                    </Select>
                </li>
                <li>
                    <RadioGroup legend="Har ressursen en kostnad?"
                                onChange={(value: boolean) => setNewApplicationResource({
                                    ...newApplicationResource,
                                    hasCost: value
                                })}>
                        <Radio value={true}>Ja</Radio>
                        <Radio value={false}>Nei</Radio>
                    </RadioGroup>
                </li>
                <li>
                    <RadioGroup legend="Håndhevingsregel"
                                onChange={(value: string) => setNewApplicationResource({
                                    ...newApplicationResource,
                                    licenseEnforcement: value
                                })}>
                        <Radio value={"Hard stop"}>Kan ikke overskrides</Radio>
                        <Radio value={"kan overskrides"}>Kan overskrides</Radio>
                        <Radio value={"free"}>Fri bruk</Radio>
                    </RadioGroup>
                </li>
                <li>
                    <TextField className={"input-small"}
                               label="Kostnad ressurs (pr. stk.)"
                               inputMode="numeric"
                               value={newApplicationResource.unitCost}
                               {...(!doesValueContainNumbersOnly(String(newApplicationResource.unitCost)) ? {error: "Kan ikke inneholde annet enn tall"} : {})}
                               onChange={(event) => doesValueContainNumbersOnly(event.target.value) && setNewApplicationResource({
                                   ...newApplicationResource,
                                   unitCost: Number(event.target.value)
                               })}
                    />
                </li>
                <li>
                    <RadioGroup legend="Status"
                                onChange={(value: string) => setNewApplicationResource({
                                    ...newApplicationResource,
                                    status: value
                                })}>
                        <Radio value={"ACTIVE"}>Aktiv</Radio>
                        <Radio value={"DISABLED"}>Disabled</Radio>
                        <Radio value={"DELETED"}>Slettet</Radio>
                    </RadioGroup>
                </li>
            </VStack>
        </ul>
    )
}