import {AlertWithCloseButton} from "~/components/assignment/AlertWithCloseButton";

export const ResponseAlert = (prop: { responseCode: string | undefined, successText?: string, deleteText?:string }) => {

    if (prop.responseCode === undefined) return null

    if (prop.responseCode === "201") {
        return (
            <AlertWithCloseButton variant="success">
                {prop.successText}
            </AlertWithCloseButton>
        )
    }
    else if (prop.responseCode === "410") {
        return (
            <AlertWithCloseButton variant="success">
                {prop.deleteText}
            </AlertWithCloseButton>
        )
    }else if (prop.responseCode === "204") {
        return (
            <AlertWithCloseButton variant="success">
                {prop.deleteText}
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