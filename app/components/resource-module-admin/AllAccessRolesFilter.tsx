import {Select} from "@navikt/ds-react";
import {IResourceModuleAccessRole} from "~/data/types/resourceTypes";
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam, sortAndCapitalizeRoles} from "~/components/common/CommonFunctions";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleAccessRole[]
}

const AllAccessRolesFilter = ({roles}: ResourceModuleRoleFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const roleProp = searchParams.get("accessroleid")
    const pageParam = searchParams.get("page")

    const handleFilterRole = (value: string) => {
        setSearchParams((prev) => {
            value ? prev.set("accessroleid", value) : prev.delete("accessroleid")
            return prev
        })
        filterResetPageParam(pageParam, setSearchParams)
    }

    // Check which type roles is of, to allow reusability of this component.

    //const newRoles: any = roles;
    //  const isAccessRole = roles.every(role => typeof role === 'object' && 'accessRoleId' in role);


    return (
        <Select
            label={"Filtrer på brukerens rolle"}
            onChange={(e) => handleFilterRole(e.target.value)}
            value={roleProp || ""}
        >
            <option key={'unset'} value={''}>Alle</option>
            {sortAndCapitalizeRoles(roles)
                .map((role) => (
                    <option
                        key={role.accessRoleId}
                        value={role.accessRoleId}
                    >
                        {role.name}
                    </option>
                ))
            }
        </Select>
    );
}

export default AllAccessRolesFilter