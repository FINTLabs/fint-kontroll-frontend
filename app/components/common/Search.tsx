import { Search as AkselSearch } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Form, useSearchParams } from '@remix-run/react';
import { useLoadingState } from '~/components/common/customHooks';
import {
    filterResetPageParam,
    handleClearSearchFieldString,
    handleSearchFieldString,
} from '~/utils/searchParamsHelpers';

type SearchInputProps = {
    label: string;
    id: string;
};

export const Search = ({ label, id }: SearchInputProps) => {
    const [searchString, setSearchString] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searching } = useLoadingState();
    const pageParam = searchParams.get('page');

    return (
        <Form
            onSubmit={(event) => {
                handleSearchFieldString(event, setSearchParams, searchString);
                setSearchString('');
                filterResetPageParam(pageParam, setSearchParams);
            }}>
            <AkselSearch
                role="search"
                id={id}
                label={label}
                hideLabel={false}
                variant="secondary"
                value={searchString}
                onChange={(event) => setSearchString(event)}
                onClear={() => {
                    handleClearSearchFieldString(setSearchParams);
                }}>
                {' '}
                <AkselSearch.Button loading={searching} />
            </AkselSearch>
        </Form>
    );
};
