import React from "react";
import {SetURLSearchParams} from "react-router-dom";
import {ICookie} from "~/data/types";

// Discovers all query params and formats them. Returns a string prepared for insertion in an url.
export const prepareQueryParams = (searchParams: URLSearchParams): string => {
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const orgunit = searchParams.get("orgunit") // These are used in tandem since some apis don't use capitalization the same way
    const orgUnit = searchParams.get("orgUnit") // These are used in tandem since some apis don't use capitalization the same way
    const name = searchParams.get("name")
    const responseCode = searchParams.get("responseCode")

    const queryParams = [
        search && `search=${encodeURIComponent(search)}`,
        page && `page=${encodeURIComponent(page)}`,
        orgunit && `orgunit=${encodeURIComponent(orgunit)}`,
        orgUnit && `orgUnit=${encodeURIComponent(orgUnit)}`,
        name && `name=${encodeURIComponent(name)}`,
        responseCode && `responseCode=${encodeURIComponent(responseCode)}`
    ].filter(Boolean).join('&')

    return queryParams ? `?${queryParams}` : ''
}

// search=value - Is the same as Name, but API specifies this instead of "name". Sets 'search' param to searchValue
export const handleSearchFieldString = (event: React.FormEvent<HTMLFormElement>, setSearchParams: SetURLSearchParams, searchValue: string) => {
    setSearchParams(searchParams => {
        searchValue ? searchParams.set("search", searchValue) : searchParams.delete("search")
        return searchParams
    })
    event.preventDefault() // Prevent refresh of page
}

// Clears queryparam: 'search'
export const handleClearSearchFieldString = (setSearchParams: SetURLSearchParams) => {
    setSearchParams(searchParameter => {
        searchParameter.delete("search")
        return searchParameter
    })
}
// -----

// name=value - Is the same as Search, but API specifies this instead of "search". Sets 'name' param to nameValue
export const handleSearchNameString = (event: React.FormEvent<HTMLFormElement>, setSearchParams: SetURLSearchParams, nameValue: string) => {
    setSearchParams(searchParams => {
        nameValue ? searchParams.set("name", nameValue) : searchParams.delete("name")
        return searchParams
    })
    event.preventDefault() // Prevent refresh of page
}

// Deletes queryparam: 'name'
export const handleClearNameFieldString = (setSearchParams: SetURLSearchParams) => {
    setSearchParams(searchParameter => {
        searchParameter.delete("search")
        return searchParameter
    })
}


// When any filter is changed, reset "page" query param
export const filterResetPageParam = (pageParam: string | null, setSearchParams: SetURLSearchParams) => {
    pageParam ? setSearchParams((prev) => {
        prev.get("page") ? prev.delete("page") : null
        return prev
    }) : null
}

// Sets Size Cookie client side
export const setSizeCookieClientSide = (sizeToSet: string) => {
    document.cookie = "size=" + sizeToSet + ";path=/"
}

// Helper function for creating a key-value pair list of cookies
export const keyValueParseCookies = (cookies: string): ICookie[] => {
    return cookies.split(";").map(cookie => {
        const [key, ...valueParts] = cookie.trim().split('=');
        const value = decodeURIComponent(valueParts.join('='));
        return { key, value };
    });
};

// Get Size Cookie from request and return it
export const getSizeCookieFromRequestHeader = (request: Request): ICookie | null => {
    const cookieHeader: string | null = request.headers.get("Cookie");
    if (cookieHeader) {
        const cookies = keyValueParseCookies(cookieHeader);
        const size = cookies.find(cookie => cookie.key === "size");
        return size ? size : null;
    }
    return null;
};
