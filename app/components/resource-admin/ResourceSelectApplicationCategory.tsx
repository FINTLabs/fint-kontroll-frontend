import {Select} from "@navikt/ds-react";
import {SetURLSearchParams} from "react-router-dom";
import {useSearchParams} from "@remix-run/react";

interface ResourceSelectApplicationCategoryProps {
    applicationCategories: string[]
}
export function ResourceSelectApplicationCategory ({applicationCategories}: ResourceSelectApplicationCategoryProps) {
    const [applicationCategorySearchParams, setApplicationCategorySearchParams] = useSearchParams()

    const setAppCategory = (event: string) => {
        setApplicationCategorySearchParams(searchParams => {
            searchParams.set("applicationcategory", event);
            if (searchParams.get("applicationcategory") === "") {
                searchParams.delete("applicationcategory")
            }
            return searchParams;
        })
    }

    return (
        <Select
            className={"select-applicationcategory"}
            label={"Filter for applikasjonskategori"}
            onChange={(e) => setAppCategory(e.target.value)}
            value={String(applicationCategorySearchParams.get("applicationcategory")) ?? ""}
        >
            <option value={""}>Alle</option>
            {applicationCategories?.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </Select>
    )
}