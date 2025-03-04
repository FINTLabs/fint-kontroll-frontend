import OrgUnitFilterModal from '~/components/org-unit-filter/OrgUnitFilterModal';
import ResourceModuleSearch from '~/components/resource-module-admin/ResourceModuleSearch';
import { HStack, Label, VStack } from '@navikt/ds-react';
import ChipsFilters from '~/components/common/ChipsFilters';
import AllAccessRolesFilter from '~/components/resource-module-admin/AllAccessRolesFilter';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { IAccessRole } from '~/data/types/userTypes';

interface TildelingToolbarProps {
    allOrgUnits: IUnitItem[];
    accessRoles: IAccessRole[];
}

const TildelingToolbar = ({ allOrgUnits, accessRoles }: TildelingToolbarProps) => {
    return (
        <VStack gap={'2'}>
            <HStack className={'filters'} gap={'4'} justify="end" align="end">
                <VStack gap={'2'}>
                    <Label>Filter på tilhørighet</Label>
                    <OrgUnitFilterModal orgUnitList={allOrgUnits} />
                </VStack>
                <AllAccessRolesFilter roles={accessRoles} />
                <ResourceModuleSearch />
            </HStack>
            <ChipsFilters />
        </VStack>
    );
};

export default TildelingToolbar;
