import { Select } from '@navikt/ds-react';
import { useSearchParams } from '@remix-run/react';
import { filterResetPageParam } from '~/components/common/CommonFunctions';

interface ResourceSelectApplicationCategoryProps {
    applicationCategories: string[];
}
export function ResourceSelectApplicationCategory({
    applicationCategories,
}: ResourceSelectApplicationCategoryProps) {
    const [applicationCategorySearchParams, setApplicationCategorySearchParams] = useSearchParams();
    const pageParam = applicationCategorySearchParams.get('page');

    const setAppCategory = (event: string) => {
        setApplicationCategorySearchParams((searchParams) => {
            searchParams.set('applicationcategory', event);
            if (searchParams.get('applicationcategory') === '') {
                searchParams.delete('applicationcategory');
            }
            return searchParams;
        });
        filterResetPageParam(pageParam, setApplicationCategorySearchParams);
    };

    return (
        <Select
            id={'select-applicationcategory'}
            label={'Filter for applikasjonskategori'}
            onChange={(e) => setAppCategory(e.target.value)}
            value={String(applicationCategorySearchParams.get('applicationcategory')) ?? ''}>
            <option value={''}>Alle</option>
            {applicationCategories?.filter(Boolean).map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </Select>
    );
}
