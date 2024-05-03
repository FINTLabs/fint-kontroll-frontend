import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";

export const RoleSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  setSearchParams(searchParameter => {
                      searchParameter.set("search", searchString)
                      return searchParameter
                  })
                  event.preventDefault()
              }}>
            <Search
                role="search"
                id="search-role"
                label="Søk etter gruppe"
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