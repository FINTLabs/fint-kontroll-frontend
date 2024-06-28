import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";
import React from "react";

export const ResponseAlert = (prop: { responseCode: string | undefined }) => {

    if (prop.responseCode === undefined) return null

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen var vellykket!
            </AlertWithCloseButton>
        )
    }
    else if (prop.responseCode === "410") {
        return (
            <AlertWithCloseButton variant="success">
                Tildelingen er slettet!
            </AlertWithCloseButton>
        )
    }
    else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {prop.responseCode}</div>
        </AlertWithCloseButton>
    )
}