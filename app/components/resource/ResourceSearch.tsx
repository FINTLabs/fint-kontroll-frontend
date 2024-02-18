import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSubmit} from "@remix-run/react";

export const ResourceSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")

    const handleSearch = () => {
        console.log(searchString)
    }

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: "/resources"})
                  event.preventDefault()
                  handleSearch()
              }}>
            <Search
                role="search"
                label="Søk etter ressurs"
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: "/resources"})
                }}
            />
        </Form>
    );
};