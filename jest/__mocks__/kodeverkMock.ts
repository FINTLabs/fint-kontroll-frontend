import { IKodeverkLicenseEnforcement, IKodeverkUserType } from '~/data/types/kodeverkTypes';

export const mockKodeverkUserType: IKodeverkUserType[] = [
    {
        id: 3,
        fkLabel: 'Elev',
        label: 'STUDENT',
    },
    {
        id: 5,
        fkLabel: 'Alle brukere',
        label: 'ALLTYPES',
    },
    {
        id: 2,
        fkLabel: 'Ansatt skole',
        label: 'EMPLOYEEFACULTY',
    },
    {
        id: 1,
        fkLabel: 'Ansatt',
        label: 'EMPLOYEESTAFF',
    },
    {
        id: 4,
        fkLabel: 'Ekstern',
        label: 'EXTERNAL',
    },
];

export const mockKodeverkLicenseEnforcement: IKodeverkLicenseEnforcement[] = [
    {
        id: 1,
        fkLabel: 'Maks antall',
        label: 'HARDSTOP',
    },
    {
        id: 2,
        fkLabel: 'Kan overskrides',
        label: 'FLOATING',
    },
    {
        id: 3,
        fkLabel: 'Fri for alle',
        label: 'FREEALL',
    },
    {
        id: 4,
        fkLabel: 'Fri for elever',
        label: 'FREESTUDENT',
    },
    {
        id: 5,
        fkLabel: 'Fri for utdanning',
        label: 'FREEEDU',
    },
    {
        id: 6,
        fkLabel: 'Ikke satt håndhevingstype',
        label: 'NOTSET',
    },
];
