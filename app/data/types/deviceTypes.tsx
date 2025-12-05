export interface IDeviceGroup {
    id?: number;
    name: string;
    systemId: string;
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
    devices: IDeviceGroup[];
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
}

export interface IDeviceItemList {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    size: string;
    deviceItems: IDeviceItem[];
}
