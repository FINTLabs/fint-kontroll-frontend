import {Chips} from "@navikt/ds-react";
import {useSearchParams} from "@remix-run/react";
import {useEffect, useState} from "react";

const ChipsFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orgUnits, setOrgUnits] = useState<string | undefined>()
    const [accessRoleId, setAccessRoleId] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()

    useEffect(() => {
        const orgsParam = searchParams.get("orgUnits")
        const accessRoleIdParam = searchParams.get("accessroleid")
        const nameParam = searchParams.get("name")
        orgsParam ? setOrgUnits(orgsParam) : setOrgUnits(undefined)
        accessRoleIdParam ? setAccessRoleId(accessRoleIdParam) : setAccessRoleId(undefined)
        nameParam ? setName(nameParam) : setName(undefined)
    }, [searchParams]);

    const removeFilter = (filterToRemove: string) => {
        setSearchParams(searchParams => {
            searchParams.delete(filterToRemove)
            return searchParams
        })
        switch (filterToRemove) {
            case "orgUnits":
                setOrgUnits(undefined)
                return
            case "accessroleid":
                setAccessRoleId(undefined)
                return
            default:
                setName(undefined)
                return
        }
    }


    return (
        <Chips>
            {orgUnits &&
                <Chips.Removable onClick={() => removeFilter("orgUnits")}>
                    {`Fjern orgenhetsfiltre`}
                </Chips.Removable>
            }
            {accessRoleId &&
                <Chips.Removable onClick={() => removeFilter("accessroleid")}>
                    {accessRoleId}
                </Chips.Removable>
            }

            {name &&
                <Chips.Removable onClick={() => removeFilter("name")}>
                    {name}
                </Chips.Removable>
            }
        </Chips>
    )
}

export default ChipsFilters