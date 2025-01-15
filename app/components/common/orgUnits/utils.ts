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
    return Array.from(new Set(orgUnits.flatMap(unit => [
        unit,
        ...getAllChildren(unit, allOrgUnits)
    ])));
}

export const getAllParents = (selectedUnits: IUnitItem[], allOrgUnits: IUnitItem[]): IUnitItem[] => {
    const parentSet = new Set<IUnitItem>();

    const collectParents = (unit: IUnitItem): void => {
        const parent = allOrgUnits.find(u => u.organisationUnitId === unit.parentRef);
        if (parent && !parentSet.has(parent)) {
            parentSet.add(parent);
            collectParents(parent);
        }
    };

    selectedUnits.forEach(unit => collectParents(unit));
    return Array.from(parentSet);
};
