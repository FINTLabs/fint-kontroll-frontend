import {Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {Outlet, useLoaderData, useNavigate, useParams} from "@remix-run/react";
import React, {useEffect} from "react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import {IResourceModuleAccessRole} from "~/data/resourceModuleAdmin/types";
import styles from "~/components/kontroll-admin/kontroll-admin.css";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
    const auth = request.headers.get("Authorization")

    const accessRolesRes = await fetchAccessRoles(auth)

    return await accessRolesRes.json()
}

export default () => {
    const accessRoles: IResourceModuleAccessRole[] = useLoaderData<typeof loader>()


    const params = useParams()

    const roleProp = params.id
    const navigate = useNavigate();

    const handleChangeSelectedRole = (role: string) => {
        navigate(role)
    }

    useEffect(() => {
        !roleProp ? navigate(accessRoles[0].accessRoleId) : ""
    }, []);

    return (
        <Tabs value={"featureRole"}>
            <Tabs.Panel value="featureRole" className="h-24 w-full bg-gray-50 p-4">
                <div className={"radio-group-horizontal"}>
                    <RadioGroup
                        legend="Velg rolle"
                        onChange={(val: string) => handleChangeSelectedRole(val)}
                        value={roleProp ? roleProp : ""}
                    >
                        {accessRoles.map((role, index) =>
                            <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                                {role.name}
                            </Radio>)
                        }
                    </RadioGroup>
                </div>

                <Outlet />
            </Tabs.Panel>
        </Tabs>
    )
}