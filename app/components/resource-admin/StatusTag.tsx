import {Tag} from "@navikt/ds-react";

export const StatusTag = (prop: { status: string | undefined }) => {

    if (prop.status === undefined) return null

    if (prop.status === "ACTIVE") {
        return (
            <Tag size="small" variant="success">
                {prop.status}
            </Tag>
        )
    } else if (prop.status === "DISABLED") {
        return (
            <Tag size="small" variant="info">
                {prop.status}
            </Tag>
        )
    } else if (prop.status === "DELETED")
        return (
            <Tag size="small" variant="error">
                {prop.status}
            </Tag>
        )
}