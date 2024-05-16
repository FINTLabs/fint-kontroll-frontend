import {Search} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useParams, useSearchParams, useSubmit} from "@remix-run/react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";

export const AssignedUsersSearch = () => {

    const submit = useSubmit();
    const [searchString, setSearchString] = useState("")
    const params = useParams();
    const [, setSearchParams] = useSearchParams()

    return (
        <Form className={"searchField"}
              method={"GET"}
              action={`/resources/${params.id}/user-assignments`}
              onSubmit={(event) => handleSearchFieldString(event, setSearchParams, searchString)}
        >
            <Search
                role="search"
                id="user-search"
                label="Søk etter bruker"
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