import {Search as AkselSearch} from "@navikt/ds-react";
import React, {useState} from "react";
import {Form, useSearchParams} from "@remix-run/react";
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
            />
        </Form>
    );
};