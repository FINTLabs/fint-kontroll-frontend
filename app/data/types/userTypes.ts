export interface IMeRole {
    id: string;
    name: string;
}

export interface IMenuItem {
    id?: number;
    url: string;
    text: string;
    sortOrder: number;
}

export interface IMeInfo {
    firstName: string;
    lastName: string;
    organisationId: string;
    mail: string;
    roles: IMeRole[];
    menuItems: IMenuItem[];
}

export interface IUser {
    assigneeRef: number;
    assigneeFirstName: string;
    assigneeLastName: string;
    assigneeUsername: string;
    assigneeUserType: string;
    assigneeOrganisationUnitId: string;
    assigneeOrganisationUnitName: string;
    assignmentRef: number;
    directAssignment: boolean;
    assignmentViaRoleRef: number;
    assignmentViaRoleName: string;
    assignerUsername: string;
    assignerDisplayname: string;
    deletableAssignment: boolean;
    assigned?: boolean;
    roles?: IUserRole[]; // Optional to allow use of same type
}

// -----------------------
export interface IUserRole {
    roleId: string;
    roleName: string;
    scopes: IScope[]; // Optional to allow use of same type
}

export interface IScope {
    objectType: string;
    orgUnits: IOrgUnitForScope[];
    scopeId: string;
}

export interface IOrgUnitForScope {
    name: string;
    orgUnitId: string;
    shortName: string;
}

// -----------------------
export interface IUserPage {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: string;
    users: IUserItem[];
}

export interface IUserItem {
    id: number;
    fullName: string;
    organisationUnitName: string;
    organisationUnitId: string;
    userType: string;
    userName: string;
    assigned?: boolean;
    validOrgUnits?: string[];
}

export interface IUserDetails {
    id: number;
    fullName: string;
    userName: string;
    organisationUnitName: string;
    organisationUnitId: string;
    mobilePhone: string;
    email: string;
    userType: string;
    valid: boolean;
}

export interface IRole {
    id: number;
    roleName: string;
    roleType: string;
    assignmentRef?: number;
    assignerUsername?: string;
    assignerDisplayname?: string;
    organisationUnitId: string;
    organisationUnitName: string;
    aggregatedRole: boolean;
    assigned?: boolean;
    validOrgUnits?: string[];
}

export interface IRoleList {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    roles: IRole[];
}

export interface IMemberPage {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: number;
    members: IMemberItem[];
}

export interface IMemberItem {
    id: number;
    firstName: string;
    lastName: string;
    userType: string;
    userName?: null;
}

// THIS
export interface IAssignedUsers {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: string;
    users: IUser[];
}

export interface IAssignedRoles {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    roles: IRole[];
}

export interface IAccessRole {
    accessRoleId: string;
    name: string;
    menuItems?: IMenuItem[];
}

// PermissionData is a role and its subsequent mapping to features and operation sets
export interface IPermissionData {
    accessRoleId: string;
    features: IFeatureOperation[];
}

export interface IFeatureOperation {
    featureId: number;
    featureName: string;
    operations: string[];
}

// Features reside in a Role, but not as part of its type from the API
export interface IFeature {
    name: string;
    id: string;
    path: string;
}
