import styles from '../components/user/user.css?url';
import { HStack, Tabs, VStack } from '@navikt/ds-react';
import {
    Link,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
    useParams,
    useRouteError,
} from 'react-router';
import { getDeviceGroupByIdUrl } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { InfoBox } from '~/components/common/InfoBox';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { Search } from '~/components/common/Search';
import { DeviceUnitTable } from '~/components/device/DeviceUnitTable';
import { fetchDeviceGroupById, fetchDeviceMembersById } from '~/data/fetch-devices';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);

    const [deviceInfo, deviceItems] = await Promise.all([
        fetchDeviceGroupById(request, params.id),
        fetchDeviceMembersById(request, params.id),
    ]);

    return {
        deviceInfo,
        deviceItems,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={getDeviceGroupByIdUrl(params.id)} className={'breadcrumb-link'}>
                    info
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function DeviceGroupInfo() {
    const navigate = useNavigate();
    const params = useParams();
    const loaderData = useLoaderData<typeof loader>();
    const deviceInfo = loaderData.deviceInfo;

    return (
        <section>
            <Tabs value={'info'}>
                <VStack gap="4">
                    <Tabs.Panel value="info">
                        <InfoBox
                            title={'Informasjon om maskingruppen'}
                            info={[
                                { label: 'Navn', value: deviceInfo.name },
                                { label: 'KildesystemID', value: deviceInfo.sourceId },
                                {
                                    label: 'Organisasjonsenhet',
                                    value: deviceInfo.organisationUnitName,
                                },
                                { label: 'Plattform', value: deviceInfo.platform },
                                { label: 'Enhetstype', value: deviceInfo.deviceType },
                            ]}
                            maxColumns={2}
                        />
                    </Tabs.Panel>
                    <TableHeaderLayout
                        title={'Digitale enheter i maskingruppen'}
                        isSubHeader={true}
                        SearchComponent={<Search label={'Søk etter maskin'} id={'search-device'} />}
                    />
                    <DeviceUnitTable />
                </VStack>
            </Tabs>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
