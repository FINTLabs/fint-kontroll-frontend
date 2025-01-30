import {Select} from "@navikt/ds-react";
import {IResourceModuleUserRole} from "~/data/types/resourceTypes";
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam, sortAndCapitalizeRoles} from "~/components/common/CommonFunctions";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleUserRole[]
}

const UserAccessRoleFilter = ({roles}: ResourceModuleRoleFilterProps) => {
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
                        key={role.roleId}
                        value={role.roleId}
                    >
                        {role.roleName}
                    </option>
                ))
            }
        </Select>
    );
}

export default UserAccessRoleFilter