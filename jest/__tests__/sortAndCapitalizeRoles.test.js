import { sortAndCapitalizeRoles } from '../../app/components/common/CommonFunctions.ts';
import { mockIAccessRole, mockIResourceModuleUserRole } from '../__mocks__/rolesMock';
describe('sortAndCapitalizeRoles', () => {
    test('if type is IAccessRole, it should sort and capitalize roles and return IAccessRole', () => {
        expect(sortAndCapitalizeRoles(mockIAccessRole)).toEqual([
            {
                accessRoleId: 'sa',
                name: 'Systemadministrator',
            },
            {
                accessRoleId: 'ra',
                name: 'Ressursadministrator',
            },
            {
                accessRoleId: 'ta',
                name: 'Tjenesteadministrator',
            },
            {
                accessRoleId: 'ta',
                name: 'Tildeler',
            },
            {
                accessRoleId: 'l',
                name: 'Leder',
            },
            {
                accessRoleId: 'sb',
                name: 'Sluttbruker',
            },
        ]);
    });

    test('if type is IResourceModuleUserRole, it should sort and capitalize roles and return IResourceModuleUserRole', () => {
        expect(sortAndCapitalizeRoles(mockIResourceModuleUserRole)).toEqual([
            expect.objectContaining({
                roleId: 'sa',
                roleName: 'Systemadministrator',
            }),
            expect.objectContaining({
                roleId: 'ra',
                roleName: 'Ressursadministrator',
            }),
            expect.objectContaining({
                roleId: 'ta',
                roleName: 'Tjenesteadministrator',
            }),
            expect.objectContaining({
                roleId: 'ta',
                roleName: 'Tildeler',
            }),
            expect.objectContaining({
                roleId: 'l',
                roleName: 'Leder',
            }),
            expect.objectContaining({
                roleId: 'sb',
                roleName: 'Sluttbruker',
            }),
        ]);
    });

    test('if the removeUnusedRoles is true, it should remove roles that are not in the roles list', () => {
        expect(sortAndCapitalizeRoles(mockIAccessRole, true)).toEqual([
            {
                accessRoleId: 'sa',
                name: 'Systemadministrator',
            },
            {
                accessRoleId: 'ra',
                name: 'Ressursadministrator',
            },
            {
                accessRoleId: 'ta',
                name: 'Tjenesteadministrator',
            },
            {
                accessRoleId: 'ta',
                name: 'Tildeler',
            },
        ]);
    });
});
