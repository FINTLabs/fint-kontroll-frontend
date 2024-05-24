import {Search} from "@navikt/ds-react";
import {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {handleClearSearchFieldString, handleSearchFieldString} from "~/components/common/CommonFunctions";

export const ResourceSearch = () => {

    const [searchString, setSearchString] = useState("")
    const [, setSearchParams] = useSearchParams()

   /* const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        setSearchParams(searchParams => {
            searchString ? searchParams.set("search", searchString) : searchParams.delete("search")
            return searchParams
        })
        event.preventDefault() // Prevent refresh of page
    }*/

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