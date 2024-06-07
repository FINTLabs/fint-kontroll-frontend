import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {HelpText} from "@navikt/ds-react";
import ChipsFilters from "~/components/common/ChipsFilters";

interface TildelingToolbarProps {
    allOrgUnits: IUnitItem[]
    accessRoles: IResourceModuleAccessRole[]
}
const TildelingToolbar = ({allOrgUnits, accessRoles}: TildelingToolbarProps) => {
    return (
        <>
            <div className={"toolbar"}>
                <div className={"org-unit-filter-with-help-text"}>
                    <OrgUnitFilterModal orgUnitList={allOrgUnits} />
                    <HelpText>Dette er kun filter for brukerens tilhørighet. Må ikke forveksles med orgenhetstildelingen.</HelpText>
                </div>
                <ResourceModuleSearch />
            </div>
            <ResourceModuleRoleFilter roles={accessRoles} />
            <ChipsFilters />
        </>
    )
}

export default TildelingToolbar