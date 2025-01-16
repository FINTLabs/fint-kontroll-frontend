import {Alert, Box, Tabs} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json, TypedResponse} from "@remix-run/node";
import {Link, useLoaderData, useParams, useRouteError} from "@remix-run/react";
import {BreadcrumbParams, IAssignedUsers, IKodeverkUserType, IUser, IUserItem, IUserPage} from "~/data/types";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {UserSearch} from "~/components/user/UserSearch";
import {fetchUserTypes} from "~/data/fetch-kodeverk";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";
import {getResourceNewUserAssignmentUrl} from "~/data/paths";
import {fetchResourceById} from "~/data/fetch-resources";

type LoaderData = {
    userList: IUserPage,
    isAssignedUsers: IUserItem[],
    basePath: string,
    userTypesKodeverk: IKodeverkUserType[],
    validForRoles: string[]
}

export async function loader({params, request}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    let selectedUserTypes = url.searchParams.get("userType")?.split(",").filter(type => type) ?? [];

    const resourceResponse = await fetchResourceById(request, params.id)
    const resource = await resourceResponse.json()

    if (selectedUserTypes.length === 0) {
        selectedUserTypes = resource.validForRoles
    }

    const [responseUsers, responseAssignments, userTypesKodeverk] = await Promise.all([
        fetchUsers(request, size, page, search, selectedUserTypes, orgUnits),
        fetchAssignedUsers(request, params.id, "1000", "0", "", "", orgUnits),
        fetchUserTypes(request)
    ]);
    const userList: IUserPage = await responseUsers.json()
    const assignedUsersList: IAssignedUsers = await responseAssignments.json()

    const assignedUsersMap: Map<number, IUser> = new Map(assignedUsersList.users.map(user => [user.assigneeRef, user]))
    const isAssignedUsers: IUserItem[] = userList.users.map(user => {
        return {
            ...user,
            "assigned": assignedUsersMap.has(user.id)
        }
    })
    return json({
        userList,
        isAssignedUsers,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        userTypesKodeverk,
        validForRoles: resource.validForRoles,
    })
}

export default function NewAssignment() {
    const {
        userList,
        isAssignedUsers,
        basePath,
        userTypesKodeverk,
        validForRoles
    } = useLoaderData<LoaderData>();
    const {id} = useParams<string>();

    return (
        <Tabs.Panel value="brukere">
            <TableToolbar
                FilterComponents={<UserTypeFilter userTypeOptions={validForRoles} kodeverk={userTypesKodeverk}/>}
                SearchComponent={<UserSearch/>}
            />
            <AssignUserTable
                isAssignedUsers={isAssignedUsers}
                resourceId={id}
                size={userList.size}
                currentPage={userList.currentPage}
                totalPages={userList.totalPages}
                basePath={basePath}
            />
        </Tabs.Panel>
    );
}

export const handle = {
    breadcrumb: ({params}: BreadcrumbParams) =>
        <Link to={getResourceNewUserAssignmentUrl(Number(params.id))}
              className={"breadcrumb-link"}>Brukertildeling</Link>
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
    );
}