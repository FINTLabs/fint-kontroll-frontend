import {Select} from "@navikt/ds-react";
import {IResourceModuleAccessRole, IResourceModuleUserRole} from "~/data/resourceModuleAdmin/types";
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleUserRole[]
}

const UserAccessRoleFilter = ({roles}: ResourceModuleRoleFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const roleProp = searchParams.get("accessroleid")
    const pageParam = searchParams.get("page")
    const roleNameSortOrder = ["systemadministrator", "ressursadministrator", "tjenesteadministrator", "tildeler", "leder", "godkjenner", "sluttbruker"]


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
            {roles
                .sort((a, b) => {
                    const nameA = a.roleName?.toLowerCase() || "";
                    const nameB = b.roleName?.toLowerCase() || "";
                    return roleNameSortOrder.indexOf(nameA) - roleNameSortOrder.indexOf(nameB);
                })
                .map((role) => (
                    <option
                        key={role.roleId }
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