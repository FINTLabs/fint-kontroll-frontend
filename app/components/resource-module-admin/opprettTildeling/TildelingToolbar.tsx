import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceAdmin/types";
import {HelpText, HStack} from "@navikt/ds-react";
import ChipsFilters from "~/components/common/ChipsFilters";
import AllAccessRolesFilter from "~/components/resource-module-admin/AllAccessRolesFilter";

interface TildelingToolbarProps {
    allOrgUnits: IUnitItem[]
    accessRoles: IResourceModuleAccessRole[]
}

const TildelingToolbar = ({allOrgUnits, accessRoles}: TildelingToolbarProps) => {
    return (
        <>
            <HStack className={"toolbar"} align={'end'} justify={'space-between'}>
                <div className={"org-unit-filter-with-help-text"}>
                    <OrgUnitFilterModal orgUnitList={allOrgUnits}/>
                    <HelpText>Dette er kun filter for brukerens tilhørighet. Må ikke forveksles med
                        org.enhetstildelingen.</HelpText>
                </div>
                <AllAccessRolesFilter roles={accessRoles}/>
                <ResourceModuleSearch/>
            </HStack>
            <ChipsFilters/>
        </>
    )
}

export default TildelingToolbar