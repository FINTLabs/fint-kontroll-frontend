import { useSearchParams } from '@remix-run/react';
import { useLoadingState } from '~/components/common/customHooks';
import { Select } from '@navikt/ds-react';

export const FilterByStatus = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { fetching } = useLoadingState();

    const setStatusFilter = (event: string) => {
        setSearchParams((searchParams) => {
            if (event) {
                searchParams.set('status', event);
            } else {
                searchParams.delete('status');
            }
            return searchParams;
        });
    };

    return (
        <Select
            id={'select-status'}
            label={'Filter etter status'}
            onChange={(e) => setStatusFilter(e.target.value)}
            value={String(searchParams.get('status')) ?? ''}>
            <option value={''}>Alle</option>
            <option value={'ACTIVE'}>Aktiv</option>
            <option value={'DISABLED'}>Deaktivert</option>
            <option value={'DELETED'}>Slettet</option>
        </Select>
    );
};
