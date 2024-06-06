export interface INewResource {
    resourceName: string
    resourceDescription: string
    validFrom: string
    validTo: string
    costPerUse: number
    needsApprovalFromSupervisor: boolean
    numberOfLicenses: number
}