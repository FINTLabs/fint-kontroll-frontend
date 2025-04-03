import { IMenuItem } from '~/data/types/userTypes';

type NestedMenuItem = IMenuItem & { children: IMenuItem[] };

export const groupMenuItems = (menuItems: IMenuItem[]): (IMenuItem | NestedMenuItem)[] => {
    const groupedItems: (IMenuItem | NestedMenuItem)[] = [];
    let currentGroup: NestedMenuItem | null = null;

    menuItems
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach((item) => {
            if (!item.url) {
                if (currentGroup) {
                    groupedItems.push(currentGroup);
                }
                currentGroup = { ...item, children: [] };
            } else if (currentGroup) {
                currentGroup.children?.push(item);
            } else {
                groupedItems.push(item);
            }
        });

    if (currentGroup) {
        groupedItems.push(currentGroup);
    }

    return groupedItems;
};
