import {Search as AkselSearch} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useNavigation, useSearchParams} from "@remix-run/react";
import {
    filterResetPageParam,
    handleClearSearchFieldString,
    handleSearchFieldString
} from "~/components/common/CommonFunctions";

type SearchInputProps = {
    label: string
    id: string
}

export const Search = ({label, id}: SearchInputProps) => {
    const [searchString, setSearchString] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    const navigation = useNavigation()
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("search");

    const pageParam = searchParams.get("page")

    return (
        <Form
            className={"searchField"}
            onSubmit={(event) => {
                handleSearchFieldString(event, setSearchParams, searchString)
                setSearchString("")
                filterResetPageParam(pageParam, setSearchParams)
            }}
        >
            <AkselSearch
                role="search"
                id={id}
                label={label}
                hideLabel={false}
                variant="secondary"
                value={searchString}
                onChange={event => setSearchString(event)}
                onClear={() => {
                    handleClearSearchFieldString(setSearchParams)
                }}
            > <AkselSearch.Button loading={searching}/>
            </AkselSearch>
        </Form>
    );
};