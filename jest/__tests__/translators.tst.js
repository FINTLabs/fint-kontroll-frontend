import {
    translateLicenseEnforcementToLabel,
    translateUserTypeToLabel,
} from '../../app/components/common/CommonFunctions.ts';
import { mockKodeverkLicenseEnforcement, mockKodeverkUserType } from '../__mocks__/kodeverkMock';

describe('translateUserTypeToLabel', () => {
    test('if there is no kodeverk, then it should return the same text', () => {
        expect(translateUserTypeToLabel('EMPLOYEEFACULTY')).toBe('EMPLOYEEFACULTY');
    });

    test('if there is kodeverk, then it should return the translated text', () => {
        expect(translateUserTypeToLabel('EMPLOYEEFACULTY', mockKodeverkUserType)).toBe(
            'Ansatt skole'
        );
    });

    test('if there is kodeverk, but the label does not exist', () => {
        expect(translateUserTypeToLabel('EMPLOYEEFACULTYADMIN', mockKodeverkUserType)).toBe(
            'EMPLOYEEFACULTYADMIN'
        );
    });
});

describe('translateLicenseEnforcementToLabel', () => {
    test('if there is no kodeverk, then it should return the same text', () => {
        expect(translateLicenseEnforcementToLabel('FREESTUDENT')).toBe('FREESTUDENT');
    });

    test('if there is kodeverk, then it should return the translated text', () => {
        expect(
            translateLicenseEnforcementToLabel('FREESTUDENT', mockKodeverkLicenseEnforcement)
        ).toBe('Fri for elever');
    });

    test('if there is kodeverk, but the label does not exist', () => {
        expect(
            translateLicenseEnforcementToLabel('FREEFORALLADMINS', mockKodeverkLicenseEnforcement)
        ).toBe('FREEFORALLADMINS');
    });
});
