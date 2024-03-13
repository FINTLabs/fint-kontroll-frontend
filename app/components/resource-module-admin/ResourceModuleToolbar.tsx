import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import ResourceModuleRoleFilter from "~/components/resource-module-admin/ResourceModuleRoleFilter";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";

interface ToolbarProps {
    orgUnitList: IUnitItem[]
    roles: IResourceModuleAccessRole[]
}
const ResourceModuleToolbar = ({orgUnitList, roles}: ToolbarProps) => {
    return (
        <div className={"resource-module-toolbar"}>
            <section className={"resource-module-toolbar-top"}>
                <OrgUnitFilterModal orgUnitList={orgUnitList} />
                <ResourceModuleSearch />
            </section>
            <ResourceModuleRoleFilter roles={roles} />
        </div>
    )
}

export default ResourceModuleToolbar