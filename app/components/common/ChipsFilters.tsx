import {Chips} from "@navikt/ds-react";
import {useSearchParams} from "@remix-run/react";
import {useEffect, useState} from "react";

const ChipsFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orgUnits, setOrgUnits] = useState<string | undefined>()
    const [accessRoleId, setAccessRoleId] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()
    const [userType, setUserType] = useState<string | undefined>()
    const [search, setSearchName] = useState<string | undefined>()

    useEffect(() => {
        const orgsParam = searchParams.get("orgUnits")
        const accessRoleIdParam = searchParams.get("accessroleid")
        const nameParam = searchParams.get("name")
        const userTypeParam = searchParams.get("userType")
        const searchNameParam = searchParams.get("search")
        orgsParam ? setOrgUnits(orgsParam) : setOrgUnits(undefined)
        accessRoleIdParam ? setAccessRoleId(accessRoleIdParam) : setAccessRoleId(undefined)
        nameParam ? setName(nameParam) : setName(undefined)
        userTypeParam ? setUserType(userTypeParam) : setUserType(undefined)
        searchNameParam ? setSearchName(searchNameParam) : setSearchName(undefined)
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
            case "name":
                setName(undefined)
                return
            case "searchName":
                setSearchName(undefined)
                return
            default:
                setUserType(undefined)
                return
        }
    }


    return (
        <Chips>
            {orgUnits &&
                <Chips.Removable onClick={() => removeFilter("orgUnits")} id="org-unit-chip">
                    {`Fjern orgenhetsfiltre`}
                </Chips.Removable>
            }
            {accessRoleId &&
                <Chips.Removable onClick={() => removeFilter("accessroleid")} id="access-role-chip">
                    {accessRoleId}
                </Chips.Removable>
            }

            {userType &&
                <Chips.Removable onClick={() => removeFilter("userType")} id="user-type-chip">
                    {userType}
                </Chips.Removable>
            }

            {name &&
                <Chips.Removable onClick={() => removeFilter("name")} id="name-chip">
                    {name}
                </Chips.Removable>
            }
            {search &&
                <Chips.Removable onClick={() => removeFilter("search")} id="search-name-chip">
                    {search}
                </Chips.Removable>
            }
        </Chips>
    )
}

export default ChipsFilters