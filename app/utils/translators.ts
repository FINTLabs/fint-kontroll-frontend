import { IKodeverkLicenseEnforcement, IKodeverkUserType } from '~/data/types/kodeverkTypes';
import { IAccessRole, IMeRole } from '~/data/types/userTypes';
import { IResourceModuleUserRole } from '~/data/types/resourceTypes';

export const translateUserTypeToLabel = (
    role: string,
    userTypes: IKodeverkUserType[] | undefined
) => {
    const userType = userTypes?.find((userType) => userType.label === role);
    return userType ? userType.fkLabel : role;
};

export const translateStatusToLabel = (status: string) => {
    const labels: { [key: string]: string } = {
        ACTIVE: 'Aktiv',
        DISABLED: 'Deaktivert',
        DELETED: 'Slettet',
    };
    return labels[status] ?? 'Alle';
};

export const translateLicenseEnforcementToLabel = (
    licenseEnforcement: string,
    licenseEnforcementKodeverk: IKodeverkLicenseEnforcement[] | undefined
) => {
    const enforcement = licenseEnforcementKodeverk?.find(
        (enforcement) => enforcement.label === licenseEnforcement
    );
    return enforcement ? enforcement.fkLabel : licenseEnforcement;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const sortAndCapitalizeRoles = <T extends IAccessRole | IResourceModuleUserRole | IMeRole>(
    roles: T[],
    removeUnusedRoles?: boolean
): T[] => {
    const roleNameSortOrder = [
        'systemadministrator',
        'ressursadministrator',
        'tjenesteadministrator',
        'tildeler',
        'leder',
        'godkjenner',
        'sluttbruker',
        'portaladmin',
    ];
    const unusedRoles = ['leder', 'godkjenner', 'sluttbruker', 'portaladmin'];
    let filteredRoles = roles;

    if (removeUnusedRoles) {
        filteredRoles = roles.filter((role) => {
            const roleName = 'name' in role ? role.name : role.roleName;
            return !unusedRoles.includes(roleName.toLowerCase());
        });
    }

    return filteredRoles
        .sort((a, b) => {
            const aName = 'name' in a ? a.name : a.roleName;
            const bName = 'name' in b ? b.name : b.roleName;
            return (
                roleNameSortOrder.indexOf(aName.toLowerCase()) -
                roleNameSortOrder.indexOf(bName.toLowerCase())
            );
        })
        .map((role) => ({
            ...role,
            ...('name' in role
                ? { name: capitalize(role.name) }
                : { roleName: capitalize(role.roleName) }),
        }));
};
