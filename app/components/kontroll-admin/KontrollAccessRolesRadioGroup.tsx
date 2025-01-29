import {Radio, RadioGroup} from "@navikt/ds-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "@remix-run/react";
import {sortAndCapitalizeRoles} from "~/components/common/CommonFunctions";
import {IAccessRole} from "~/data/types/userTypes";

interface AccessRolesRadioGroupProps {
    roles: IAccessRole[]
}

export default function KontrollAccessRolesRadioGroup({roles}: AccessRolesRadioGroupProps) {
    const params = useParams()
    const roleProp = params.id
    const navigate = useNavigate();

    const handleChangeSelectedRole = (role: string) => {
        navigate(role)
    }

    useEffect(() => {
        !roleProp ? navigate(roles[0].accessRoleId) : ""
    }, []);

    return (
        <RadioGroup
            legend="Velg rolle"
            onChange={(val: string) => handleChangeSelectedRole(val)}
            value={roleProp ? roleProp : ""}
        >
                {sortAndCapitalizeRoles(roles).map((role, index) =>
                    <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                        {role.name}
                    </Radio>
                )}
        </RadioGroup>
    )
}