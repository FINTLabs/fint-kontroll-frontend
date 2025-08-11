import { Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IAccessRole } from '~/data/types/userTypes';
import { sortAndCapitalizeRoles } from '~/utils/translators';

interface AccessRolesRadioGroupProps {
    roles: IAccessRole[];
}

export default function KontrollAccessRolesRadioGroup({ roles }: AccessRolesRadioGroupProps) {
    const params = useParams();
    const navigate = useNavigate();
    const defaultRole = 'sa';
    const roleId = useMemo(() => params.id, [params.id]);

    const handleChangeSelectedRole = (role: string) => {
        navigate(role);
    };

    useEffect(() => {
        if (!roleId) {
            navigate(defaultRole);
        }
    }, []);

    return (
        <RadioGroup
            legend="Velg rolle"
            onChange={(val: string) => handleChangeSelectedRole(val)}
            value={roleId ?? defaultRole}>
            <VStack>
                {sortAndCapitalizeRoles(roles, true).map((role, index) => (
                    <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                        {role.name}
                    </Radio>
                ))}
            </VStack>
        </RadioGroup>
    );
}
