import {IUnitItem} from "~/data/types";

export interface IResourceModuleUsersPage {
    totalItems: number;
    totalPages: number | any;
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
    roles?: IResourceModuleUserRole[] // Optional to allow use of same type
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
// ----