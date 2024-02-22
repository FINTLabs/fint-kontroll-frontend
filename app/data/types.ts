export interface IMeInfo {
    "firstName": string;
    "lastName": string;
    "organisationId": string;
    "mail": string;
}

export interface IUser {
    "id": number;
    "firstName": string;
    "lastName": string;
    "userType": string;
    "assignmentRef": number;
    "assignerUsername": string;
    "assignerDisplayname": string;
    "organisationUnitId": string;
    "organisationUnitName": string;
}

export interface IUserItem {
    "id": number;
    "fullName": string;
    "organisationUnitName": string;
    "organisationUnitId": string;
    "userType": string;
}

export interface IUserPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: string;
    users: IUserItem[];
}

export interface IRole {
    "id": number;
    "roleName": string;
    "roleType": string;
    "assignmentRef": number;
    "assignerUsername": string;
    "assignerDisplayname": string;
    "organisationUnitId": string,
    "organisationUnitName": string,
}

export interface IRoleItem {
    "id": number,
    "roleName": string,
    "roleType": string,
    "roleSubType": string,
    "aggregatedRole": boolean,
    "organisationUnitId": string,
    "organisationUnitName": string,
}

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRoleItem[];
}

export interface IMemberPage {
    totalItems: number;
    totalPages: number | any;
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

export interface IAssignmentPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    resources: IResource[];
}

export interface IAssignedUsers {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: string;
    users: IUser[];
}

export interface IAssignedRoles {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRole[];
}

export interface IResourceItem {
    id: number;
    resourceId: string;
    orgunitId: string;
    orgUnitName: string;
    resourceLimit: number;
}

export interface IResource {
    id: number;
    resourceId: string;
    identityProviderGroupName: string;
    resourceName: string;
    resourceType: string;
    resourceLimit: number;
    applicationAccessType: string;
    applicationAccessRole: string;
    accessType: string;
    "platform": [],
    "resourceOwnerOrgUnitId": string,
    "resourceOwnerOrgUnitName": string,
    validForOrgUnits: IResourceItem[];
    validForRoles: string;
    "assignerUsername": string;
    "assignerDisplayname": string;
}

export interface IResourcePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    resources: IResource[];
}

export type IResponse<T> = {
    data: T;
    errorMessage: string | undefined;
}