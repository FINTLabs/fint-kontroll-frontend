import {Chips} from "@navikt/ds-react";
import {useLoaderData, useSearchParams} from "@remix-run/react";
import {useCallback, useEffect, useState} from "react";
import {filterResetPageParam, translateUserTypeToLabel} from "~/components/common/CommonFunctions";
import {IKodeverkUserType} from "~/data/types";

type Filters = {
    orgUnits: string | null;
    accessRoleId: string | null;
    name: string | null;
    userType: string | null;
    search: string | null;
    status: string | null;
    applicationcategory: string | null;
    orgUnitName: string | null;
}

const ChipsFiltersNew = () => {
    const loaderData = useLoaderData<{ userTypes?: IKodeverkUserType[] }>();
    const userTypes = loaderData?.userTypes ?? undefined;

    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<Filters>({
        orgUnits: null,
        accessRoleId: null,
        name: null,
        userType: null,
        search: null,
        status: null,
        applicationcategory: null,
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
            applicationcategory: searchParams.get("applicationcategory"),
            orgUnitName: searchParams.get("orgUnitName"),
        };
        setFilters(newFilters);
    }, [searchParams]);

    const removeFilter = useCallback((filterToRemove: string) => {
        setSearchParams((params) => {
            params.delete(filterToRemove);
            return params;
        });
        filterResetPageParam(pageParam, setSearchParams);
        setFilters((prev) => ({...prev, [filterToRemove]: undefined}));
    }, [pageParam, setSearchParams]);

    const filterToLabel = useCallback((filter: string, value: string) => {
        switch (filter) {
            case "userType":
                return translateUserTypeToLabel(value, userTypes);
            case "orgUnits":
                return "Fjern orgenhetsfiltre";
            case "applicationcategory":
                return `Applikasjonskategori: ${value}`;
            case "orgUnitName":
                return `Søkenavn: ${value}`;
            default:
                return value;
        }
    }, [userTypes])

    return (
        <Chips>
            {Object.entries(filters)
                .filter(([, value]) => value !== null)
                .map(([key, value]) =>
                    value ? (
                        <Chips.Removable key={key} onClick={() => removeFilter(key)} id={`${key}-chip`}>
                            {filterToLabel(key, value)}
                        </Chips.Removable>
                    ) : null
                )}
        </Chips>
    );
};

export default ChipsFiltersNew;