import {Search} from "@navikt/ds-react";
import {useSearchParams} from "@remix-run/react";
import React, {useState} from "react";

const ResourceModuleSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [, setSearchParams] = useSearchParams()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        setSearchParams(searchParams => {
            searchValue ? searchParams.set("name", searchValue) : searchParams.delete("name")
            return searchParams
        })
        event.preventDefault() // Prevent refresh of page
    }

    return (
        <form onSubmit={(event) => handleSearch(event)}>
            <Search label="Søk etter brukernavn" hideLabel={false} variant="secondary" onChange={event => setSearchValue(event)} />
        </form>
    )
}

export default ResourceModuleSearch