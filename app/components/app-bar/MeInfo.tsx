import {Buldings3Icon, PersonCircleIcon} from '@navikt/aksel-icons';
import React from "react";
import {BodyShort} from "@navikt/ds-react";
import appStyles from "./appBar.css?url"
import {IMeInfo} from "~/data/types";

export function links() {
    return [{rel: 'stylesheet', href: appStyles}]
}

function MeInfo(props: { me: IMeInfo }) {

    return (
        <>
            {/*<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
            {/*    <ExclamationmarkTriangleIcon title="a11y-title" fontSize="1rem"/>*/}
            {/*    <p style={{margin: "1em"}}>*/}
            {/*        Det ser ut som du mangler rettigheter i løsningen*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*:*/}
            <div className={"meInfo"}>
                <div className={"meInfo"}>
                    <Buldings3Icon title="a11y-title" fontSize="1.5rem"/>
                    <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                        {props.me?.organisationId}
                    </BodyShort>
                </div>
                <div className={"meInfo"}>
                    <PersonCircleIcon title="a11y-title" fontSize="1.5rem"/>
                    <BodyShort size="small" weight="semibold" truncate className="max-w-[10vw]">
                        {props.me?.firstName} {props.me?.lastName}
                    </BodyShort>
                </div>
            </div>

        </>
    );
}

export default MeInfo;