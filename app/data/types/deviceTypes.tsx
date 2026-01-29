export interface IDeviceGroup {
    id: number;
    name: string;
    sourceId: string;
    organisationUnitName: string;
    orgUnitId: string;
    deviceType: string;
    platform: string;
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
    deviceItems: IDeviceItem[];
}
