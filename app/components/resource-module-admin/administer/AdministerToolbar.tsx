import {HStack, Search, Select} from "@navikt/ds-react";
import {useState} from "react";
import {useSearchParams} from "@remix-run/react";

interface ToolbarProps {
    objectTypesForUser: string[]
}
const AdministerToolbar = ({objectTypesForUser}: ToolbarProps) => {
    const [searchValue, setSearchValue] = useState("")
    const [, setSearchParams] = useSearchParams()

    const setObjectTypeFilter = (val: string) => {
        setSearchParams(searchParams => {
            val ? searchParams.set("objectType", val) : searchParams.delete("objectType")
            return searchParams
        })
    }

    const handleSearch = () => {
        setSearchParams(searchParams => {
            searchValue ? searchParams.set("orgUnitName", searchValue) : searchParams.delete("orgUnitName")
            return searchParams
        })
    }

    return (
        <HStack gap={"8"}>
            <Select label={"Vis objekttype"} onChange={(e) => setObjectTypeFilter(e.target.value)}>
                <option value={""}>Alle</option>
                {objectTypesForUser.map((objectType) => (
                    <option key={objectType} value={objectType}>
                        {objectType}
                    </option>
                ))}
            </Select>

            <form onSubmit={event => {
                handleSearch()
                event.preventDefault()
            }}>
                <Search label="Søk på orgenhetsnavn" variant="secondary" hideLabel={false} onChange={event => setSearchValue(event)} />
            </form>
        </HStack>
    )
}

export default AdministerToolbar
