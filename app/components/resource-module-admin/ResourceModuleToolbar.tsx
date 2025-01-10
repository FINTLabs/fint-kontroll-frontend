import OrgUnitFilterModal from "~/components/org-unit-filter/OrgUnitFilterModal";
import {IUnitItem} from "~/data/types";
import ResourceModuleSearch from "~/components/resource-module-admin/ResourceModuleSearch";
import {IResourceModuleAccessRole} from "~/data/resourceAdmin/types";
import {HStack, VStack} from "@navikt/ds-react";
import React from "react";
import ChipsFilters from "~/components/common/ChipsFilters";
import AllAccessRolesFilter from "~/components/resource-module-admin/AllAccessRolesFilter";

interface ToolbarProps {
    orgUnitList: IUnitItem[]
    roles: IResourceModuleAccessRole[]
}

const ResourceModuleToolbar = ({orgUnitList, roles}: ToolbarProps) => {
    return (
        <VStack gap="4">
            <HStack justify={'end'} align="end" gap={"4"}>
                <OrgUnitFilterModal orgUnitList={orgUnitList}/>
                <AllAccessRolesFilter roles={roles}/>
                <ResourceModuleSearch/>
            </HStack>
            <HStack justify="end">
                <ChipsFilters/>
            </HStack>
        </VStack>
    )
}

export default ResourceModuleToolbar