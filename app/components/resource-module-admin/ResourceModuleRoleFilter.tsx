import {Select} from "@navikt/ds-react";
import {IResourceModuleAccessRole, IResourceModuleUserRole} from "~/data/resourceModuleAdmin/types";
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleAccessRole[] | IResourceModuleUserRole[]
}

const ResourceModuleRoleFilter = ({roles}: ResourceModuleRoleFilterProps) => {
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
    const newRoles: any = roles;
    const isAccessRole = roles.every(role => typeof role === 'object' && 'accessRoleId' in role);

    return (
        <Select
            label={"Filtrer på brukerns rolle"}
            onChange={(e) => handleFilterRole(e.target.value)}
            value={roleProp ? roleProp : ""}
        >
            <option key={'unset'} value={''}>Alle</option>
            {newRoles.map((role: any) => (
                <option
                    key={isAccessRole ? role.accessRoleId : role.roleId}
                    value={isAccessRole ? role.accessRoleId : role.roleId}
                >
                    {isAccessRole ? role.name : role.roleName}
                </option>
            ))}
        </Select>
    );
}

export default ResourceModuleRoleFilter