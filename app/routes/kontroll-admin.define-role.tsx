import {Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {
    Outlet,
    useLoaderData,
    useNavigate,
    useParams,
} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import styles from "~/components/user/user.css";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import React, {Suspense, useEffect} from "react";
import {IRole} from "~/data/kontrollAdmin/types";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({request}: LoaderFunctionArgs) {
    const auth = request.headers.get("Authorization")
    const response = await fetchAccessRoles(auth);
    return json(await response.json());
}

export default function KontrollAdminDefineRole() {
    const roles: IRole[] = useLoaderData<typeof loader>();

    const params = useParams()

    const roleProp = params.id
    const navigate = useNavigate();

    const handleChangeSelectedRole = (role: string) => {
        navigate(role)
    }

    useEffect(() => {
        !roleProp ? navigate(roles[0].accessRoleId) : ""
    }, []);

    return (
        <section>
            <Suspense fallback={<>Loading data</>}>
                <Tabs value={"define-role"}>
                    <Tabs.Panel value="define-role" className="h-24 w-full bg-gray-50 p-4">
                        <div className={"radio-group-horizontal"}>
                            <RadioGroup
                                legend="Velg rolle"
                                onChange={(val: string) => handleChangeSelectedRole(val)}
                                value={roleProp ? roleProp : ""}
                            >
                                {roles.map((role, index) =>
                                    <Radio key={role.accessRoleId + index} value={role.accessRoleId}>
                                        {role.name}
                                    </Radio>)
                                }
                            </RadioGroup>
                        </div>

                        <Outlet />
                    </Tabs.Panel>
                </Tabs>
            </Suspense>
        </section>
    );
}