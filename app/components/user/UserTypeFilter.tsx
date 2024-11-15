import {Select} from "@navikt/ds-react";
import React from "react";
import {Form, useSearchParams} from "@remix-run/react";
import {filterResetPageParam, translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {IKodeverkUserType} from "~/data/types";

interface UserTypeFilterProps {
    userTypes: IKodeverkUserType[]
}
export const UserTypeFilter = ({userTypes}: UserTypeFilterProps) => {
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

    // @ts-ignore
    return (
        <Form>
            <Select label={"Filter for brukertype"}
                    id="user-type-select"
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    value={String(currentSearchParams.get("userType")) ?? ""}
            >
                <option value={""}>Alle</option>
                <option value={"STUDENT"}>{translateUserTypeToLabel("STUDENT", userTypes)}</option>
                <option value={"EMPLOYEESTAFF"}>{translateUserTypeToLabel("EMPLOYEESTAFF", userTypes)}</option>
                <option value={"EMPLOYEEFACULTY"}>{translateUserTypeToLabel("EMPLOYEEFACULTY", userTypes)}</option>
                <option value={"EXTERNAL"}>{translateUserTypeToLabel("EXTERNAL", userTypes)}</option>
            </Select>
        </Form>
    );
}