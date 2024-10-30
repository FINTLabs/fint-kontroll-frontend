import {Chips} from "@navikt/ds-react";
import {useSearchParams} from "@remix-run/react";
import {useEffect, useState} from "react";
import {filterResetPageParam, translateValidForRoleLabel,} from "~/components/common/CommonFunctions";
import {IKodeverkUserType} from "~/data/types";

interface ChipsFiltersProps {
    userTypes?: IKodeverkUserType[]
}

const ChipsFilters = ({userTypes}: ChipsFiltersProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [orgUnits, setOrgUnits] = useState<string | undefined>()
    const [accessRoleId, setAccessRoleId] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()
    const [userType, setUserType] = useState<string | undefined>()
    const [search, setSearchName] = useState<string | undefined>()
    const [status, setStatus] = useState<string | undefined>()
    const [applicationcategory, setApplicationcategory] = useState<string | undefined>()
    const [orgUnitName, setOrgUnitName] = useState<string | undefined>()

    const pageParam = searchParams.get("page")

    useEffect(() => {
        const orgsParam = searchParams.get("orgUnits")
        const accessRoleIdParam = searchParams.get("accessroleid")
        const nameParam = searchParams.get("name")
        const userTypeParam = searchParams.get("userType")
        const searchNameParam = searchParams.get("search")
        const statusParam = searchParams.get("status")
        const applicationcategory = searchParams.get("applicationcategory")
        const orgUnitName = searchParams.get("orgUnitName")

        orgsParam ? setOrgUnits(orgsParam) : setOrgUnits(undefined)
        accessRoleIdParam ? setAccessRoleId(accessRoleIdParam) : setAccessRoleId(undefined)
        nameParam ? setName(nameParam) : setName(undefined)
        userTypeParam ? setUserType(userTypeParam) : setUserType(undefined)
        searchNameParam ? setSearchName(searchNameParam) : setSearchName(undefined)
        statusParam ? setStatus(statusParam) : setStatus(undefined)
        applicationcategory ? setApplicationcategory(applicationcategory) : setApplicationcategory(undefined)
        orgUnitName ? setOrgUnitName(orgUnitName) : setOrgUnitName(undefined)
    }, [searchParams]);

    const removeFilter = (filterToRemove: string) => {
        setSearchParams(searchParams => {
            searchParams.delete(filterToRemove)
            return searchParams
        })
        filterResetPageParam(pageParam, setSearchParams)
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
            case "status":
                setStatus(undefined)
                return
            case "applicationcategory":
                setApplicationcategory(undefined)
                return
            case "orgUnitName":
                setOrgUnitName(undefined)
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
                    {translateValidForRoleLabel(userType, userTypes)}
                </Chips.Removable>
            }

            {name &&
                <Chips.Removable
                    onClick={() => {
                        removeFilter("name")
                    }}
                    id="name-chip"
                >
                    {name}
                </Chips.Removable>
            }
            {search &&
                <Chips.Removable
                    onClick={() => {
                        removeFilter("search")
                    }}
                    id="search-name-chip"
                >
                    {search}
                </Chips.Removable>
            }
            {status &&
                <Chips.Removable
                    onClick={() => {
                        removeFilter("status")
                    }}
                    id="status-name-chip"
                >
                    {status}
                </Chips.Removable>
            }
            {applicationcategory &&
                <Chips.Removable
                    onClick={() => {
                        removeFilter("applicationcategory")
                    }}
                    id="application-category-chip"
                >
                    {`Applikasjonskategori: ${applicationcategory}`}
                </Chips.Removable>
            }
            {orgUnitName &&
                <Chips.Removable
                    onClick={() => {
                        removeFilter("orgUnitName")
                    }}
                    id="org-unit-name-chip"
                >
                    {`Søkenavn: ${orgUnitName}`}
                </Chips.Removable>
            }
        </Chips>
    )
}

export default ChipsFilters