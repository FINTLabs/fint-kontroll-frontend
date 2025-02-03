import { IResourceModuleUserRole, IScope, IOrgUnitForScope } from '~/data/types/resourceTypes';
import { IAccessRole } from '~/data/types/userTypes';

const mockOrgUnitForScope: IOrgUnitForScope = {
    name: 'orgName',
    orgUnitId: '123',
    shortName: 'ON',
};

const mockScope: IScope = {
    objectType: 'org',
    orgUnits: [mockOrgUnitForScope],
    scopeId: '123',
};

export const mockIResourceModuleUserRole: IResourceModuleUserRole[] = [
    {
        roleId: 'ta',
        roleName: 'Tildeler',
        scopes: [mockScope],
    },
    {
        roleId: 'l',
        roleName: 'Leder',
        scopes: [mockScope],
    },
    {
        roleId: 'ta',
        roleName: 'TJENESTEADMINISTRATOR',
        scopes: [mockScope],
    },
    {
        roleId: 'ra',
        roleName: 'ressursadministrator',
        scopes: [mockScope],
    },
    {
        roleId: 'sb',
        roleName: 'sluttbruker',
        scopes: [mockScope],
    },
    {
        roleId: 'sa',
        roleName: 'systemadministrator',
        scopes: [mockScope],
    },
];

export const mockIAccessRole: IAccessRole[] = [
    {
        accessRoleId: 'ta',
        name: 'Tildeler',
    },
    {
        accessRoleId: 'ta',
        name: 'TJENESTEADMINISTRATOR',
    },
    {
        accessRoleId: 'sa',
        name: 'systemadministrator',
    },
    {
        accessRoleId: 'ra',
        name: 'ressursadministrator',
    },
    {
        accessRoleId: 'l',
        name: 'Leder',
    },
    {
        accessRoleId: 'sb',
        name: 'sluttbruker',
    },
];
