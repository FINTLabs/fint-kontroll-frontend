import {Heading, Tabs} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IMemberPage, IUserPage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import styles from "~/components/user/user.css";
import {fetchUsers} from "~/data/fetch-users";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchUsers(request.headers.get("Authorization"), size, page, search);
    return json(await response.json());
}

export default function ResourceModuleAdminTabDefine() {
    const users = useLoaderData<IUserPage>();
    console.log(users)
    return (
        <section>
            <Tabs value={"define"}>
                Define
                <Heading className={"heading"} level={"2"} size={"large"}>Definer roller</Heading>
                <Tabs.Panel value="define" className="h-24 w-full bg-gray-50 p-4">
                    Her skal det være ting
                    {/*<MemberTable memberPage={members}/>*/}
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}