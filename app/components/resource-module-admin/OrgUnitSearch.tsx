import React, { useState } from 'react';
import { filterResetPageParam } from '~/utils/searchParamsHelpers';
import { useSearchParams } from 'react-router';
import { Search } from '@navikt/ds-react';

const OrgUnitSearch = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = searchParams.get('page');
    const handleSearch = () => {
        setSearchParams((searchParams) => {
            searchValue
                ? searchParams.set('orgUnitName', searchValue)
                : searchParams.delete('orgUnitName');
            return searchParams;
        });
        setSearchValue(searchValue);
        filterResetPageParam(pageParam, setSearchParams);
    };

    return (
        <form
            onSubmit={(event) => {
                handleSearch();
                event.preventDefault();
            }}>
            <Search
                label="Søk på org.enhetsnavn"
                variant="secondary"
                hideLabel={false}
                onChange={(event) => setSearchValue(event)}
                value={searchValue}
                onClear={() => {
                    setSearchParams((searchParameter) => {
                        searchParameter.delete('orgUnitName');
                        return searchParameter;
                    });
                }}
            />
        </form>
    );
};

export default OrgUnitSearch;
