import {Radio, RadioGroup, Select, VStack} from "@navikt/ds-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "@remix-run/react";
import {sortAndCapitalizeRoles} from "~/components/common/CommonFunctions";
import {IAccessRole} from "~/data/types/userTypes";

interface AccessRolesRadioGroupProps {
    roles: IAccessRole[]
}

export default function KontrollAccessRolesSelect({roles}: AccessRolesRadioGroupProps) {
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
        <Select
            label="Velg rolle"
            onChange={(e) => handleChangeSelectedRole(e.target.value)}
            value={roleProp ? roleProp : ""}
        >
            {sortAndCapitalizeRoles(roles).map((role, index) =>
                <option key={role.accessRoleId + index} value={role.accessRoleId}>
                    {role.name}
                </option>
            )}
        </Select>
    )
}