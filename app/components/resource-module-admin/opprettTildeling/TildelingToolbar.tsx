import OrgUnitFilterModal from '~/components/org-unit-filter/OrgUnitFilterModal';
import { HStack, Label, VStack } from '@navikt/ds-react';
import ChipsFilters from '~/components/common/filter/ChipsFilters';
import AllAccessRolesFilter from '~/components/resource-module-admin/AllAccessRolesFilter';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { IAccessRole } from '~/data/types/userTypes';
import { Search } from '~/components/common/Search';
import React from 'react';

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
                <Search label="Søk etter brukere" id={'search-user-role'} />
            </HStack>
            <ChipsFilters />
        </VStack>
    );
};

export default TildelingToolbar;
