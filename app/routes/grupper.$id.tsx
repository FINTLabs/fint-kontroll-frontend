import React, { useState } from 'react';
import { Tabs } from '@navikt/ds-react';
import {
    Link,
    Outlet,
    useLoaderData,
    useLocation,
    useNavigate,
    useRouteError,
} from '@remix-run/react';
import { IRole } from '~/data/types/userTypes';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchRoleById } from '~/data/fetch-roles';
import { json } from '@remix-run/node';
import styles from '../components/user/user.css?url';
import { BASE_PATH } from '../../environment';
import { getRoleNewAssignmentUrl, ROLES } from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const role = await fetchRoleById(request, params.id);

    return json({
        role,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
}

export const handle = {
    // @ts-ignore
    breadcrumb: () => (
        <Link to={ROLES} className={'breadcrumb-link'}>
            Grupper
        </Link>
    ),
};

export default function RolesId() {
    const loaderData = useLoaderData<typeof loader>();
    const role: IRole = loaderData.role;

    const pathname = useLocation();

    const tabList = ['medlemmer', 'tildelinger'];
    const currentTab = tabList.find((tab) => pathname.pathname.includes(tab));

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : 'medlemmer');
    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
        navigate(value);
    };

    return (
        <section className={'content'}>
            <TableHeader
                title={role.roleName}
                HeaderButton={
                    <SecondaryAddNewLinkButton
                        label="Ny tildeling"
                        handleOnClick={() => navigate(`${getRoleNewAssignmentUrl(role.id)}`)}
                    />
                }
            />

            <Tabs defaultValue={'members'} value={selectedTab} onChange={handleTabChange}>
                <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <Tabs.List>
                        <Tabs.Tab value="medlemmer" label="Medlemmer" />
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
