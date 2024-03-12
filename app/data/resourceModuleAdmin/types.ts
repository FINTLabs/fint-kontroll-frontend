export interface IResourceModuleUsersPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: string;
    users: IResourceModuleUser[];
}

export interface IResourceModuleUser {
    id: number
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