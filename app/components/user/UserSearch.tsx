import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";


export const UserSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  handleSearchFieldString(event, setSearchParams, searchString)
              }}>
            <Search
                role="search"
                label="Søk etter bruker"
                id="user-search"
                hideLabel={false}
                variant="secondary"
                onChange={event => setSearchString(event)}
                onClear={event => {
                    handleClearSearchFieldString(event, setSearchParams)
                }}
            />
        </Form>
    );
};