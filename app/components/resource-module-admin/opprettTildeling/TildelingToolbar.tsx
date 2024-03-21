import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";

interface TildelingToolbarProps {
    allOrgUnits: IUnitItem[]
    accessRoles: IResourceModuleAccessRole[]
}
const TildelingToolbar = ({allOrgUnits, accessRoles}: TildelingToolbarProps) => {
    return (
        <>
            <div className={"toolbar"}>
                <OrgUnitFilterModal orgUnitList={allOrgUnits} />
                <ResourceModuleSearch />
            </div>
            <ResourceModuleRoleFilter roles={accessRoles} />
        </>
    )
}

export default TildelingToolbar