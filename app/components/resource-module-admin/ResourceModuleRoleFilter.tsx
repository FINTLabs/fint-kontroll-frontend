import {Radio, RadioGroup} from "@navikt/ds-react";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {useSearchParams} from "@remix-run/react";

interface ResourceModuleRoleFilterProps {
    roles: IResourceModuleAccessRole[]
}

const ResourceModuleRoleFilter = ({roles}: ResourceModuleRoleFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const roleProp = searchParams.get("accessroleid")

    const handleFilterRole = () => {
        setSearchParams((prev) => {
            prev.set("accessroleid", event.target.value)
            return prev
        })
    }

    return (
        <RadioGroup legend={"Filtrer på rolle"} onChange={handleFilterRole} value={roleProp ? roleProp : ""}>
            {
                roles.map((role) => <Radio key={role.accessRoleId} value={role.accessRoleId}>{role.name}</Radio>)
            }
        </RadioGroup>
    )
}

export default ResourceModuleRoleFilter