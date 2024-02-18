import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useParams, useSubmit} from "@remix-run/react";

export const AssignedUsersSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")
    const params = useParams();

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: `/resources/${params.id}/user-assignments`})
                  event.preventDefault()
              }}>
            <Search
                role="search"
                label="Søk etter bruker"
                hideLabel={false}
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: `/resources/${params.id}/user-assignments`})
                }}
            />
        </Form>
    );
};