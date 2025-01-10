import {Select} from "@navikt/ds-react";
import {IResourceModuleAccessRole, IResourceModuleUserRole} from "~/data/resourceAdmin/types";
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleAccessRole[]
}

const AllAccessRolesFilter = ({roles}: ResourceModuleRoleFilterProps) => {
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
            {roles
                .sort((a, b) => {
                    const nameA = a.name?.toLowerCase() || "";
                    const nameB = b.name?.toLowerCase() || "";
                    return roleNameSortOrder.indexOf(nameA) - roleNameSortOrder.indexOf(nameB);
                })
                .map((role) => (
                    <option
                        key={role.accessRoleId }
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