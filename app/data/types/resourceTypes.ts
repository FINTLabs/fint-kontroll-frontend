import {IUnitItem} from "~/data/types/orgUnitTypes";

export interface IResourceModuleUsersPage {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    size: string;
    users: IResourceModuleUser[];
}

export interface IResourceModuleAssignment {
    user: IResourceModuleUser | null // The name with ID is because of the api spec
    accessRoleId: string
    scopeId: number
    orgUnits: IUnitItem[] // The name with IDs is because of the api spec
    includeSubOrgUnits: boolean
}

export interface IResourceModuleUser {
    resourceId: string
    firstName: string
    lastName: string
    userType: string
    userName: string
    roles: IResourceModuleUserRole[]
}

export interface IResourceModuleUserRole {
    roleId: string
    roleName: string
    scopes: IScope[] // Optional to allow use of same type
}

export interface IScope {
    objectType: string
    orgUnits: IOrgUnitForScope[]
    scopeId: string
}

export interface IOrgUnitForScope {
    name: string
    orgUnitId: string
    shortName: string
}

export interface IResourceModuleAccessRole {
    accessRoleId: string
    name: string
}

// Used for a User's tildelingsadministrasjon page
export interface IResourceModuleUserAssignmentsPaginated {
    totalItems: number
    totalPages: number
    currentPage: number
    accessRoles: IResourceModuleUserDetail[]
}
export interface IResourceModuleUserDetail {
    accessRoleId: string
    accessRoleName: string
    orgUnits: IResourceModuleOrgUnitDetail[]
}
export interface IResourceModuleOrgUnitDetail {
    scopeId: number
    objectType: string
    orgUnitId: string
    name: string
}

export interface IAssignmentPage {
    totalItems: number
    totalPages: number | any
    currentPage: number
    resources: IResourceAssignment[]
}

export interface IAssignedResourcesList {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: string
    resources: IResourceAssignment[]
}

export interface IResourceList {
    totalItems: number
    totalPages: number | any
    currentPage: number
    resources: IResourceForList[]
}

export interface IResourceForList {
    id: number
    resourceId: string
    resourceName: string
    resourceType: string
    resourceLimit: number
    identityProviderGroupObjectId: string
    applicationCategory: string[]
    assigned?: boolean
}

export interface IResourceItem {
    id: number
    resourceId: string
    orgUnitId: string
    orgUnitName: string
    resourceLimit: number
}

export interface IResourceAdminItem {
    id: number
    resourceId: string
    resourceName: string
    resourceType: string
    resourceLimit: number
    status: string
    identityProviderGroupObjectId: string
    applicationCategory: string[]
}

export interface IResourceAdminList {
    totalItems: number
    totalPages: number | any
    currentPage: number
    resources: IResourceAdminItem[]
}

export interface IResource {
    id: number
    resourceId: string
    resourceRef: number
    identityProviderGroupName: string
    resourceName: string
    resourceType: string
    resourceLimit: number
    applicationAccessType: string
    applicationAccessRole: string
    accessType: string
    applicationCategory: string[]
    platform: []
    resourceOwnerOrgUnitId: string
    resourceOwnerOrgUnitName: string
    validForOrgUnits: IResourceItem[]
    validForRoles: string[]
    assigned?: boolean
    licenseEnforcement: string
    hasCost: boolean
    unitCost: number
    status: string
}

// ----
export interface IResourceAssignment {
    assigneeRef: number
    assignmentRef: number
    directAssignment: boolean
    assignmentViaRoleRef: number
    assignmentViaRoleName: string
    assignerUsername: string
    assignerDisplayname: string
    resourceRef: number
    resourceName: string
    resourceType: string
    assigned?: boolean
}