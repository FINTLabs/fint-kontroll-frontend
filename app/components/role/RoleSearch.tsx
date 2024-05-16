import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";

export const RoleSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

    return (
        <Form className={"searchField"}
              onSubmit={(event) => {
                  handleSearchFieldString(event, setSearchParams, searchString)
                  setSearchString("")
              }}
        >
            <Search
                role="search"
                id="search-role"
                label="Søk etter gruppe"
                variant="secondary"
                value={searchString}
                onChange={event => setSearchString(event)}
                onClear={() => {
                    handleClearSearchFieldString(setSearchParams)
                }}
            />
        </Form>
    );
};