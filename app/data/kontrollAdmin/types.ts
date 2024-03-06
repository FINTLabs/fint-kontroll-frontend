export interface IRole {
    accessRoleId: string
    name: string
}

// PermissionData is a role and its subsequent mapping to features and operation sets
export interface IPermissionData {
    accessRoleId: string
    features: IFeatureOperation[]
}

export interface IFeatureOperation {
    featureId: number
    featureName: string
    operations: string[]
}

// Features reside in a Role, but not as part of its type from the API
export interface IFeature {
    name: string
    id: string
    path: string
}