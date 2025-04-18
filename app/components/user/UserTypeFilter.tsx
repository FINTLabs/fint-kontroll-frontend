import { Select } from '@navikt/ds-react';
import React from 'react';
import { Form, useSearchParams } from '@remix-run/react';

import { IKodeverkUserType } from '~/data/types/kodeverkTypes';
import { translateUserTypeToLabel } from '~/utils/translators';
import { filterResetPageParam } from '~/utils/searchParamsHelpers';

interface UserTypeFilterProps {
    userTypeOptions?: string[];
    kodeverk?: IKodeverkUserType[];
}

export const UserTypeFilter = ({
    userTypeOptions = ['STUDENT', 'EMPLOYEESTAFF', 'EMPLOYEEFACULTY', 'EXTERNAL'],
    kodeverk,
}: UserTypeFilterProps) => {
    const [currentSearchParams, setSearchParams] = useSearchParams();
    const [searchParams] = useSearchParams();

    const pageParam = searchParams.get('page');

    const setUserTypeFilter = (event: string) => {
        setSearchParams((searchParams) => {
            searchParams.set('userType', event);
            return searchParams;
        });
        filterResetPageParam(pageParam, setSearchParams);
    };

    const options = userTypeOptions.includes('ALLTYPES')
        ? ['STUDENT', 'EMPLOYEESTAFF', 'EMPLOYEEFACULTY', 'EXTERNAL']
        : userTypeOptions;

    return (
        <Form>
            <Select
                label={'Filter for brukertype'}
                id="user-type-select"
                onChange={(e) => setUserTypeFilter(e.target.value)}
                value={String(currentSearchParams.get('userType')) ?? ''}>
                <option value={''}>Alle</option>
                {options.map((userType) => {
                    return (
                        <option key={userType} value={userType}>
                            {translateUserTypeToLabel(userType, kodeverk)}
                        </option>
                    );
                })}
            </Select>
        </Form>
    );
};
