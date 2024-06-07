import {Search} from "@navikt/ds-react";
import {Form, useSearchParams, useSubmit} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";
import {useState} from "react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";

export const ResourceSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const pageParam = searchParams.get("page")
    return (
        <Form className={"searchField"}
              onSubmit={event => {
                  filterResetPageParam(pageParam, setSearchParams)
                  handleSearchFieldString(event, setSearchParams, searchString)
                  setSearchString("")
              }}
        >
            <Search
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