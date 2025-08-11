import React from 'react';
import { VStack } from '@navikt/ds-react';
import { LoaderFunctionArgs, useLoaderData, useNavigate, useRouteError } from 'react-router';
import ResourceModuleAdminUsersTable from '../components/resource-module-admin/ResourceModuleAdminUsersTable';
import { fetchUsersWithAssignment } from '~/data/resourceAdmin/resource-admin';
import styles from '../components/resource-module-admin/resourceModuleAdmin.css?url';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { IResourceModuleUsersPage } from '~/data/types/resourceTypes';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import ResourceModuleSearch from '~/components/resource-module-admin/ResourceModuleSearch';
import AllAccessRolesFilter from '~/components/resource-module-admin/AllAccessRolesFilter';
import { IUnitItem } from '~/data/types/orgUnitTypes';
import { IAccessRole } from '~/data/types/userTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = {
    usersPage: IResourceModuleUsersPage;
    roles: IAccessRole[];
    orgUnitPage: { orgUnits: IUnitItem[] };
    size: number;
};

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const auth = request;
    const size = Number(getSizeCookieFromRequestHeader(request)?.value) ?? 25;
    const page = Number(url.searchParams.get('page') ?? '0');
    const orgunits: string[] = url.searchParams.get('orgUnits')?.split(',') ?? [''];
    const name = url.searchParams.get('search') ?? '';
    const role = url.searchParams.get('accessroleid') ?? '';

    const [usersPage, roles, orgUnitPage] = await Promise.all([
        fetchUsersWithAssignment(auth, page, size, orgunits, name, role),
        fetchAccessRoles(auth),
        fetchAllOrgUnits(auth),
    ]);

    return {
        usersPage,
        roles,
        orgUnitPage,
        size,
    };
}

export default function ResourceAdminIndex() {
    const { usersPage, roles, orgUnitPage, size } = useLoaderData<LoaderData>();
    const navigate = useNavigate();

    return (
        <VStack className={'content'} gap="4">
            <TableHeaderLayout
                title={'Administrer brukere med rolletilknytning'}
                orgUnitsForFilter={orgUnitPage.orgUnits}
                FilterComponents={<AllAccessRolesFilter roles={roles} />}
                SearchComponent={<ResourceModuleSearch />}
                CreateNewButton={
                    <SecondaryAddNewLinkButton
                        id="create-assignment"
                        label="Opprett ny tildeling"
                        handleOnClick={() => navigate('opprett-ny-tildeling')}
                    />
                }
            />
            <ResourceModuleAdminUsersTable
                usersPage={usersPage}
                orgUnitList={orgUnitPage.orgUnits}
                roles={roles}
                size={size}
            />
        </VStack>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
