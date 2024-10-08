import {Alert, Box, Heading, HStack, VStack} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IAssignedUsers, IResource, IUnitItem, IUnitTree, IUser, IUserItem, IUserPage} from "~/data/types";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {fetchOrgUnits, fetchResourceById} from "~/data/fetch-resources";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import ChipsFilters from "~/components/common/ChipsFilters";
import {UserSearch} from "~/components/user/UserSearch";


export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseOrgUnits, responseAssignments, responseResource] = await Promise.all([
        fetchUsers(request, size, page, search, userType, orgUnits),
        fetchOrgUnits(request),
        fetchAssignedUsers(request, params.id, "1000", "0", "", "", orgUnits),
        fetchResourceById(request, params.id),
    ]);
    const userList: IUserPage = await responseUsers.json()
    const orgUnitTree: IUnitTree = await responseOrgUnits.json()
    const orgUnitList: IUnitItem[] = orgUnitTree.orgUnits
    const assignedUsersList: IAssignedUsers = await responseAssignments.json()
    const resource: IResource = await responseResource.json()

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
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) =>
        <>
            <span>
                <Link to={`/resources`}>Ressurser</Link>
            </span>
            {" > "}
            <span>
                <Link to={`/resources/${params.id}/user-assignments`}>Ressursinfo</Link>
            </span>
            {" > "}
            <span>
                <Link to={`/assignment/resource/${params.id}/user`}>Tildeling</Link>
            </span>
        </>
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
            <VStack gap="4">
                <div>
                    <Heading level="1" size="xlarge">Ny tildeling </Heading>
                    <Heading level="2" size="small">{resource.resourceName}</Heading>
                </div>

                <HStack justify="space-between">
                    <SelectObjectType/>
                    <section className={"filters"}>
                        <UserTypeFilter/>
                        <UserSearch/>
                    </section>
                </HStack>

                <HStack justify="end">
                    <ChipsFilters/>
                </HStack>

                <ResponseAlert
                    responseCode={responseCode}
                    successText={"Tildelingen var vellykket!"}
                    deleteText={"Tildelingen ble slettet!"}
                    conflictText={"Denne ressursen er allerede tildelt brukeren. Vennligst gå til brukersiden for å se tildelingen."}
                />

                <AssignUserTable isAssignedUsers={isAssignedUsers}
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