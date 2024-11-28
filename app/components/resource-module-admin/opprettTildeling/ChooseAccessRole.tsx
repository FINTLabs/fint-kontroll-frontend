import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {Radio, RadioGroup, VStack} from "@navikt/ds-react";

interface ChooseAccessRoleProps {
    accessRoles: IResourceModuleAccessRole[]
    setNewAccessRole: (accessRoleId: string) => void
}

const ChooseAccessRole = ({accessRoles, setNewAccessRole}: ChooseAccessRoleProps) => {
    const roleNameSortOrder = ["systemadministrator", "ressursadministrator", "tjenesteadministrator", "tildeler", "leder", "godkjenner", "sluttbruker"]
    return (
        <RadioGroup legend={"Velg aksessrolle"} onChange={setNewAccessRole}>
            <VStack>
                {accessRoles
                    .sort((a, b) => {
                        return roleNameSortOrder.indexOf(a.name.toLowerCase()) - roleNameSortOrder.indexOf(b.name.toLowerCase());
                    })
                    .map((accessRole, index) =>
                        <Radio key={accessRole.accessRoleId} value={accessRole.accessRoleId}>
                            {accessRole.name}
                        </Radio>
                    )}
            </VStack>
        </RadioGroup>
    )
}
export default ChooseAccessRole
