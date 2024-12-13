export const USERS = "/brukere"
export const getUserByIdUrl = (id: number, orgId: string | undefined): string => `/brukere/${id}/org/${orgId}`;
export const getUserNewAssignmentUrl = (id: number, orgId: string | undefined): string => `/bruker/${id}/org/${orgId}/ny-tildeling`;
export const getDeleteUserAssignmentUrl = (id: number, assignmentRef: number): string => `/brukere/${id}/tildelinger/${assignmentRef}/slett`;
export const getConfirmUserAssignmentUrl = (id: number, resourceId: number, orgId: string): string => `/bruker/${id}/ressurs/${resourceId}/org/${orgId}/tildel`;


export const ROLES = "/grupper"
export const getRoleMembersUrl = (id: number): string => `/grupper/${id}/medlemmer`;
export const getRoleAssignmentsUrl = (id: number): string => `/grupper/${id}/tildelinger`;
export const getDeleteRoleAssignmentUrl = (id: number, assignmentRef: number): string => `/grupper/${id}/tildelinger/${assignmentRef}/slett`;
export const getConfirmRoleAssignmentUrl = (id: number, resourceId: number, orgId: string): string => `/gruppe/${id}/ny-tildeling/ressurs/${resourceId}/org/${orgId}/tildel`;
export const getRoleNewAssignmentUrl = (id: number): string => `/gruppe/${id}/ny-tildeling`;


export const RESOURCES = "/ressurser"
export const getResourceUserAssignmentsUrl = (id: number): string => `/ressurser/${id}/bruker-tildelinger`;
export const getResourceRoleAssignmentsUrl = (id: number): string => `/ressurser/${id}/gruppe-tildelinger`;
export const getResourceDeleteUserAssignmentUrl = (id: number, assignmentRef: number): string => `/ressurser/${id}/bruker-tildelinger/${assignmentRef}/slett`;
export const getResourceDeleteRoleAssignmentUrl = (id: number, assignmentRef: number | undefined): string => `/ressurser/${id}/gruppe-tildelinger/${assignmentRef}/slett`;
export const getResourceNewAssignmentUrl = (id: number): string => `/ressurs/${id}/ny-tildeling`;
export const getResourceNewUserAssignmentUrl = (id: number): string => `/ressurs/${id}/ny-tildeling/brukere`;
export const getResourceNewRoleAssignmentUrl = (id: number): string => `/ressurs/${id}/ny-tildeling/grupper`;
export const getResourceConfirmUserAssignmentUrl = (id: number, userId: number, orgId: string): string => `/ressurs/${id}/ny-tildeling/brukere/${userId}/org/${orgId}/tildel`;
export const getResourceConfirmRoleAssignmentUrl = (id: number, roleId: number, orgId: string): string => `/ressurs/${id}/ny-tildeling/grupper/${roleId}/org/${orgId}/tildel`;


export const SETTINGS = "/innstillinger"

export const SETTINGS_APPLICATION_CATEGORY = "/innstillinger/applikasjonskategori"
export const SETTINGS_APPLICATION_CATEGORY_CREATE = "/innstillinger/applikasjonskategori/rediger"
export const getApplicationCategoryEditUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/rediger`;
export const getApplicationCategoryDeleteUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/slett`;

export const SETTINGS_USER_TYPES = "/innstillinger/brukertyper"
export const getEditUserTypeUrl = (id: number): string => `/innstillinger/brukertyper/${id}/rediger`;

export const SETTINGS_LICENSE_MODEL = "/innstillinger/lisensmodeller"
export const SETTINGS_LICENSE_MODEL_CREATE = "/innstillinger/lisensmodeller/rediger"
export const getLicenseModelEditUrl = (id: number): string => `/innstillinger/lisensmodeller/${id}/rediger`;
export const getLicenseModelDeleteUrl = (id: number): string => `/innstillinger/lisensmodeller/${id}/slett`;

export const SETTINGS_LICENSE_ENFORCEMENT = "/innstillinger/haandhevingstyper"
export const getEditLicenceEnforcement = (id: number): string => `/innstillinger/haandhevingstyper/${id}/rediger`;
