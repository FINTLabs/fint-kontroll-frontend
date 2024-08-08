import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useParams, useSubmit} from "@remix-run/react";


export const NewAssignmentRoleSearch = () => {

    const submit = useSubmit();
    const params = useParams();
    const [searchString, setSearchString] = useState("");

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: `/assignment/resource/${params.id}/role`})
                  event.preventDefault()
              }}>
            <Search
                role="search"
                label="Søk etter gruppe"
                variant="secondary"
                hideLabel={false}
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: `/assignment/resource/${params.id}/role`})
                }}
            />
        </Form >
    );
};