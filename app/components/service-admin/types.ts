export interface IApplicationResource {
    id?: number;
    resourceId: string;
    resourceName: string;
    resourceType: string;
    platform: string[];
    accessType: string;
    resourceLimit: number;
    resourceOwnerOrgUnitId: string;
    resourceOwnerOrgUnitName: string;
    validForOrgUnits: IValidForOrgUnits[];
    validForRoles: string[];
    applicationCategory: string[];
    hasCost: boolean;
    licenseEnforcement: string;
    unitCost: number;
    status: string;
}

export interface IValidForOrgUnits {
    resourceId: string;
    resourceRef: number;
    orgUnitId: string;
    orgUnitName: string;
    resourceLimit?: number;
    isChecked?: boolean;
}
