import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {Radio, RadioGroup} from "@navikt/ds-react";

interface ChooseAccessRoleProps {
    accessRoles: IResourceModuleAccessRole[]
    setNewAccessRole: (accessRoleId: string) => void
}

const roleNameSortOrder = ["systemadministrator", "systemadministrator", "systemadministrator", "tildeler", "leder", "godkjenner", "sluttbruker"]
const ChooseAccessRole = ({accessRoles, setNewAccessRole}: ChooseAccessRoleProps) => {

    return (
        <RadioGroup legend={"Velg aksessrolle"} onChange={setNewAccessRole}>
            ???
            {accessRoles
                .sort((a, b) => {
                    return roleNameSortOrder.indexOf(b.name.toLowerCase()) - roleNameSortOrder.indexOf(a.name.toLowerCase());
                })
                .map((accessRole) => (
                    <Radio key={accessRole.accessRoleId} value={accessRole.accessRoleId}>
                        {accessRole.name}
                    </Radio>
                ))}
        </RadioGroup>
    )
}
export default ChooseAccessRole