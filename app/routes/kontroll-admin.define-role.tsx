import {Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {
    Links,
    Meta,
    Outlet, Scripts,
    useLoaderData,
    useNavigate, useOutletContext,
    useParams, useRouteError,
} from "@remix-run/react";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {json} from "@remix-run/node";
import {fetchAccessRoles} from "~/data/kontrollAdmin/kontroll-admin-define-role";
import React, {Suspense, useEffect} from "react";
import {IRole} from "~/data/kontrollAdmin/types";


export async function loader({request}: LoaderFunctionArgs) {
    const auth = request.headers.get("Authorization")
    const response = await fetchAccessRoles(auth);
    return json(await response.json());
}

export default function KontrollAdminDefineRole() {
    const roles: IRole[] = useLoaderData<typeof loader>();
    const context = useOutletContext()

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

                        <Outlet context={context} />
                    </Tabs.Panel>
                </Tabs>
            </Suspense>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <html lang={"no"}>
            <head>
                <title>Feil oppstod</title>
                <Meta/>
                <Links/>
            </head>
            <body>
                <div>{error.message}</div>
                <Scripts/>
            </body>
        </html>
    );
}