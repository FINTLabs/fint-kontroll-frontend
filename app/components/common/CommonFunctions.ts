export const prepareQueryParams = (searchParams: URLSearchParams): string => {
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const orgunit = searchParams.get("orgunit") // These are used in tandem since some apis don't use capitalization the same way
    const orgUnit = searchParams.get("orgUnit") // These are used in tandem since some apis don't use capitalization the same way
    const name = searchParams.get("name")

    const queryParams = [
        search && `search=${encodeURIComponent(search)}`,
        page && `page=${encodeURIComponent(page)}`,
        orgunit && `orgunit=${encodeURIComponent(orgunit)}`,
        orgUnit && `orgUnit=${encodeURIComponent(orgUnit)}`,
        name && `name=${encodeURIComponent(name)}`
    ].filter(Boolean).join('&')

    return queryParams ? `?${queryParams}` : ''
}