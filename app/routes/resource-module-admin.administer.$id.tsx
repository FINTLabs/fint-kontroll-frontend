import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchObjectTypes, fetchUserDetails, fetchUserAssignments} from "~/data/resourceModuleAdmin/resource-module-admin";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Box, Button, Heading, HStack, Select, VStack} from "@navikt/ds-react";
import {ArrowLeftIcon, TrashIcon} from "@navikt/aksel-icons";
import {
    IResourceModuleAccessRole,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import {IUnitItem} from "~/data/types";
import {json} from "@remix-run/node";
import {useState} from "react";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";

export const loader = async ({params, request}: LoaderFunctionArgs) => {
    const auth = request.headers.get("Authorization")
    const url = new URL(request.url);
    const resourceId: string = params.id ?? ""

    const size = Number(url.searchParams.get("size") ?? "10");
    const page = Number(url.searchParams.get("page") ?? "0");
    const orgUnitName: string = url.searchParams.get("orgUnitName") ?? "";
    const objectType: string = url.searchParams.get("objectType") ?? "";
    const role = url.searchParams.get("accessRoleId") ?? "";

    const objectTypesResponse = await fetchObjectTypes(auth)
    const userDetailsResponse = await fetchUserDetails(auth, resourceId)
    const userAssignmentsResponse = await fetchUserAssignments(auth, resourceId, role, objectType, orgUnitName, page, size)
    const accessRolesResponse = await fetchAccessRoles(auth)
    const objectTypes = await objectTypesResponse.json()
    const userDetails = await userDetailsResponse.json()
    const userAssignments = await userAssignmentsResponse.json()
    const accessRoles = await accessRolesResponse.json()

    return json({
        objectTypes,
        userDetails,
        userAssignments,
        accessRoles
    })
}

const ResourceModuleAdminAdministerId = () => {
    const loaderData = useLoaderData<typeof loader>()
    const userDetails = loaderData.userDetails as IResourceModuleUser
    const objectTypes = loaderData.objectTypes as string[]
    const userScope = loaderData.userAssignments.orgUnits as IUnitItem[]
    const accessRoles = loaderData.accessRoles as IResourceModuleAccessRole[]

    console.log(loaderData)

    const navigate = useNavigate()

    const [selectedRole, setSelectedRole] = useState<IResourceModuleAccessRole>({ accessRoleId: "", name: "" })

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

    const goBack = () => {
        navigate(-1) // Navigate back in the history
    }

    return (
        <>
            <Button icon={<ArrowLeftIcon aria-hidden />} variant={"secondary"} onClick={goBack}>
                Gå tilbake
            </Button>

            <VStack gap={"4"}>
                <HStack justify={"space-between"}>
                    <div>
                        <Heading level={"2"} size={"small"}>
                            Brukerinfo
                        </Heading>
                        Navn: {userDetails?.firstName} {userDetails?.lastName}
                    </div>
                    <Button
                        variant={"danger"}
                        // onClick={() => toggleRolesResetModal(true)}
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
                        <>
                            {/*<Toolbar objectTypesForUser={objectTypesForUser} />*/}
                            {/*<RoleOrgunitAssociationTable selectedRole={selectedRole} userId={userId} />*/}
                        </>
                    )}
                </Box>
            </VStack>

            {/*{isResetRolesModalOpen && (*/}
            {/*    <ResetUserModal*/}
            {/*        isResetRolesModalOpen={isResetRolesModalOpen}*/}
            {/*        setIsResetRolesModalOpen={(value) => setIsResetRolesModalOpen(value)}*/}
            {/*        user={loaderData}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{isDeleteModalOpen && selectedRole && (*/}
            {/*    <DeleteAssignment*/}
            {/*        userData={loaderData}*/}
            {/*        selectedRoleToDeleteFrom={selectedRole}*/}
            {/*        modalOpenProp={isDeleteModalOpen}*/}
            {/*        setIsDeleteModalOpen={setIsDeleteModalOpen}*/}
            {/*        objectTypesForUser={objectTypesForUser}*/}
            {/*    />*/}
            {/*)}*/}
        </>
    )
}

export default ResourceModuleAdminAdministerId