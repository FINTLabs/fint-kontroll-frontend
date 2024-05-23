import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams, useSubmit} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";

export const ResourceSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const pageParam = searchParams.get("page")
    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  submit({search: searchString}, {method: "GET", action: "/resource-admin"})
                  event.preventDefault()
                  filterResetPageParam(pageParam, setSearchParams)
              }}>
            <Search
                role="search"
                label="Søk etter ressurs"
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={() => {
                    submit({search: ""}, {method: "GET", action: "/resource-admin"})
                }}
            />
        </Form>
    );
};