import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import {HelpText} from "@navikt/ds-react";

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
                    <HelpText>Dette er kun for filter når du skal velge en bruker. Må ikke forveksles med orgenhetstildelingen i seg selv.</HelpText>
                </div>
                <ResourceModuleSearch />
            </div>
            <ResourceModuleRoleFilter roles={accessRoles} />
        </>
    )
}

export default TildelingToolbar