import { Select } from '@navikt/ds-react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import { sortAndCapitalizeRoles } from '~/components/common/CommonFunctions';
import { IAccessRole } from '~/data/types/userTypes';

interface AccessRolesRadioGroupProps {
    roles: IAccessRole[];
}

export default function KontrollAccessRolesSelect({ roles }: AccessRolesRadioGroupProps) {
    const params = useParams();
    const roleProp = params.id;
    const navigate = useNavigate();

    const sortedRoles = useMemo(() => sortAndCapitalizeRoles(roles, true), [roles]);

    const handleChangeSelectedRole = (role: string) => {
        navigate(role);
    };

    useEffect(() => {
        !roleProp ? navigate(sortedRoles[0].accessRoleId) : '';
    }, []);

    return (
        <Select
            label="Velg rolle"
            onChange={(e) => handleChangeSelectedRole(e.target.value)}
            value={roleProp ? roleProp : ''}>
            {sortedRoles.map((role, index) => (
                <option key={role.accessRoleId + index} value={role.accessRoleId}>
                    {role.name}
                </option>
            ))}
        </Select>
    );
}
