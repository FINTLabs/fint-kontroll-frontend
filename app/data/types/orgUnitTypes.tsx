export interface IUnitItem {
    id: number;
    name: string;
    organisationUnitId: string;
    parentName: string | null;
    parentRef: string;
    childrenRef: string[];
    isChecked?: boolean; // Optional to be used in Tildel Rettigheter tab. Not required in most other places, but feel free to use if necessary.
    limit?: number | null;
}

export interface IUnitTree {
    totalItems: number;
    totalPages?: number;
    currentPage: number;
    orgUnits: IUnitItem[];
}
