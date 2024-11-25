import {Alert, Box, HStack, VStack} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {
    IAssignedUsers,
    IKodeverkUserType,
    IResource,
    IUnitItem,
    IUnitTree,
    IUser,
    IUserItem,
    IUserPage
} from "~/data/types";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {fetchOrgUnits, fetchResourceById} from "~/data/fetch-resources";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import ChipsFilters from "~/components/common/ChipsFilters";
import {UserSearch} from "~/components/user/UserSearch";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";


export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseOrgUnits, responseAssignments, responseResource, source] = await Promise.all([
        fetchUsers(request, size, page, search, userType, orgUnits),
        fetchOrgUnits(request),
        fetchAssignedUsers(request, params.id, "1000", "0", "", "", orgUnits),
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request)
    ]);
    const userList: IUserPage = await responseUsers.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedUsersList: IAssignedUsers = await responseAssignments.json()
    const resource: IResource = await responseResource.json()


    let userTypes: IKodeverkUserType[] = []
    if (source === "gui") {
        userTypes = await fetchUserTypes(request)
    }

    const assignedUsersMap: Map<number, IUser> = new Map(assignedUsersList.users.map(user => [user.assigneeRef, user]))
    const isAssignedUsers: IUserItem[] = userList.users.map(user => {
        return {
            ...user,
            "assigned": assignedUsersMap.has(user.id)
        }
    })

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resource,
        userList,
        orgUnitList,
        assignedUsersList,
        isAssignedUsers,
        id: params.id,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        userTypes
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) =>
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <Link to={`/resources`} className={"breadcrumb-link"}>Ressurser</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/resources/${params.id}/user-assignments`} className={"breadcrumb-link"}>Ressursinfo</Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <Link to={`/assignment/resource/${params.id}/user`} className={"breadcrumb-link"}>Tildeling</Link>
            </HStack>
        </HStack>
}


export default function NewAssignment() {
    const loaderData = useLoaderData<typeof loader>()

    const userList: IUserPage = loaderData.userList
    // const orgUnitList: IUnitItem[] = loaderData.orgUnitList // Potentially removable if not used in the future
    // const assignedUsersList: IAssignedUsers = loaderData.assignedUsersList // Potentially removable if not used in the future
    const isAssignedUsers: IUserItem[] = loaderData.isAssignedUsers
    const resource: IResource = loaderData.resource
    const id: string = loaderData.id
    const basePath: string = loaderData.basePath
    const responseCode: string | undefined = loaderData.responseCode


    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Ny tildeling"}
                subTitle={resource.resourceName}
                LeftAlignedFilters={<SelectObjectType/>}
                FilterComponents={<UserTypeFilter userTypes={loaderData.userTypes}/>}
                SearchComponent={<UserSearch/>}
                ChipsFilters={<ChipsFilters userTypes={loaderData.userTypes}/>}
            />
            <VStack gap="4">
                <ResponseAlert
                    responseCode={responseCode}
                    successText={"Tildelingen var vellykket!"}
                    deleteText={"Tildelingen ble slettet!"}
                    conflictText={"Denne ressursen er allerede tildelt brukeren. Vennligst gå til brukersiden for å se tildelingen."}
                />
                <AssignUserTable
                    isAssignedUsers={isAssignedUsers}
                    resourceId={id}
                    size={userList.size}
                    currentPage={userList.currentPage}
                    totalPages={userList.totalPages}
                    basePath={basePath}
                />
            </VStack>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}