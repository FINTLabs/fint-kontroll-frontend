import { Select } from '@navikt/ds-react';
import { useSearchParams } from '@remix-run/react';
import { filterResetPageParam } from '~/utils/searchParamsHelpers';

interface ToolbarProps {
    objectTypesForUser: string[];
}

const SelectObjectType = ({ objectTypesForUser }: ToolbarProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get('page');

    const setObjectTypeFilter = (val: string) => {
        setSearchParams((searchParams) => {
            val ? searchParams.set('objectType', val) : searchParams.delete('objectType');
            return searchParams;
        });
        filterResetPageParam(pageParam, setSearchParams);
    };

    return (
        <>
            <Select label={'Vis objekttype'} onChange={(e) => setObjectTypeFilter(e.target.value)}>
                <option value={''}>Alle</option>
                {objectTypesForUser.map((objectType) => (
                    <option key={objectType} value={objectType}>
                        {objectType}
                    </option>
                ))}
            </Select>
        </>
    );
};

export default SelectObjectType;
