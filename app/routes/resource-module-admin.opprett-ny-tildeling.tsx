import {Alert, Box, Button, ExpansionCard, Heading, Switch} from "@navikt/ds-react";
import {
    Form,
    Links,
    Meta, Scripts,
    useActionData,
    useLoaderData,
    useNavigate,
    useRouteError,
    useSearchParams
} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import React, {useEffect, useState} from "react";
import TildelingToolbar from "../components/resource-module-admin/opprettTildeling/TildelingToolbar";
import {fetchOrgUnits} from "~/data/fetch-resources";
import {IUnitItem, IUnitTree} from "~/data/types";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {
    IResourceModuleAccessRole,
    IResourceModuleAssignment,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import TildelUserSearchResultList from "../components/resource-module-admin/opprettTildeling/TildelUserSearchResultList";
import {
    fetchUsersWhoCanGetAssignments,
    postNewTildelingForUser,
} from "~/data/resourceModuleAdmin/resource-module-admin";
import styles from "../components/resource-module-admin/resourceModuleAdmin.css?url";
import OrgUnitTreeSelector from "../components/org-unit-selector/OrgUnitTreeSelector";
import SummaryOfTildeling from "../components/resource-module-admin/opprettTildeling/SummaryOfTildeling";
import ChooseAccessRole from "../components/resource-module-admin/opprettTildeling/ChooseAccessRole";
import {CheckmarkCircleIcon} from "@navikt/aksel-icons";
import {ActionFunctionArgs} from "@remix-run/node";
import {toast} from "react-toastify";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

const loopAndSetIsCheck = (orgUnitTree: IUnitTree): IUnitTree => {
    const newList = orgUnitTree.orgUnits.map(orgUnit => ({
        ...orgUnit,
        isChecked: false
    }))
    return {
        ...orgUnitTree, orgUnits: newList
    }
}

export async function loader({request}: LoaderFunctionArgs) {
    // This loader is not complete. Just a copied version from another file to have a starting point.
    const auth = request.headers.get("Authorization")
    const url = new URL(request.url);
    const itemsPerPage = url.searchParams.get("size") ?? "10";
    const currentPage = url.searchParams.get("page") ?? "0";
    const orgUnitIds = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const name = url.searchParams.get("name") ?? "";
    const roleFilter = url.searchParams.get("accessroleid") ?? ""

    const usersPageResponse = await fetchUsersWhoCanGetAssignments(auth, Number(currentPage), Number(itemsPerPage), orgUnitIds, name, roleFilter);
    if (name) {
        // usersPageResponse =
    }

    const accessRolesResponse = await fetchAccessRoles(auth);
    const orgUnitsResponse = await fetchOrgUnits(auth)

    const usersPage = await usersPageResponse?.json()
    const accessRoles = await accessRolesResponse.json()
    const allOrgUnits = await orgUnitsResponse.json()

    const orgUnitsWithIsChecked = loopAndSetIsCheck(allOrgUnits)

    return {usersPage: usersPage, accessRoles: accessRoles, allOrgUnits: orgUnitsWithIsChecked}
}

export const action = async ({request}: ActionFunctionArgs) => {
    const auth = request.headers.get("Authorization")

    const formData = await request.formData()

    const resourceId = formData.get("resourceId") as string // resourceId is the unique ID of a user
    const accessRoleId = formData.get("accessRoleId") as string
    const scopeId = formData.get("scopeId") as string
    const orgUnits = String(formData.get("orgUnits")).split(",") ?? []
    let includeSubOrgUnits: string | boolean = formData.get("includeSubOrgUnits") as string
    includeSubOrgUnits = includeSubOrgUnits === "true"

    const res = await postNewTildelingForUser(auth, resourceId, accessRoleId, scopeId, orgUnits, includeSubOrgUnits)

    return res.ok ? {
        status: true,
        redirect: "/resource-module-admin",
        message: "Tildeling gjennomført!"
    } : {status: false, redirect: null, message: null}
}


export default function ResourceModuleAdminTabTildel() {
    const loaderData = useLoaderData<typeof loader>();
    const usersPage = loaderData.usersPage as IResourceModuleUsersPage
    const accessRoles = loaderData.accessRoles as IResourceModuleAccessRole[]
    const allOrgUnits = loaderData.allOrgUnits.orgUnits as IUnitItem[]

    const actionData = useActionData<typeof action>()
    const navigate = useNavigate()

    const [newAssignment, setNewAssignment] = useState<IResourceModuleAssignment>({
        user: null,
        accessRoleId: "",
        scopeId: 1 /* TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1" */,
        orgUnits: [],
        includeSubOrgUnits: false
    })

    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>([])
    const [includeSubOrgUnitsState, setIncludeSubOrgUnitsState] = useState(newAssignment.includeSubOrgUnits)

    const [searchParams,] = useSearchParams();

    useEffect(() => {
        // If changed urlParam, reset selected user to null if it is selected
        if (newAssignment.user) {
            setNewAssignment({...newAssignment, user: null})
        }
    }, [searchParams]);

    useEffect(() => {
        if (!actionData) {
            return
        }
        if (!actionData?.status) {
            toast.error("En feil oppstod ved forsøkt lagring. Prøv igjen.")
            return
        }

        if (actionData?.status) {
            toast.success(actionData.message)
            actionData.redirect ? navigate(actionData.redirect) : null
            return
        }
    }, [actionData]);

    useEffect(() => {
        setNewAssignment({
            ...newAssignment,
            orgUnits: selectedOrgUnits.map(orgUnit => orgUnit),
            includeSubOrgUnits: includeSubOrgUnitsState
        })
    }, [selectedOrgUnits]);
    const handleSelectUser = (newUser: IResourceModuleUser) => {
        setNewAssignment({...newAssignment, user: newUser})
    }

    const handleChangeIncludeSubOrgUnits = () => {
        setIncludeSubOrgUnitsState(!includeSubOrgUnitsState)
    }

    const setNewAccessRole = (accessRoleId: string) => {
        setNewAssignment({...newAssignment, accessRoleId: accessRoleId})
    }

    const handleSubmit = () => {
        event?.preventDefault()
        const resourceIdEle = document.getElementById("resourceId")
        const accessRoleIdEle = document.getElementById("accessRoleId")
        const scopeIdEle = document.getElementById("scopeId")
        const orgUnitsEle = document.getElementById("orgUnits")
        const includeSubOrgUnitsEle = document.getElementById("includeSubOrgUnits")

        const orgUnitsFromAssignment = newAssignment.orgUnits.map(org => org.organisationUnitId)

        resourceIdEle ? resourceIdEle.setAttribute("value", newAssignment.user?.resourceId ?? "") : ""
        accessRoleIdEle ? accessRoleIdEle.setAttribute("value", newAssignment.accessRoleId) : ""
        scopeIdEle ? scopeIdEle.setAttribute("value", String(newAssignment.scopeId)) : ""
        orgUnitsEle ? orgUnitsEle.setAttribute("value", String(orgUnitsFromAssignment)) : ""
        includeSubOrgUnitsEle ? includeSubOrgUnitsEle.setAttribute("value", String(newAssignment.includeSubOrgUnits)) : ""
    }

    const missingFields = !newAssignment.user || newAssignment.orgUnits.length === 0 || !newAssignment.accessRoleId

    return (
        <section className={"content tildeling-section-container"}>
            <Heading className={"heading"} level={"2"} size={"large"}>Tildel rettigheter</Heading>
            <ExpansionCard size="small" aria-label="Small-variant" defaultOpen={true}
                           className={newAssignment.user ? "expansion-green" : ""}>
                <ExpansionCard.Header>
                    {newAssignment.user ?
                        <ExpansionCard.Title><CheckmarkCircleIcon/> Bruker valgt</ExpansionCard.Title>
                        :
                        <ExpansionCard.Title>Finn brukeren å tildele rettigheter til</ExpansionCard.Title>
                    }
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <div className={"tildeling-section"}>
                        <TildelingToolbar allOrgUnits={allOrgUnits} accessRoles={accessRoles}/>
                        <TildelUserSearchResultList newAssignment={newAssignment} usersPage={usersPage}
                                                    handleSelectUser={handleSelectUser}/>
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard size="small" aria-label="Small-variant"
                           className={newAssignment.accessRoleId ? "expansion-green" : ""}>
                <ExpansionCard.Header>
                    {newAssignment.accessRoleId ?
                        <ExpansionCard.Title>
                            <CheckmarkCircleIcon/> Rolle valgt
                        </ExpansionCard.Title>
                        :
                        <ExpansionCard.Title>
                            Velg rolle
                        </ExpansionCard.Title>
                    }
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <ChooseAccessRole accessRoles={accessRoles} setNewAccessRole={setNewAccessRole}/>
                </ExpansionCard.Content>
            </ExpansionCard>

            <ExpansionCard size="small" aria-label="Small-variant"
                           className={newAssignment.orgUnits.length > 0 ? "expansion-green" : ""}>
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

                        <OrgUnitTreeSelector
                            orgUnitList={allOrgUnits}
                            selectedOrgUnits={selectedOrgUnits}
                            setSelectedOrgUnits={(newSelected) => setSelectedOrgUnits(newSelected)}
                            includeSubOrgUnitsState={includeSubOrgUnitsState}
                        />
                    </div>
                </ExpansionCard.Content>
            </ExpansionCard>

            <div className={"tildeling-section"}>
                <SummaryOfTildeling assignment={newAssignment} missingFields={missingFields} accessRoles={accessRoles}/>
                <Form method={"post"} onSubmit={handleSubmit}>
                    <input type={"hidden"} name={"resourceId"} id={"resourceId"}/>
                    <input type={"hidden"} name={"accessRoleId"} id={"accessRoleId"}/>
                    <input type={"hidden"} name={"scopeId"} id={"scopeId"}/>
                    <input type={"hidden"} name={"orgUnits"} id={"orgUnits"}/>
                    <input type={"hidden"} name={"includeSubOrgUnits"} id={"includeSubOrgUnits"}/>
                    <Button disabled={missingFields}>Lagre tildeling</Button>
                </Form>
            </div>
        </section>
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