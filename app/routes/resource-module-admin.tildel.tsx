import {Heading, Tabs} from "@navikt/ds-react";
import {useLoaderData, useOutletContext} from "@remix-run/react";
import type {IAssignment, IMemberPage, IUserPage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import styles from "~/components/user/user.css";
import {fetchUsers} from "~/data/fetch-users";
import AssignRightsUserTable from "~/components/resource-module-admin/AssignRightsUserTable";
import {useState} from "react";
import {IAssignedUsers} from "~/data/types";
import {fetchAssignmentUsers} from "~/data/resourceModuleAdmin/resource-module-admin";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    // const response = await fetchUsers(request.headers.get("Authorization"), size, page, search);
    const response = await fetchAssignmentUsers(size, page, search);



    return json(await response.json());
}

export default function ResourceModuleAdminTabTildel() {
    // const usersPage = useLoaderData<IUserPage>();

    // const usersPage = useLoaderData<{ usersPage: IUserPage }>();
    const usersPage: IUserPage = useLoaderData<typeof loader>();
    console.log(usersPage)

    const [newAssignment, setNewAssignment] = useState<IAssignment>({user: null, accessRoleId: "", scopeId: 0, orgUnits:[]})
    return (
        <section>
            <Tabs value={"tildel"}>
                <Heading className={"heading"} level={"2"} size={"large"}>Tildel rettigheter</Heading>
                <Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">
                    <AssignRightsUserTable newAssignment={newAssignment} setNewAssignment={setNewAssignment} usersPage={usersPage} />
                    {/*<MemberTable memberPage={members}/>*/}
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}