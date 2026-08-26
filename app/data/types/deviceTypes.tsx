export interface IDeviceGroup {
    id: number;
    name: string;
    sourceId: string;
    organisationUnitName: string;
    orgUnitId: string;
    deviceType: string;
    platform: string;
    createdDate: Date;
    modifiedDate: Date;
    noOfMembers: number;
    assignmentRef: number;
    assigned?: boolean;
}

export interface IDeviceGroupList {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: string;
    deviceGroups: IDeviceGroup[];
}

export interface IDeviceItem {
    id?: number;
    name: string;
    serialNumber: string;
    organisationUnitName: string;
    organisationUnitId: string;
    systemId: string;
    deviceType: string;
    platform: string;
    status: string;
    isShared: boolean;
}

export interface IDeviceItemList {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: string;
    members: IDeviceItem[];
}

export interface IAssignedDevices {
    totalElements: number;
    totalPages?: number;
    currentPage: number;
    deviceGroupAssignments: IDeviceGroup[];
}
