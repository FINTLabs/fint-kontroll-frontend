import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";

type ResourceAlertProps = {
    responseCode: string | undefined,
    successText?: string,
    deleteText?: string,
    conflictText?: string
}

export const ResponseAlert = (
    {
        responseCode,
        successText = "Tildelingen var vellykket!",
        deleteText = "Tildelingen ble slettet!",
        conflictText = "Det oppstod en konflikt under tildelingen. Denne ressursen er allerede tildelt"
    }: ResourceAlertProps
) => {
    if (responseCode === undefined) return null

    if (responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                {successText}
            </AlertWithCloseButton>
        )
    } else if (responseCode === "410" || responseCode === "204") {
        return (
            <AlertWithCloseButton variant="success">
                {deleteText}
            </AlertWithCloseButton>
        )
    } else if (responseCode === "409") {
        return (
            <AlertWithCloseButton variant="error">
                {conflictText}
            </AlertWithCloseButton>
        )
    } else return (
        <AlertWithCloseButton variant="error">
            Noe gikk galt under tildelingen!
            <div>Feilkode: {responseCode}</div>
        </AlertWithCloseButton>
    )
}
