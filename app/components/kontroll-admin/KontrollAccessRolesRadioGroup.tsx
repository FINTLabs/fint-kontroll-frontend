import {Radio, RadioGroup} from "@navikt/ds-react";
import {useEffect} from "react";
import {IRole} from "~/data/kontrollAdmin/types";
import {useNavigate, useParams} from "@remix-run/react";

interface AccessRolesRadioGroupProps {
    roles: IRole[]
}

export default function KontrollAccessRolesRadioGroup({roles}: AccessRolesRadioGroupProps) {
    const params = useParams()
    const roleProp = params.id
    const navigate = useNavigate();
    const roleNameSortOrder = ["systemadministrator", "ressursadministrator", "tjenesteadministrator", "tildeler", "leder", "godkjenner", "sluttbruker"]

    const handleChangeSelectedRole = (role: string) => {
        navigate(role)
    }

    useEffect(() => {
        !roleProp ? navigate(roles[0].accessRoleId) : ""
    }, []);

    return (
        <RadioGroup legend="Velg rolle"
                    onChange={(val: string) => handleChangeSelectedRole(val)}
                    value={roleProp ? roleProp : ""}
        >
            {roles
                .sort((a, b) => {
                    return roleNameSortOrder.indexOf(a.name.toLowerCase()) - roleNameSortOrder.indexOf(b.name.toLowerCase());
                })
                .map((role, index) =>
                    <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                        {role.name}
                    </Radio>
                )}
        </RadioGroup>
    )
}