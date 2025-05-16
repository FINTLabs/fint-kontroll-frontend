import { Box, Chips } from '@navikt/ds-react';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import {
    translateaccessroleToLabel,
    translateStatusToLabel,
    translateUserTypeToLabel,
} from '~/utils/translators';
import { filterResetPageParam } from '~/utils/searchParamsHelpers';
import { IKodeverkUserType } from '~/data/types/kodeverkTypes';

type Filters = {
    orgUnits: string | null;
    accessroleid: string | null;
    name: string | null;
    userType: string | null;
    status: string | null;
    applicationcategory: string | null;
    objectType: string | null;
};

const ChipsFilters = () => {
    const loaderData = useLoaderData<{
        userTypes?: IKodeverkUserType[];
        userTypesKodeverk?: IKodeverkUserType[];
    }>();
    const userTypes = loaderData?.userTypesKodeverk ?? undefined;

    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<Filters>({
        orgUnits: null,
        accessroleid: null,
        name: null,
        userType: null,
        status: null,
        applicationcategory: null,
        objectType: null,
    });

    const pageParam = searchParams.get('page');

    useEffect(() => {
        const newFilters: Filters = {
            orgUnits: searchParams.get('orgUnits'),
            accessroleid: searchParams.get('accessroleid'),
            name: searchParams.get('name'),
            userType: searchParams.get('userType'),
            status: searchParams.get('status'),
            applicationcategory: searchParams.get('applicationcategory'),
            objectType: searchParams.get('objectType'),
        };
        setFilters(newFilters);
    }, [searchParams]);

    const removeFilter = useCallback(
        (filterToRemove: string) => {
            setSearchParams((params) => {
                params.delete(filterToRemove);
                return params;
            });
            filterResetPageParam(pageParam, setSearchParams);
            setFilters((prev) => ({ ...prev, [filterToRemove]: undefined }));
        },
        [pageParam, setSearchParams]
    );

    const removeAllFilters = useCallback(() => {
        setSearchParams((params) => {
            Object.keys(filters).forEach((key) => params.delete(key));
            return params;
        });
        setFilters({
            orgUnits: null,
            accessroleid: null,
            name: null,
            userType: null,
            status: null,
            applicationcategory: null,
            objectType: null,
        });
        filterResetPageParam(pageParam, setSearchParams);
    }, [filters, pageParam, setSearchParams]);

    const filterToLabel = useCallback(
        (filter: string, value: string) => {
            switch (filter) {
                case 'userType':
                    return translateUserTypeToLabel(value, userTypes);
                case 'orgUnits':
                    return 'Fjern org.enhetsfiltre';
                case 'accessroleid':
                    return `${translateaccessroleToLabel(value) || value}`;
                case 'status':
                    return `${translateStatusToLabel(value)}`;
                default:
                    return value;
            }
        },
        [userTypes]
    );

    const activeFilters = Object.values(filters).filter((value) => value !== null).length;

    return (
        <Box className={'filters'} paddingBlock={'0 4'}>
            <Chips>
                {Object.entries(filters)
                    .filter(([, value]) => value !== null)
                    .map(([key, value]) =>
                        value ? (
                            <Chips.Removable
                                key={key}
                                variant={'neutral'}
                                onClick={() => removeFilter(key)}
                                id={`${key}-chip`}>
                                {filterToLabel(key, value)}
                            </Chips.Removable>
                        ) : null
                    )}

                {activeFilters > 1 && (
                    <Chips.Removable key="clear-all" onClick={removeAllFilters} id="clear-all-chip">
                        Tøm alle filter
                    </Chips.Removable>
                )}
            </Chips>
        </Box>
    );
};

export default ChipsFilters;
