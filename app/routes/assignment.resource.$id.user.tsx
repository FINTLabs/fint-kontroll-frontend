import {Alert, Box, Heading, VStack} from "@navikt/ds-react";
import {AssignUserTable} from "~/components/assignment/NewAssignmentUserTable";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchUsers} from "~/data/fetch-users";
import {json} from "@remix-run/node";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import type {IAssignedUsers, IResource, IUnitItem, IUnitTree, IUser, IUserItem, IUserPage} from "~/data/types";
import {SelectObjectType} from "~/components/assignment/SelectObjectType";
import {NewAssignmentUserSearch} from "~/components/assignment/NewAssignmentUserSearch";
import {fetchOrgUnits, fetchResourceById} from "~/data/fetch-resources";
import {fetchAssignedUsers} from "~/data/fetch-assignments";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {BASE_PATH} from "../../environment";
import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";


export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [responseUsers, responseOrgUnits, responseAssignments, responseResource] = await Promise.all([
        fetchUsers(request.headers.get("Authorization"), size, page, search, userType, orgUnits),
        fetchOrgUnits(request.headers.get("Authorization")),
        fetchAssignedUsers(request.headers.get("Authorization"), params.id, "1000", "0", "", "", orgUnits),
        fetchResourceById(request.headers.get("Authorization"), params.id),
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
        <>
            <div className={"content"}>
                <VStack className={"heading"}>
                    <Heading level="1" size="xlarge">Ny tildeling </Heading>
                    <Heading level="2" size="small">{resource.resourceName}</Heading>
                </VStack>

                <section className={"toolbar"}>
                    <SelectObjectType/>
                    <section className={"filters"}>
                        <UserTypeFilter/>
                        <NewAssignmentUserSearch/>
                    </section>
                </section>

                <Box paddingBlock='8 0'>
                    <ResponseAlert responseCode={responseCode}/>
                </Box>

                <AssignUserTable isAssignedUsers={isAssignedUsers}
                                 resourceId={id}
                                 size={userList.size}
                                 currentPage={userList.currentPage}
                                 totalPages={userList.totalPages}
                                 basePath={basePath}
                />
            </div>
        </>
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

function ResponseAlert(prop: { responseCode: string | undefined }) {

    if (prop.responseCode === undefined) return (<div/>)

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen var vellykket!
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}