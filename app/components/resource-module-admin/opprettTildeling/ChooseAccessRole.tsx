import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {Radio, RadioGroup} from "@navikt/ds-react";

interface ChooseAccessRoleProps {
    accessRoles: IResourceModuleAccessRole[]
    setNewAccessRole: (accessRoleId: string) => void
}
const ChooseAccessRole = ({accessRoles, setNewAccessRole}: ChooseAccessRoleProps) => {
    return (
        <RadioGroup legend={"Velg aksessrolle"} onChange={setNewAccessRole}>
            {accessRoles.map((accessRole) => (
                <Radio key={accessRole.accessRoleId} value={accessRole.accessRoleId}>
                    {accessRole.name}
                </Radio>
            ))}
        </RadioGroup>
    )
}
export default ChooseAccessRole