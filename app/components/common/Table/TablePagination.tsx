import {Form, useSearchParams} from "@remix-run/react";
import {Select, Pagination as AkselPagination} from "@navikt/ds-react";
import React from "react";
import {setSizeCookieClientSide} from "~/components/common/CommonFunctions";

type PaginationProps = {
    currentPage: number
    totalPages?: number
    size?: string | number | readonly string[] | undefined
}

export const TablePagination = ({totalPages = 1, size = 25, currentPage}: PaginationProps) => {
    const [, setSearchParams] = useSearchParams()
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
        setSizeCookieClientSide(event.target.value)
        setSearchParams(searchParams => {
            searchParams.set("page", "0")
            return searchParams;
        })
    }

    return (
        <Form className={"paginationWrapper"}>
            <Select
                id={"select-number-of-rows"}
                style={{marginBottom: '1.5rem'}}
                label="Rader per side"
                size="small"
                onChange={handleChangeRowsPerPage}
                defaultValue={size}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </Select>
            {Number(totalPages) > 1 &&
                <AkselPagination
                    id="pagination"
                    page={currentPage + 1}
                    onPageChange={(e) => {
                        setSearchParams(searchParams => {
                            searchParams.set("page", (e - 1).toString());
                            return searchParams;
                        })
                    }}
                    count={Math.max(totalPages, 1)}
                    size="small"
                    prevNextTexts
                />
            }
        </Form>
    )
}