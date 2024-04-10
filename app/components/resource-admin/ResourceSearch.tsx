import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSubmit} from "@remix-run/react";

export const ResourceSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")

    const handleSearch = () => {
    }

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: "/resource-admin"})
                  event.preventDefault()
                  handleSearch()
              }}>
            <Search
                role="search"
                label="Søk etter ressurs"
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: "/resource-admin"})
                }}
            />
        </Form>
    );
};