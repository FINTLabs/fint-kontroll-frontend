import {LoaderFunctionArgs} from "@remix-run/router";
import {
    fetchObjectTypesForUser,
    fetchUserDetails,
    fetchUserAssignments,
    deleteAllAssignmentsOnUser, deleteUserAssignmentByAccessRoleId, deleteOrgUnitFromAssignment
} from "~/data/resourceModuleAdmin/resource-module-admin";
import {useActionData, useLoaderData, useNavigate} from "@remix-run/react";
import {Box, Button, Heading, HStack, Select, VStack} from "@navikt/ds-react";
import {ArrowLeftIcon, TrashIcon} from "@navikt/aksel-icons";
import {
    IResourceModuleAccessRole,
    IResourceModuleUser, IResourceModuleUserAssignmentsPaginated
} from "~/data/resourceModuleAdmin/types";
import {ActionFunctionArgs, json} from "@remix-run/node";
import {useEffect, useState} from "react";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import DeleteAssignment from "~/components/resource-module-admin/administer/ResourceModuleDeleteAssignmentModal";
import AdministerToolbar from "~/components/resource-module-admin/administer/AdministerToolbar";
import ResourceModuleResetModal from "~/components/resource-module-admin/administer/ResourceModuleResetModal";
import RoleAssignmentTable from "~/components/resource-module-admin/administer/RoleAssignmentTable";
import styles from "~/components/resource-module-admin/resourceModuleAdmin.css?url";
import {toast} from "react-toastify";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params, request}: LoaderFunctionArgs) => {
    const auth = request.headers.get("Authorization")
    const url = new URL(request.url);
    const resourceId: string = params.id ?? ""

    const size = Number(url.searchParams.get("size") ?? "10");
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgUnitName: string = url.searchParams.get("orgUnitName") ?? "";
    const objectType: string = url.searchParams.get("objectType") ?? "";
    const role = url.searchParams.get("accessRoleId") ?? "";

    const objectTypesResponse = await fetchObjectTypesForUser(auth, resourceId)
    const userDetailsResponse = await fetchUserDetails(auth, resourceId)
    const userAssignmentsPaginatedResponse = await fetchUserAssignments(auth, resourceId, role, objectType, orgUnitName, page, size)
    const accessRolesResponse = await fetchAccessRoles(auth)
    const objectTypesForUser = await objectTypesResponse.json()
    const userDetails = await userDetailsResponse.json()
    const userAssignmentsPaginated = await userAssignmentsPaginatedResponse.json()
    const accessRoles = await accessRolesResponse.json()

    return json({
        objectTypesForUser,
        userDetails,
        userAssignmentsPaginated,
        accessRoles
    })
}

export const action = async({params, request}: ActionFunctionArgs) => {
    const queryParams = new URLSearchParams(request.url.split("?")[1]);

    const auth = request.headers.get("Authorization")

    const formData = await request.formData()


    if(formData.get("resetAllUserAssignments")) {
        const res = await deleteAllAssignmentsOnUser(auth, params.id ?? "")
        return res.ok ? {reset: true, status: true, redirect: "/resource-module-admin", message: "Brukerobjekt ble nullstilt"} : {reset: false, status: false, redirect: null, message: null}
    }

    else if (formData.get("deleteOneAssignmentByRole")) {
        const accessRoleId = formData.get("accessRoleId") as string
        const objectTypeToDelete = formData.get("objectTypeToDelete") as string
        const res = await deleteUserAssignmentByAccessRoleId(auth, params.id ?? "", accessRoleId, objectTypeToDelete)
        return res.ok ? {reset: false, status: true, redirect: null, message: "Brukerobjekt ble nullstilt"} : {reset: false, status: false, redirect: null, message: null}
    }

    else if (formData.get("deleteOrgUnitFromAssignment")) {
        const scopeId = formData.get("scopeId") as string
        const orgUnitId = formData.get("orgUnitId") as string
        const res = await deleteOrgUnitFromAssignment(auth, scopeId, orgUnitId)
        return res.ok ? {reset: false, status: true, redirect: null, message: "Fjernet objekt fra tildelingen"} : {reset: false, status: false, redirect: null, message: null}
    }

    return {reset: false, status: true, redirect: null, message: null}
}

const ResourceModuleAdminAdministerId = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()

    const userDetails = loaderData.userDetails as IResourceModuleUser
    const objectTypesForUser = loaderData.objectTypesForUser as string[]
    const userAssignmentsPaginated = loaderData.userAssignmentsPaginated as IResourceModuleUserAssignmentsPaginated
    const accessRoles = loaderData.accessRoles as IResourceModuleAccessRole[]

    const navigate = useNavigate()

    const [selectedRole, setSelectedRole] = useState<IResourceModuleAccessRole>({ accessRoleId: "", name: "" })

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isResetRolesModalOpen, setIsResetRolesModalOpen] = useState(false)

    useEffect(() => {
        if(!actionData) {
            return
        }
        if(!actionData?.status){
            toast.error("En feil oppstod")
            return
        }

        if(actionData?.reset) {
            actionData.redirect ? navigate(actionData.redirect) : null
            toast.success("Brukerobjektet ble nullstilt")
            return
        }
        actionData?.message ? toast.success(actionData.message) : null
    }, [actionData]);


    const handleChangeRole = (selectedRoleParam: string) => {
        const paramMappedToAccessRoleType: IResourceModuleAccessRole | undefined = accessRoles.find(
            (role) => role.accessRoleId === selectedRoleParam
        )
        if (paramMappedToAccessRoleType === undefined) {
            setSelectedRole({ accessRoleId: "", name: "" })
        } else {
            setSelectedRole(paramMappedToAccessRoleType)
        }
    }

    const toggleRolesResetModal = (value: boolean) => {
        setIsResetRolesModalOpen(value)
    }

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(true)
    }

    return (
        <>
            <VStack gap={"4"}>
                <section>
                    <Button icon={<ArrowLeftIcon aria-hidden />} variant={"secondary"} onClick={() => navigate("/resource-module-admin")}>
                        Gå til dashbord
                    </Button>
                </section>

                <HStack justify={"space-between"}>
                    <div>
                        <Heading level={"2"} size={"small"}>
                            Brukerinfo
                        </Heading>
                        Navn: {userDetails?.firstName} {userDetails?.lastName}
                    </div>
                    <Button
                        variant={"danger"}
                        onClick={() => toggleRolesResetModal(true)}
                        icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                        iconPosition={"right"}
                    >
                        Nullstill brukerroller
                    </Button>
                </HStack>

                <HStack justify={"space-between"} align={"end"}>
                    <Select
                        label={"Velg rolle"}
                        value={selectedRole.accessRoleId}
                        onChange={(event) => handleChangeRole(event.target.value)}
                    >
                        <option value={""}>Alle</option>
                        {userDetails?.roles?.map((role) => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.roleName}
                            </option>
                        ))}
                    </Select>
                    <div>
                        {selectedRole.accessRoleId !== "" && (
                            <Button
                                variant={"danger"}
                                onClick={toggleDeleteModal}
                                icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
                                iconPosition={"right"}
                            >
                                Slett rolleobjekt
                            </Button>
                        )}
                    </div>
                </HStack>

                <Box>
                    {userDetails?.roles?.length === 0 ? (
                        <>Brukeren har ingen roller</>
                    ) : (
                        <div className={"table-toolbar-pagination-container"}>
                            <AdministerToolbar objectTypesForUser={objectTypesForUser}/>
                            <RoleAssignmentTable selectedRole={selectedRole} userAssignmentsPaginated={userAssignmentsPaginated} />
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
        </>
    )
}

export default ResourceModuleAdminAdministerId