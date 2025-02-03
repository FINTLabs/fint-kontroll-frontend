import { useMemo } from 'react';
import { useLocation, useNavigation } from '@remix-run/react';

export const useLoadingState = () => {
    const navigation = useNavigation();
    const location = useLocation();

    const loading = useMemo(() => navigation.state === 'loading', [navigation.state]);

    const fetching = useMemo(
        () =>
            navigation.state === 'loading' &&
            navigation.location?.pathname.endsWith(location.pathname) &&
            new URLSearchParams(navigation.location?.search).toString() !==
                new URLSearchParams(location.search).toString(),
        [location, navigation]
    );

    const searching = useMemo(
        () =>
            navigation.state === 'loading' &&
            new URLSearchParams(navigation.location?.search).has('search'),
        [navigation.state, navigation.location]
    );

    return { loading, fetching, searching };
};
