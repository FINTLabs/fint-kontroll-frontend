import styles from '../components/resource/resource.css?url';
import {
    Link,
    LoaderFunctionArgs,
    useLoaderData,
    useRouteError,
    useRouteLoaderData,
} from 'react-router';
import { fetchAssignedDevices } from '~/data/fetch-assignments';
import { Tabs, VStack } from '@navikt/ds-react';
import { BASE_PATH } from '../../environment';
import React from 'react';
import { fetchResourceById } from '~/data/fetch-resources';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { TableToolbar } from '~/components/common/Table/Header/TableToolbar';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';
import { AssignedDeviceTable } from '~/components/assignment/AssignedDeviceTable';
import { DeviceSearch } from '~/components/device/DeviceSearch';
import { IAssignedDevices } from '~/data/types/deviceTypes';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const [assignedDevices, resource] = await Promise.all([
        fetchAssignedDevices(request, params.id, size, page, search, orgUnits),
        fetchResourceById(request, params.id),
    ]);

    return {
        assignedDevices,
        resourceName: resource.resourceName,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        correlationId: url.searchParams.get('correlationId') ?? undefined,
    };
}

export function useResourceByIdLoaderData() {
    return useRouteLoaderData<typeof loader>('resource.$id');
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => {
        return (
            <Link to={`/resources/${params.id}/device-assignments`} className={'breadcrumb-link'}>
                Ressursinfo
            </Link>
        );
    },
};

export default function AssignedDevices() {
    const data = useLoaderData<{
        assignedDevices: IAssignedDevices;
        basePath: string;
        responseCode: string | undefined;
        correlationId: string | undefined;
    }>();

    return (
        <Tabs.Panel value="maskingruppe-tildelinger">
            <VStack gap="space-12">
                <TableToolbar SearchComponent={<DeviceSearch />} />
                <ResponseAlert
                    responseCode={data.responseCode}
                    correlationId={data.correlationId}
                    basepath={data.basePath}
                    successText={'Tildelingen var vellykket!'}
                    deleteText={'Tildelingen ble slettet!'}
                />

                <AssignedDeviceTable
                    assignedDevices={data.assignedDevices}
                    basePath={data.basePath}
                />
            </VStack>
        </Tabs.Panel>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
