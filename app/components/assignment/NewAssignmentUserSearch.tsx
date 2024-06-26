import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useParams, useSubmit} from "@remix-run/react";


export const NewAssignmentUserSearch = () => {

    const submit = useSubmit();
    const params = useParams();
    const [searchString, setSearchString] = useState("");

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: `/assignment/resource/${params.id}/user`})
                  event.preventDefault()
              }}>
            <Search
                role="search"
                id="user-search"
                label="Søk etter bruker"
                hideLabel={false}
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    submit({search: ""}, {method: "GET", action: `/assignment/resource/${params.id}/user`})
                }}
            />
        </Form>
    );
};