import { Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { IAccessRole } from '~/data/types/userTypes';

import { sortAndCapitalizeRoles } from '~/utils/translators';

interface ChooseAccessRoleProps {
    accessRoles: IAccessRole[];
    setNewAccessRole: (accessRoleId: string) => void;
}

const ChooseAccessRole = ({ accessRoles, setNewAccessRole }: ChooseAccessRoleProps) => {
    return (
        <RadioGroup legend={'Velg aksessrolle'} onChange={setNewAccessRole} size={'small'}>
            <VStack>
                {sortAndCapitalizeRoles(accessRoles, true).map((accessRole, index) => (
                    <Radio key={accessRole.accessRoleId} value={accessRole.accessRoleId}>
                        {accessRole.name}
                    </Radio>
                ))}
            </VStack>
        </RadioGroup>
    );
};
export default ChooseAccessRole;
