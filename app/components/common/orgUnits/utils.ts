import type {IUnitItem} from "~/data/types";

export const getAllTopLevelUnits = (orgUnitList: IUnitItem[]) => {
    return orgUnitList.filter(unit => unit.parentRef === unit.organisationUnitId)
}

export const getOrgUnitByChildrenRef = (orgUnitList: IUnitItem[], childrenRef: string[]): IUnitItem[] | null => {
    if (childrenRef.length === 0) return null
    return childrenRef
        .map(childId => orgUnitList.find(u => u.organisationUnitId === childId))
        .filter(Boolean) as IUnitItem[]
}

export const getUnitById = (orgUnitList: IUnitItem[], id: string): IUnitItem | null => {
    return orgUnitList.find(unit => unit.organisationUnitId === id) || null
}

const getAllChildren = (unit: IUnitItem, allOrgUnits: IUnitItem[]): IUnitItem[] => {
    const collectChildren = (currentUnit: IUnitItem, collected: IUnitItem[]): IUnitItem[] => {
        const children = allOrgUnits.filter(u => currentUnit.childrenRef.includes(u.organisationUnitId));
        return children.reduce((acc, child) => collectChildren(child, [...acc, child]), collected);
    };
    return collectChildren(unit, []);
};

export const getOrgUnitAndAllNestedChildren = (
    orgUnits: IUnitItem[],
    allOrgUnits: IUnitItem[]
) => {
    return orgUnits.flatMap(unit => [
        unit,
        ...getAllChildren(unit, allOrgUnits)
    ]);
}