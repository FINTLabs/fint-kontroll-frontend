import {Chips} from "@navikt/ds-react";
import {useSearchParams} from "@remix-run/react";
import {useEffect, useState} from "react";
import {filterResetPageParam, translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {IKodeverkUserType} from "~/data/types";

interface ChipsFiltersProps {
    userTypes?: IKodeverkUserType[];
}

type Filters = {
    orgUnits: string | null;
    accessRoleId: string | null;
    name: string | null;
    userType: string | null;
    search: string | null;
    status: string | null;
    applicationCategory: string | null;
    orgUnitName: string | null;
}

const ChipsFilters = ({userTypes}: ChipsFiltersProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<Filters>({
        orgUnits: null,
        accessRoleId: null,
        name: null,
        userType: null,
        search: null,
        status: null,
        applicationCategory: null,
        orgUnitName: null,
    });

    const pageParam = searchParams.get("page");

    useEffect(() => {
        const newFilters: Filters = {
            orgUnits: searchParams.get("orgUnits"),
            accessRoleId: searchParams.get("accessroleid"),
            name: searchParams.get("name"),
            userType: searchParams.get("userType"),
            search: searchParams.get("search"),
            status: searchParams.get("status"),
            applicationCategory: searchParams.get("applicationcategory"),
            orgUnitName: searchParams.get("orgUnitName"),
        };
        setFilters(newFilters);
    }, [searchParams]);

    const removeFilter = (filterToRemove: string) => {
        setSearchParams((params) => {
            params.delete(filterToRemove);
            return params;
        });
        filterResetPageParam(pageParam, setSearchParams);
        setFilters((prev) => ({...prev, [filterToRemove]: undefined}));
    };

    console.log(filters);

    return (
        <Chips>
            {Object.entries(filters)
                .filter(([, value]) => value !== null)
                .map(([key, value]) =>
                    value ? (
                        <Chips.Removable key={key} onClick={() => removeFilter(key)} id={`${key}-chip`}>
                            {key === "userType" ? translateUserTypeToLabel(value, userTypes) : value}
                        </Chips.Removable>
                    ) : null
                )}
        </Chips>
    );
};

export default ChipsFilters;