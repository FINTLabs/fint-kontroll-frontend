import {Select} from "@navikt/ds-react";
import React from "react";
import {Form, useSearchParams} from "@remix-run/react";

export const UserTypeFilter = () => {

    const [, setSearchParams] = useSearchParams()

    const setUserTypeFilter = (event: string) => {
        setSearchParams(searchParams => {
            searchParams.set("userType", event);
            return searchParams;
        })
    }

    return (
        <Form className={"select-usertype"}>
            <Select label={"Filter for brukertype"}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    id="user-type-select"
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