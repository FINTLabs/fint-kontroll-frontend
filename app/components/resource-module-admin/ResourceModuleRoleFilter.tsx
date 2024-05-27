import {Radio, RadioGroup} from "@navikt/ds-react";
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
    if (roles.every(role => typeof role === 'object' && 'accessRoleId' in role)) {
        const newRoles: any = roles
        return (
            <RadioGroup legend={"Filtrer på brukerns rolle"} onChange={handleFilterRole} value={roleProp ? roleProp : ""}>
                {
                    newRoles.map((role: IResourceModuleAccessRole) => <Radio key={role.accessRoleId} value={role.accessRoleId}>{role.name}</Radio>)
                }
            </RadioGroup>
        )
    } else {
        const newRoles: any = roles
        return (
            <RadioGroup legend={"Filtrer på brukerns rolle"} onChange={handleFilterRole} value={roleProp ? roleProp : ""}>
                {
                    newRoles.map((role: IResourceModuleUserRole) => <Radio key={role.roleId} value={role.roleId}>{role.roleName}</Radio>)
                }
            </RadioGroup>
        )
    }
}

export default ResourceModuleRoleFilter