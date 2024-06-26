export interface IAssignment {
    user: IUser | null
    accessRoleId: string
    scopeId: number
    orgUnits: IOrgUnit[]
}

export interface IOrgUnit {
    id: number
    name: string
    organisationUnitId: string
    parentRef: string
    parentName: null | string
    childrenRef: string[]
}

export interface IMeInfo {
    firstName: string
    lastName: string
    organisationId: string
    mail: string
}

export interface IUser {
    assigneeRef: number
    assigneeFirstName: string
    assigneeLastName: string
    assigneeUserName: string
    assigneeUserType: string
    assigneeOrganisationUnitId: string
    assigneeOrganisationUnitName: string
    assignmentRef: number
    directAssignment: boolean
    assignmentViaRoleRef: number
    assignmentViaRoleName: string
    assignerUsername: string
    assignerDisplayname: string
    assigned?: boolean
    roles?: IUserRole[] // Optional to allow use of same type
}

// -----------------------
export interface IUserRole {
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

// -----------------------
export interface IUserPage {
    totalItems: number
    totalPages?: number | any
    currentPage: number
    size: string
    users: IUserItem[]

}

export interface IUserItem {
    id: number
    fullName: string
    organisationUnitName: string
    organisationUnitId: string
    userType: string
    assigned?: boolean
}

export interface IUserDetails {
    id: number
    fullName: string
    userName: string
    organisationUnitName: string
    mobilePhone: string
    email: string
    valid: boolean
}

export interface IRole {
    id: number
    roleName: string
    roleType: string
    assignmentRef: number
    assignerUsername: string
    assignerDisplayname: string
    organisationUnitId: string
    organisationUnitName: string
    assigned: boolean
}

export interface IRoleItem {
    id: number
    roleName: string
    roleType: string
    roleSubType: string
    aggregatedRole: boolean
    organisationUnitId: string
    organisationUnitName: string
}

export interface IRolePage {
    totalItems: number
    totalPages: number | any
    currentPage: number
    roles: IRole[] //IRoleItem[]
}

export interface IMemberPage {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: number
    members: IMemberItem[]
}

export interface IMemberItem {
    id: number
    firstName: string
    lastName: string
    userType: string
    userName?: null
}

export interface IAssignmentPage {
    totalItems: number
    totalPages: number | any
    currentPage: number
    resources: IResource[]
}

export interface IAssignedUsers {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: string
    users: IUser[]
}

export interface IAssignedResources {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: string
    resources: IResource[]
}

export interface IAssignedRoles {
    totalItems: number
    totalPages: number | any
    currentPage: number
    roles: IRole[]
}

export interface IResourceItem {
    id: number
    resourceId: string
    orgunitId: string
    orgUnitName: string
    resourceLimit: number
}

export interface IResource {
    id: number // Just the element of "id" is listed when not a part of assignment
    resourceRef: number
    identityProviderGroupName: string
    resourceName: string
    resourceType: string
    resourceLimit: number
    applicationAccessType: string
    applicationAccessRole: string
    accessType: string
    applicationCategory: string
    platform: []
    resourceOwnerOrgUnitId: string
    resourceOwnerOrgUnitName: string
    validForOrgUnits: IResourceItem[]
    validForRoles: string[]
    assigneeRef: number
    assignmentViaRoleRef: string
    assignmentViaRoleName: string
    assignmentRef: number
    directAssignment: boolean
    assignerUsername: string
    assignerDisplayname: string
    assigned?: boolean
    hasCost: boolean
}

export interface IResourcePage {
    totalItems: number
    totalPages: number | any
    currentPage: number
    resources: IResource[]
}

export type IResponse<T> = {
    data: T
    errorMessage: string | undefined
}

export interface IUnitItem {
    id: number
    name: string
    organisationUnitId: string
    parentName: string | null
    parentRef: string
    childrenRef: string[]
    isChecked?: boolean // Optional to be used in Tildel Rettigheter tab. Not required in most other places, but feel free to use if necessary.
}

export interface IUnitTree {
    totalItems: number
    totalPages: number | any
    currentPage: number
    orgUnits: IUnitItem[]
}

// General cookie interface
export interface ICookie {
    key: string
    value: string
}