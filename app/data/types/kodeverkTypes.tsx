export interface IKodeverkCustomListItem {
    id: number;
    name: string;
    description: string;
    category: string;
}

export type IKodeverkApplicationCategory = IKodeverkCustomListItem;
export type IKodeverkLicenseModel = IKodeverkCustomListItem;

export interface IKodeverkMappingList {
    id: number;
    fkLabel: string;
    label: string;
}

export type IKodeverkUserType = IKodeverkMappingList;
export type IKodeverkLicenceEnforcement = IKodeverkMappingList;

export interface IKodeverkLicenseEnforcement {
    id: number;
    fkLabel: string;
    label: string;
}
