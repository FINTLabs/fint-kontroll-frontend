import {Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {Outlet, useFetcher, useLoaderData, useLocation, useNavigate, useSearchParams} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {ActionFunctionArgs, json} from "@remix-run/node";
import styles from "~/components/user/user.css";
import {fetchAccessRoles, fetchFeaturesInRole} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import React, {useEffect, useState} from "react";
import {IRole} from "~/data/kontrollAdmin/types";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const auth = request.headers.get("Authorization")

    const response = await fetchAccessRoles(auth);
    return json(await response.json());

}

export default function KontrollAdminDefineRole() {
    const roles: IRole[] = useLoaderData<typeof loader>();

    const urlParams = new URLSearchParams();
    const roleProp = urlParams.get("selectedRole")
    const navigate = useNavigate();

    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        if(!roleProp) {navigate(roles[0].accessRoleId)}
    }, []);


    const handleChangeSelectedRole = (role: string) => {
        navigate(role)
    }

    return (
        <section>
            <Tabs value={"define"}>
                <Tabs.Panel value="define" className="h-24 w-full bg-gray-50 p-4">
                    <div className={"radio-group-horizontal"}>
                        <RadioGroup
                            legend="Velg rolle"
                            onChange={(val: string) => handleChangeSelectedRole(val)}
                            defaultValue={roles[0].accessRoleId}
                        >
                            {roles.map((role, index) =>
                                <Radio key={role.accessRoleId} value={role.accessRoleId}>
                                    {role.name}
                                </Radio>)}
                        </RadioGroup>
                    </div>

                    <Outlet />
                </Tabs.Panel>
            </Tabs>
        </section>
    );
}