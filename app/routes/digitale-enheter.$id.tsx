import React, { useState } from 'react';
import { Tabs } from '@navikt/ds-react';
import {
    Link,
    LoaderFunctionArgs,
    Outlet,
    useLoaderData,
    useLocation,
    useNavigate,
    useRouteError,
} from 'react-router';
import { IRole } from '~/data/types/userTypes';
import { fetchRoleById } from '~/data/fetch-roles';
import styles from '../components/user/user.css?url';
import { BASE_PATH } from '../../environment';
import {
    DEVICES,
    getDeviceGroupNewAssignmentUrl,
    getRoleNewAssignmentUrl,
    ROLES,
} from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const role = await fetchRoleById(request, params.id);

    return {
        role,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: () => (
        <Link to={DEVICES} className={'breadcrumb-link'}>
            Digitale enheter
        </Link>
    ),
};

export default function DevicesId() {
    // const loaderData = useLoaderData<typeof loader>();
    // const role: IRole = loaderData.role;

    const pathname = useLocation();

    const tabList = ['info', 'tildelinger'];
    const currentTab = tabList.find((tab) => pathname.pathname.includes(tab));

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : 'info');
    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        navigate(value);
    };

    return (
        <section className={'content'}>
            <TableHeader
                title={'VGMIDT Utlånspc-er'}
                HeaderButton={
                    <SecondaryAddNewLinkButton
                        label="Ny tildeling"
                        handleOnClick={() => navigate(`${getDeviceGroupNewAssignmentUrl(1)}`)}
                    />
                }
            />

            <Tabs defaultValue={'info'} value={selectedTab} onChange={handleTabChange}>
                <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <Tabs.List>
                        <Tabs.Tab value="info" label="Info" />
                        <Tabs.Tab value="tildelinger" label="Ressurser" />
                    </Tabs.List>
                </div>

                <Outlet />
            </Tabs>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
