import { Search as AkselSearch } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Form, useSearchParams } from '@remix-run/react';
import { filterResetPageParam } from '~/components/common/CommonFunctions';
import { useLoadingState } from '~/components/common/customHooks';

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
                event.preventDefault();

                setSearchParams((searchParams) => {
                    searchString
                        ? searchParams.set('search', searchString)
                        : searchParams.delete('search');
                    return searchParams;
                });
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
                    setSearchParams((searchParameter) => {
                        searchParameter.delete('search');
                        return searchParameter;
                    });
                }}>
                {' '}
                <AkselSearch.Button id={'search-button'} loading={searching} />
            </AkselSearch>
        </Form>
    );
};
