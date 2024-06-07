export interface INewResource {
    resourceName: string
    resourceDescription: string
    validFrom: Date
    validTo: Date
    costPerUse: number
    needsApprovalFromSupervisor: boolean
    numberOfLicenses: number
}