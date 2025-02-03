import OrgUnitFilterModal from '~/components/org-unit-filter/OrgUnitFilterModal';
import ResourceModuleSearch from '~/components/resource-module-admin/ResourceModuleSearch';
import { HelpText, HStack } from '@navikt/ds-react';
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
        <>
            <HStack className={'toolbar'} align={'end'} justify={'space-between'}>
                <div className={'org-unit-filter-with-help-text'}>
                    <OrgUnitFilterModal orgUnitList={allOrgUnits} />
                    <HelpText>
                        Dette er kun filter for brukerens tilhørighet. Må ikke forveksles med
                        org.enhetstildelingen.
                    </HelpText>
                </div>
                <AllAccessRolesFilter roles={accessRoles} />
                <ResourceModuleSearch />
            </HStack>
            <ChipsFilters />
        </>
    );
};

export default TildelingToolbar;
