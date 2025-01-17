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
    organisationUnitId: string
    mobilePhone: string
    email: string
    userType: string
    valid: boolean
}

export interface IRole {
    id: number
    roleName: string
    roleType: string
    assignmentRef?: number
    assignerUsername?: string
    assignerDisplayname?: string
    organisationUnitId: string
    organisationUnitName: string
    assigned?: boolean
}

export interface IRoleList {
    totalItems: number
    totalPages: number | any
    currentPage: number
    roles: IRole[]
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
    resources: IResourceAssignment[]
}

export interface IAssignedUsers {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: string
    users: IUser[]
}

export interface IAssignedResourcesList {
    totalItems: number
    totalPages: number | any
    currentPage: number
    size: string
    resources: IResourceAssignment[]
}

export interface IAssignedRoles {
    totalItems: number
    totalPages: number | any
    currentPage: number
    roles: IRole[]
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

export interface IUnitItem {
    id: number
    name: string
    organisationUnitId: string
    parentName: string | null
    parentRef: string
    childrenRef: string[]
    isChecked?: boolean // Optional to be used in Tildel Rettigheter tab. Not required in most other places, but feel free to use if necessary.
    limit?: number
}

export interface IUnitTree {
    totalItems: number
    totalPages: number | any
    currentPage: number
    orgUnits: IUnitItem[]
}

export interface IKodeverkCustomListItem {
    id: number
    name: string
    description: string
    category: string
}

export type IKodeverkApplicationCategory = IKodeverkCustomListItem
export type IKodeverkLicenseModel = IKodeverkCustomListItem

// General cookie interface
export interface ICookie {
    key: string
    value: string
}

export interface IKodeverkMappingList {
    id: number
    fkLabel: string
    label: string
}

export type IKodeverkUserType = IKodeverkMappingList
export type IKodeverkLicenceEnforcement = IKodeverkMappingList

export interface IKodeverkLicenseEnforcement {
    id: number
    fkLabel: string
    label: string
}

export interface BreadcrumbParams {
    params: { id: string }
}