import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSubmit} from "@remix-run/react";


export const RoleSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: "/roles"})
                  event.preventDefault()
              }}>
            <Search
                role="search"
                label="Søk etter gruppe"
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: "/roles"})
                }}
            />
        </Form>
    );
};