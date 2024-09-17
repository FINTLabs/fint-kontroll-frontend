import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {HelpText, HStack} from "@navikt/ds-react";
import ChipsFilters from "~/components/common/ChipsFilters";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";

interface TildelingToolbarProps {
    allOrgUnits: IUnitItem[]
    accessRoles: IResourceModuleAccessRole[]
}
const TildelingToolbar = ({allOrgUnits, accessRoles}: TildelingToolbarProps) => {
    return (
        <>
            <HStack className={"toolbar"} align={'end'} justify={'space-between'}>
                <div className={"org-unit-filter-with-help-text"}>
                    <OrgUnitFilterModal orgUnitList={allOrgUnits} />
                    <HelpText>Dette er kun filter for brukerens tilhørighet. Må ikke forveksles med orgenhetstildelingen.</HelpText>
                </div>
                <ResourceModuleRoleFilter roles={accessRoles}/>
                <ResourceModuleSearch/>
            </HStack>
            <ChipsFilters/>
        </>
    )
}

export default TildelingToolbar