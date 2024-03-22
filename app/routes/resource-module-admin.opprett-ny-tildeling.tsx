import {Button, ExpansionCard, Heading, Switch} from "@navikt/ds-react";
import {useLoaderData} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import React, {useEffect, useState} from "react";
import TildelingToolbar from "~/components/resource-module-admin/opprettTildeling/TildelingToolbar";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {IUnitItem} from "~/data/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {
    IResourceModuleAccessRole, IResourceModuleAssignment,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import TildelUserSearchResultList from "~/components/resource-module-admin/opprettTildeling/TildelUserSearchResultList";
import {
    fetchUsersWhoCanGetAssignments,
} from "~/data/resourceModuleAdmin/resource-module-admin";
import styles from "~/components/resource-module-admin/resourceModuleAdmin.css";
import OrgUnitTreeSelector from "~/components/org-unit-selector/OrgUnitTreeSelector";
import SummaryOfTildeling from "~/components/resource-module-admin/opprettTildeling/SummaryOfTildeling";
import ChooseAccessRole from "~/components/resource-module-admin/opprettTildeling/ChooseAccessRole";
import {CheckmarkCircleIcon} from "@navikt/aksel-icons";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
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
    const loaderData = useLoaderData<typeof loader>();
    const usersPage = loaderData.usersPage as IResourceModuleUsersPage
    const accessRoles = loaderData.accessRoles as IResourceModuleAccessRole[]
    const allOrgUnits = loaderData.allOrgUnits.orgUnits as IUnitItem[]

    const [newAssignment, setNewAssignment] = useState<IResourceModuleAssignment>({user: null, accessRoleId: "", scopeId: 0, orgUnits:[], includeSubOrgUnits: false})
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>([])
    const [includeSubOrgUnitsState, setIncludeSubOrgUnitsState] = useState(newAssignment.includeSubOrgUnits)

    useEffect(() => {
        setNewAssignment({...newAssignment, orgUnits: selectedOrgUnits.map(orgUnit => orgUnit), includeSubOrgUnits: includeSubOrgUnitsState})
    }, [selectedOrgUnits]);

    const handleSelectUser = (newUser: IResourceModuleUser) => {
        console.log(newUser)
        setNewAssignment({...newAssignment, user: newUser})
    }

    const handleChangeIncludeSubOrgUnits = () => {
        setIncludeSubOrgUnitsState(!includeSubOrgUnitsState)
    }

    const setNewAccessRole = (accessRoleId: string) => {
        setNewAssignment({...newAssignment, accessRoleId: accessRoleId})
    }

    const missingFields = !newAssignment.user || newAssignment.orgUnits.length === 0 || !newAssignment.accessRoleId

    return (
        <section className={"content tildeling-section-container"}>
            <Heading className={"heading"} level={"2"} size={"large"}>Tildel rettigheter</Heading>
            <ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true} className={newAssignment.user ? "expansion-green" : ""}>
                <ExpansionCard.Header>
                    {newAssignment.user ?
                        <ExpansionCard.Title><CheckmarkCircleIcon/> Bruker valgt</ExpansionCard.Title>
                    :
                        <ExpansionCard.Title>Finn brukeren å tildele rettigheter til</ExpansionCard.Title>
                    }
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <div className={"tildeling-section"}>
                        {/*<ResourceModuleToolbar orgUnitList={allOrgUnits} roles={accessRoles} />*/}
                        <TildelingToolbar allOrgUnits={allOrgUnits} accessRoles={accessRoles} />
                        <TildelUserSearchResultList newAssignment={newAssignment} usersPage={usersPage} handleSelectUser={handleSelectUser} />
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard size="small" aria-label="Small-variant" className={newAssignment.accessRoleId ? "expansion-green" : ""}>
                <ExpansionCard.Header>
                    {newAssignment.accessRoleId ?
                        <ExpansionCard.Title>
                            <CheckmarkCircleIcon /> Rolle valgt
                        </ExpansionCard.Title>
                        :
                        <ExpansionCard.Title>
                            Velg rolle
                        </ExpansionCard.Title>
                    }
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ChooseAccessRole accessRoles={accessRoles} setNewAccessRole={setNewAccessRole} />
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard size="small" aria-label="Small-variant" className={newAssignment.orgUnits.length > 0 ? "expansion-green" : ""}>
                <ExpansionCard.Header>
                    {newAssignment.orgUnits.length > 0 ?
                        <ExpansionCard.Title><CheckmarkCircleIcon/> Orgenheter valgt</ExpansionCard.Title>
                    :
                        <ExpansionCard.Title>Legg til orgenheter</ExpansionCard.Title>
                    }
                </ExpansionCard.Header>
                <ExpansionCard.Content>

                    <div className={"tildeling-section"}>
                        <Switch onClick={() => handleChangeIncludeSubOrgUnits()} checked={includeSubOrgUnitsState}>
                            Inkluder underliggende enheter
                        </Switch>

                        <OrgUnitTreeSelector orgUnitList={allOrgUnits}
                                             selectedOrgUnits={selectedOrgUnits}
                                             setSelectedOrgUnits={(newSelected) => setSelectedOrgUnits(newSelected)}
                                             includeSubOrgUnits={includeSubOrgUnitsState}
                        />
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>

            <div className={"tildeling-section"}>
                <SummaryOfTildeling assignment={newAssignment} missingFields={missingFields} />
                <span>
                    <Button disabled={missingFields}>Lagre tildeling</Button>
                </span>
            </div>
        </section>
    );
}