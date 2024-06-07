import {Select} from "@navikt/ds-react";
import React from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";

export const UserTypeFilter = () => {
    const [currentSearchParams, setSearchParams] = useSearchParams()
    const [searchParams,] = useSearchParams();

    const pageParam = searchParams.get("page")

    const setUserTypeFilter = (event: string) => {
        setSearchParams(searchParams => {
            searchParams.set("userType", event);
            return searchParams;
        })
        filterResetPageParam(pageParam, setSearchParams)
    }

    return (
        <Form className={"select-usertype"}>
            <Select label={"Filter for brukertype"}
                    id="user-type-select"
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    value={String(currentSearchParams.get("userType")) ?? ""}
            >
                <option value={""}>Alle</option>
                <option value={"STUDENT"}>STUDENT</option>
                <option value={"EMPLOYEESTAFF"}>EMPLOYEESTAFF</option>
                <option value={"EMPLOYEEFACULTY"}>EMPLOYEEFACULTY</option>
                <option value={"EXTERNAL"}>EXTERNAL</option>
            </Select>
        </Form>
    );
}