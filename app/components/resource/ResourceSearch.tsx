import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";

export const ResourceSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        setSearchParams(searchParams => {
            searchString ? searchParams.set("search", searchString) : searchParams.delete("search")
            return searchParams
        })
        event.preventDefault() // Prevent refresh of page
    }

    return (
        <Form className={"searchField"} onSubmit={(event) => handleSearch(event)}>
            <Search
                role="search"
                label="Søk etter ressurs"
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    setSearchParams(searchParameter => {
                        searchParameter.delete("search")
                        return searchParameter
                    })
                }}
            />
        </Form>
    );
};