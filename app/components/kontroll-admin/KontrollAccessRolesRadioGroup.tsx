import {Radio, RadioGroup} from "@navikt/ds-react";
import React, {useEffect} from "react";
import {IRole} from "~/data/kontrollAdmin/types";
import {useNavigate, useParams} from "@remix-run/react";

interface AccessRolesRadioGroupProps {
    roles: IRole[]
}

export default function KontrollAccessRolesRadioGroup ({roles}: AccessRolesRadioGroupProps) {
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
            {roles.map((role, index) =>
                <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                    {role.name}
                </Radio>)
            }
        </RadioGroup>
    )
}