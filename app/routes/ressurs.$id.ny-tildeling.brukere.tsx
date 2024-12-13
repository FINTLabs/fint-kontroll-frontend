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
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";
import {TableToolbar} from "~/components/common/Table/Header/TableToolbar";
import {getResourceNewUserAssignmentUrl} from "~/data/paths";

type LoaderData = {
    userList: IUserPage,
    isAssignedUsers: IUserItem[],
    basePath: string,
    userTypes: IKodeverkUserType[]
}

export async function loader({params, request}: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseAssignments, source] = await Promise.all([
        fetchUsers(request, size, page, search, userType, orgUnits),
        fetchAssignedUsers(request, params.id, "1000", "0", "", "", orgUnits),
        fetchResourceDataSource(request)
    ]);
    const userList: IUserPage = await responseUsers.json()
    const assignedUsersList: IAssignedUsers = await responseAssignments.json()

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
        userList,
        isAssignedUsers,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        userTypes
    })
}

export default function NewAssignment() {
    const {userList, isAssignedUsers, basePath, userTypes} = useLoaderData<LoaderData>();
    const {id} = useParams<string>();

    return (
        <Tabs.Panel value="brukere">
            <TableToolbar
                FilterComponents={<UserTypeFilter userTypes={userTypes}/>}
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