import {Search} from "@navikt/ds-react";
import {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";

export const ResourceSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  handleSearchFieldString(event, setSearchParams, searchString)
                  setSearchString("")
              }}
        >
            <Search
                id="search-resource"
                role="search"
                label="Søk etter ressurs"
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