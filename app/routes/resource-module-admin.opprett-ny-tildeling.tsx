import {Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IAssignment, IUserPage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import styles from "~/components/user/user.css";
import {fetchUsers} from "~/data/fetch-users";
import {useState} from "react";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    // This loader is not complete. Just a copied version from another file to have a starting point.
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchUsers(request.headers.get("Authorization"), size, page, search);
    // const response = await fetchAssignmentUsers(size, page, search);



    return json(await response.json());
}

export default function ResourceModuleAdminTabTildel() {
    // const usersPage = useLoaderData<IUserPage>();

    // const usersPage = useLoaderData<{ usersPage: IUserPage }>();
    const usersPage: IUserPage = useLoaderData<typeof loader>();

    const [newAssignment, setNewAssignment] = useState<IAssignment>({user: null, accessRoleId: "", scopeId: 0, orgUnits:[]})

    return (
        <section className={"content"}>
            <Heading className={"heading"} level={"2"} size={"large"}>Tildel rettigheter</Heading>
            Innhold kommer
        </section>
    );
}