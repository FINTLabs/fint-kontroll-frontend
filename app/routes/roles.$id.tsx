import React from 'react';
import styles from "~/components/user/user.css"
import {Heading} from "@navikt/ds-react";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export default function RolesId() {

    return (
        <section className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Gruppeinfo</Heading>
            </div>
        </section>
    );
}