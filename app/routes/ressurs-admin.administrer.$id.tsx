import { LoaderFunctionArgs } from '@remix-run/router';
import {
    deleteAllAssignmentsOnUser,
    deleteOrgUnitFromAssignment,
    deleteUserAssignmentByAccessRoleId,
    fetchObjectTypesForUser,
    fetchUserDetails,
    fetchUserAssignments,
} from '~/data/resourceAdmin/resource-admin';
import {
    Link,
    useActionData,
    useLoaderData,
    useNavigate,
    useRouteError,
    useSearchParams,
} from '@remix-run/react';
import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { ArrowRightIcon, TrashIcon } from '@navikt/aksel-icons';
import {
    IResourceModuleUser,
    IResourceModuleUserAssignmentsPaginated,
} from '~/data/types/resourceTypes';
import { ActionFunctionArgs, json } from '@remix-run/node';
import React, { useEffect, useState } from 'react';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import DeleteAssignment from '../components/resource-module-admin/administer/ResourceModuleDeleteAssignmentModal';
import AdministerToolbar from '../components/resource-module-admin/administer/AdministerToolbar';
import ResourceModuleResetModal from '../components/resource-module-admin/administer/ResourceModuleResetModal';
import RoleAssignmentTable from '../components/resource-module-admin/administer/RoleAssignmentTable';
import styles from '../components/resource-module-admin/resourceModuleAdmin.css?url';
import { toast } from 'react-toastify';
import ChipsFilters from '~/components/common/ChipsFilters';
import UserAccessRoleFilter from '~/components/resource-module-admin/UsersAccessRolesFilter';
import { getAdministerRoleByIdUrl, RESOURCE_ADMIN } from '~/data/paths';
import { IAccessRole } from '~/data/types/userTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const auth = request;
    const url = new URL(request.url);
    const resourceId: string = params.id ?? '';

    const size = Number(url.searchParams.get('size') ?? '10');
    const page = Number(url.searchParams.get('page') ?? '0');
    const orgUnitName: string = url.searchParams.get('orgUnitName') ?? '';
    const objectType: string = url.searchParams.get('objectType') ?? '';
    const role = url.searchParams.get('accessroleid') ?? '';

    const [objectTypesForUser, userDetails, userAssignmentsPaginated, accessRoles] =
        await Promise.all([
            fetchObjectTypesForUser(auth, resourceId),
            fetchUserDetails(auth, resourceId),
            fetchUserAssignments(auth, resourceId, role, objectType, orgUnitName, page, size),
            fetchAccessRoles(auth),
        ]);

    return json({
        objectTypesForUser,
        userDetails,
        userAssignmentsPaginated,
        accessRoles,
    });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);

    const auth = request;

    const formData = await request.formData();

    if (formData.get('resetAllUserAssignments')) {
        const res = await deleteAllAssignmentsOnUser(auth, params.id ?? '');
        return res.ok
            ? {
                  reset: true,
                  status: true,
                  redirect: RESOURCE_ADMIN,
                  message: 'Brukerobjekt ble nullstilt',
              }
            : { reset: false, status: false, redirect: null, message: null };
    } else if (formData.get('deleteOneAssignmentByRole')) {
        const accessRoleId = formData.get('accessRoleId') as string;
        const objectTypeToDelete = formData.get('objectTypeToDelete') as string;
        const res = await deleteUserAssignmentByAccessRoleId(
            auth,
            params.id ?? '',
            accessRoleId,
            objectTypeToDelete
        );
        return res.ok
            ? {
                  reset: false,
                  status: true,
                  redirect: null,
                  message: 'Brukerobjekt ble nullstilt',
              }
            : { reset: false, status: false, redirect: null, message: null };
    } else if (formData.get('deleteOrgUnitFromAssignment')) {
        const scopeId = formData.get('scopeId') as string;
        const orgUnitId = formData.get('orgUnitId') as string;
        const res = await deleteOrgUnitFromAssignment(auth, scopeId, orgUnitId);
        return res.ok
            ? {
                  reset: false,
                  status: true,
                  redirect: null,
                  message: 'Fjernet objekt fra tildelingen',
              }
            : { reset: false, status: false, redirect: null, message: null };
    }

    return { reset: false, status: true, redirect: null, message: null };
};

const ResourceModuleAdminAdministerId = () => {
    const loaderData = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    const userDetails = loaderData.userDetails as IResourceModuleUser;
    const objectTypesForUser = loaderData.objectTypesForUser as string[];
    const userAssignmentsPaginated =
        loaderData.userAssignmentsPaginated as IResourceModuleUserAssignmentsPaginated;
    const accessRoles = loaderData.accessRoles as IAccessRole[];

    const [searchParams, setSearchParams] = useSearchParams();
    const roleProp = searchParams.get('accessroleid');
    const objectTypeParam = searchParams.get('objectType');
    const orgUnitNameParam = searchParams.get('orgUnitName');

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState<IAccessRole>({ accessRoleId: '', name: '' });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isResetRolesModalOpen, setIsResetRolesModalOpen] = useState(false);

    useEffect(() => {
        if (!actionData) {
            return;
        }
        if (!actionData?.status) {
            toast.error('En feil oppstod');
            return;
        }

        if (actionData?.reset) {
            actionData.redirect ? navigate(actionData.redirect) : null;
            toast.success('Brukerobjektet ble nullstilt');
            return;
        }
        actionData?.message ? toast.success(actionData.message) : null;
    }, [actionData]);

    useEffect(() => {
        const paramMappedToAccessRoleType: IAccessRole | undefined = accessRoles.find(
            (role) => role.accessRoleId === roleProp
        );

        paramMappedToAccessRoleType === undefined
            ? setSelectedRole({
                  accessRoleId: '',
                  name: '',
              })
            : setSelectedRole(paramMappedToAccessRoleType);
    }, [roleProp]);

    const toggleRolesResetModal = (value: boolean) => {
        setIsResetRolesModalOpen(value);
    };

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    if (userDetails.roles.length === 0) {
        return (
            <VStack gap={'4'}>
                <section>
                    {`${userDetails.firstName} ${userDetails.lastName}`} har ingen roller
                </section>
            </VStack>
        );
    }

    return (
        <section className={'content'}>
            <VStack gap={'4'}>
                <HStack justify={'space-between'}>
                    <div>
                        <Heading level={'2'} size={'small'}>
                            Brukerinfo
                        </Heading>
                        Navn: {userDetails?.firstName} {userDetails?.lastName}
                    </div>
                    <Button
                        variant={'danger'}
                        onClick={() => toggleRolesResetModal(true)}
                        icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                        iconPosition={'right'}>
                        Nullstill brukerroller
                    </Button>
                </HStack>

                <Box>
                    {userDetails.roles.length === 0 ? (
                        <>Brukeren har ingen roller</>
                    ) : (
                        <div className={'table-toolbar-pagination-container'}>
                            <HStack justify={'space-between'} align={'end'}>
                                <UserAccessRoleFilter roles={userDetails.roles} />

                                <div>
                                    {selectedRole.accessRoleId !== '' && (
                                        <Button
                                            variant={'danger'}
                                            onClick={toggleDeleteModal}
                                            icon={
                                                <TrashIcon title="a11y-title" fontSize="1.5rem" />
                                            }
                                            iconPosition={'right'}>
                                            Slett rolleobjekt
                                        </Button>
                                    )}
                                </div>
                            </HStack>

                            <AdministerToolbar objectTypesForUser={objectTypesForUser} />

                            <ChipsFilters />

                            <RoleAssignmentTable
                                selectedRole={selectedRole}
                                userAssignmentsPaginated={userAssignmentsPaginated}
                            />
                        </div>
                    )}
                </Box>
            </VStack>

            {isResetRolesModalOpen && (
                <ResourceModuleResetModal
                    isResetRolesModalOpen={isResetRolesModalOpen}
                    setIsResetRolesModalOpen={(value) => setIsResetRolesModalOpen(value)}
                    user={userDetails}
                />
            )}
            {isDeleteModalOpen && selectedRole && (
                <DeleteAssignment
                    selectedRoleToDeleteFrom={selectedRole}
                    modalOpenProp={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    objectTypesForUser={objectTypesForUser}
                />
            )}
        </section>
    );
};

export default ResourceModuleAdminAdministerId;

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={RESOURCE_ADMIN} className={'breadcrumb-link'}>
                    Brukere med rolletilknytning
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getAdministerRoleByIdUrl(params.id)} className={'breadcrumb-link'}>
                    Rediger rolletilknytning
                </Link>
            </HStack>
        </HStack>
    ),
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
