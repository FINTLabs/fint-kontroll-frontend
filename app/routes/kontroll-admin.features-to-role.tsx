import {Radio, RadioGroup, Tabs} from "@navikt/ds-react";
import {Outlet} from "@remix-run/react";
import React from "react";

export default () => {

    return (
        <Tabs value={"featureRole"}>
            <Tabs.Panel value="featureRole" className="h-24 w-full bg-gray-50 p-4">
                <div className={"radio-group-horizontal"}>
                    Here
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}