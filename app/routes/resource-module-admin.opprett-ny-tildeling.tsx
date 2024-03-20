import {Heading} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {IAssignment} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {useState} from "react";
import TildelingToolbar from "~/components/resource-module-admin/opprettTildeling/TildelingToolbar";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {IUnitItem} from "~/data/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {IResourceModuleAccessRole, IResourceModuleUsersPage} from "~/data/resourceModuleAdmin/types";
import TildelUserSearchResultList from "~/components/resource-module-admin/opprettTildeling/TildelUserSearchResultList";
import {
    fetchUsersWhoCanGetAssignments,
} from "~/data/resourceModuleAdmin/resource-module-admin";

export async function loader({params, request}: LoaderFunctionArgs) {
    // This loader is not complete. Just a copied version from another file to have a starting point.
    const auth = request.headers.get("Authorization")
    const url = new URL(request.url);
    const itemsPerPage = url.searchParams.get("size") ?? "10";
    const currentPage = url.searchParams.get("page") ?? "0";
    const orgUnitIds = url.searchParams.get("orgunits")?.split(",") ?? [];
    const name = url.searchParams.get("name") ?? "";
    const roleFilter = url.searchParams.get("accessroleid") ?? ""

    const usersPageResponse = await fetchUsersWhoCanGetAssignments(auth, Number(currentPage), Number(itemsPerPage), orgUnitIds, name, roleFilter);
    if(name) {
        // usersPageResponse =
    }

    const accessRolesResponse = await fetchAccessRoles(auth);
    const orgUnitsResponse = await fetchOrgUnits(auth)

    const usersPage = await usersPageResponse?.json()
    const accessRoles = await accessRolesResponse.json()
    const allOrgUnits = await orgUnitsResponse.json()

    return {usersPage: usersPage, accessRoles: accessRoles, allOrgUnits: allOrgUnits}
}

export default function ResourceModuleAdminTabTildel() {
    // const usersPage = useLoaderData<IUserPage>();

    // const usersPage = useLoaderData<{ usersPage: IUserPage }>();
    const loaderData = useLoaderData<typeof loader>();
    const usersPage = loaderData.usersPage as IResourceModuleUsersPage
    const accessRoles = loaderData.accessRoles as IResourceModuleAccessRole[]
    const allOrgUnits = loaderData.allOrgUnits.orgUnits as IUnitItem[]

    const [newAssignment, setNewAssignment] = useState<IAssignment>({user: null, accessRoleId: "", scopeId: 0, orgUnits:[]})

    const handleSelectUser = (resourceId: string) => {
        console.log(resourceId)
    }

    return (
        <section className={"content"}>
            <Heading className={"heading"} level={"2"} size={"large"}>Tildel rettigheter</Heading>
            {/*<ResourceModuleToolbar orgUnitList={allOrgUnits} roles={accessRoles} />*/}
            <TildelingToolbar allOrgUnits={allOrgUnits} accessRoles={accessRoles} />
            <TildelUserSearchResultList usersPage={usersPage} handleSelectUser={handleSelectUser} />
        </section>
    );
}