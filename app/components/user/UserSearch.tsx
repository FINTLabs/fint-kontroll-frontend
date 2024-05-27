import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {
    filterResetPageParam,
    handleClearSearchFieldString,
    handleSearchFieldString
} from "~/components/common/CommonFunctions";


export const UserSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const pageParam = searchParams.get("page")

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  handleSearchFieldString(event, setSearchParams, searchString)
                  setSearchString("")
                  filterResetPageParam(pageParam, setSearchParams)
              }}
        >
            <Search
                role="search"
                label="Søk etter bruker"
                id="user-search"
                hideLabel={false}
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