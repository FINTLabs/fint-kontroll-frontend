export const USERS = '/brukere';
export const getUserByIdUrl = (id: number, orgId: string | undefined): string =>
    `/brukere/${id}/org/${orgId}`;
export const getUserNewAssignmentUrl = (id: number, orgId: string | undefined): string =>
    `/bruker/${id}/org/${orgId}/ny-tildeling`;
export const getDeleteUserAssignmentUrl = (id: number, assignmentRef: number): string =>
    `/brukere/${id}/tildelinger/${assignmentRef}/slett`;
export const getConfirmUserAssignmentUrl = (
    id: number,
    resourceId: number,
    orgId: string
): string => `/bruker/${id}/ressurs/${resourceId}/org/${orgId}/tildel`;

export const ROLES = '/grupper';
export const getRoleMembersUrl = (id: number): string => `/grupper/${id}/medlemmer`;
export const getRoleAssignmentsUrl = (id: number): string => `/grupper/${id}/tildelinger`;
export const getDeleteRoleAssignmentUrl = (id: number, assignmentRef: number): string =>
    `/grupper/${id}/tildelinger/${assignmentRef}/slett`;
export const getConfirmRoleAssignmentUrl = (
    id: number,
    resourceId: number,
    orgId: string
): string => `/gruppe/${id}/ny-tildeling/ressurs/${resourceId}/org/${orgId}/tildel`;
export const getRoleNewAssignmentUrl = (id: number): string => `/gruppe/${id}/ny-tildeling`;

export const DEVICES = '/digitale-enheter';
export const getDeviceGroupByIdUrl = (id: number): string => `/digitale-enheter/${id}/info`;
export const getDeviceGroupNewAssignmentUrl = (id: number): string =>
    `/digitale-enheter/${id}/ny-tildeling`;

export const RESOURCES = '/ressurser';
export const getResourceUserAssignmentsUrl = (id: number): string =>
    `/ressurser/${id}/bruker-tildelinger`;
export const getResourceRoleAssignmentsUrl = (id: number): string =>
    `/ressurser/${id}/gruppe-tildelinger`;
export const getResourceDeleteUserAssignmentUrl = (id: number, assignmentRef: number): string =>
    `/ressurser/${id}/bruker-tildelinger/${assignmentRef}/slett`;
export const getResourceDeleteRoleAssignmentUrl = (
    id: number,
    assignmentRef: number | undefined
): string => `/ressurser/${id}/gruppe-tildelinger/${assignmentRef}/slett`;
export const getResourceNewAssignmentUrl = (id: number): string => `/ressurs/${id}/ny-tildeling`;
export const getResourceNewUserAssignmentUrl = (id: number): string =>
    `/ressurs/${id}/ny-tildeling/brukere`;
export const getResourceNewRoleAssignmentUrl = (id: number): string =>
    `/ressurs/${id}/ny-tildeling/grupper`;
export const getResourceConfirmUserAssignmentUrl = (
    id: number,
    userId: number,
    orgId: string
): string => `/ressurs/${id}/ny-tildeling/brukere/${userId}/org/${orgId}/tildel`;
export const getResourceConfirmRoleAssignmentUrl = (
    id: number,
    roleId: number,
    orgId: string
): string => `/ressurs/${id}/ny-tildeling/grupper/${roleId}/org/${orgId}/tildel`;

export const SYSTEM_ADMIN_DEFINE_ROLE = '/system-admin/definer-rolle/sa';
export const SYSTEM_ADMIN_FEATURE_TO_ROLE = '/system-admin/knytt-rettigheter-til-rolle/sa';
export const getDefineRoleByIdUrl = (id: string | undefined): string =>
    `/system-admin/definer-rolle/${id}`;

export const RESOURCE_ADMIN = '/ressurs-admin';
export const RESOURCE_ADMIN_CREATE_ROLE_ASSIGNMENT = '/ressurs-admin/opprett-ny-tildeling';
export const getAdministerRoleByIdUrl = (id: string | undefined): string =>
    `/ressurs-admin/administrer/${id}`;

export const SERVICE_ADMIN = '/tjeneste-admin/ressurser';
export const SERVICE_ADMIN_NEW_APPLICATION_RESOURCE_CREATE =
    '/tjeneste-admin/opprett-ny-applikasjonsressurs';
export const getResourceByIdUrl = (id: number | null): string => `/tjeneste-admin/ressurs/${id}`;
export const getEditResourceUrl = (id: number | undefined): string =>
    `/tjeneste-admin/rediger/ressurs/${id}`;
export const getEditValidForOrgUnitsUrl = (id: number | undefined): string =>
    `/tjeneste-admin/rediger/org-enheter/ressurs/${id}`;
export const getDeleteResourceUrl = (id: number | null): string =>
    `/tjeneste-admin/ressurser/${id}/slett`;

export const SETTINGS = '/innstillinger';

export const SETTINGS_APPLICATION_CATEGORY = '/innstillinger/applikasjonskategori';
export const SETTINGS_APPLICATION_CATEGORY_CREATE = '/innstillinger/applikasjonskategori/rediger';
export const getApplicationCategoryEditUrl = (id: number): string =>
    `/innstillinger/applikasjonskategori/${id}/rediger`;
export const getApplicationCategoryDeleteUrl = (id: number): string =>
    `/innstillinger/applikasjonskategori/${id}/slett`;

export const SETTINGS_USER_TYPES = '/innstillinger/brukertyper';
export const getEditUserTypeUrl = (id: number): string =>
    `/innstillinger/brukertyper/${id}/rediger`;

export const SETTINGS_LICENSE_MODEL = '/innstillinger/lisensmodeller';
export const SETTINGS_LICENSE_MODEL_CREATE = '/innstillinger/lisensmodeller/rediger';
export const getLicenseModelEditUrl = (id: number): string =>
    `/innstillinger/lisensmodeller/${id}/rediger`;
export const getLicenseModelDeleteUrl = (id: number): string =>
    `/innstillinger/lisensmodeller/${id}/slett`;

export const SETTINGS_LICENSE_ENFORCEMENT = '/innstillinger/haandhevingstyper';
export const getEditLicenceEnforcement = (id: number): string =>
    `/innstillinger/haandhevingstyper/${id}/rediger`;
