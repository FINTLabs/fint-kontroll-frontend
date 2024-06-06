import React, {SetStateAction, useEffect} from "react";
import {INewResource} from "~/components/resource-admin/types";
import {Box, DatePicker, HStack, Radio, RadioGroup, Textarea, TextField, useRangeDatepicker} from "@navikt/ds-react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

interface ResourceDataProps {
    newResource: INewResource
    setNewResource: React.Dispatch<SetStateAction<INewResource>>
}
export default function ResourceData ({newResource, setNewResource}: ResourceDataProps) {
    const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
        useRangeDatepicker({
            fromDate: new Date("Aug 23 2019"),
            onRangeChange: console.log,
        });

    useEffect(() => {
        fromInputProps ? setNewResource({...newResource, validFrom: String(fromInputProps.value)}): null
        toInputProps ? setNewResource({...newResource, validTo: String(toInputProps.value)}) : null
    }, [selectedRange])

    const handleChangeApproval = (val: boolean) => setNewResource({...newResource, needsApprovalFromSupervisor: val})

    const doesValueContainNumbersOnly = (value: string) => {
        return /^\d*$/.test(value)
    }

    return (
        <ul>
            <li>
                <TextField label="Navn på ressurs" maxLength={25} value={newResource.resourceName} onChange={(event) => setNewResource({...newResource, resourceName: event.target.value})} />
            </li>
            <li>
                <Textarea label="Beskrivelse" value={newResource.resourceName} onChange={(event) => setNewResource({...newResource, resourceDescription: event.target.value})} />
            </li>
            <li>
                <div className="min-h-96">
                    <DatePicker {...datepickerProps}>
                        <HStack wrap gap="4" justify="center">
                            <DatePicker.Input {...fromInputProps} label="Ressurs gyldig fra" />
                            <DatePicker.Input {...toInputProps} label="Ressurs gyldig til" />
                        </HStack>
                    </DatePicker>
                    {selectedRange && (
                        <Box paddingBlock="4 0">
                            <div>
                                {selectedRange?.from &&
                                    format(selectedRange.from, "dd.MM.yyyy", { locale: nb })}
                            </div>
                            <div>
                                {selectedRange?.to &&
                                    format(selectedRange.to, "dd.MM.yyyy", { locale: nb })}
                            </div>
                        </Box>
                    )}
                </div>
            </li>
            <li>
                <TextField label="Pris per ressursbruk"
                           inputMode="numeric"
                           value={newResource.costPerUse}
                           {...(!doesValueContainNumbersOnly(String(newResource.costPerUse)) ? {error:"Kan ikke inneholde annet enn tall"} : {})}
                           onChange={(event) => doesValueContainNumbersOnly(event.target.value) && setNewResource({ ...newResource, costPerUse: Number(event.target.value) })}

                />
            </li>
            <li>
                <RadioGroup legend="Krever ressursen godkjenning?" onChange={handleChangeApproval}>
                    <Radio value={true}>Ja</Radio>
                    <Radio value={false}>Nei</Radio>
                </RadioGroup>
            </li>
            <li>
                <TextField label="Lisensantall"
                           inputMode="numeric"
                           value={newResource.numberOfLicenses}
                           {...(!doesValueContainNumbersOnly(String(newResource.numberOfLicenses)) ? {error:"Kan ikke inneholde annet enn tall"} : {})}
                           onChange={(event) => doesValueContainNumbersOnly(event.target.value) && setNewResource({...newResource, numberOfLicenses: Number(event.target.value) })}
                />
            </li>
        </ul>
    )
}