import {ACCESS_MANAGEMENT_API_URL, BASE_PATH} from "../../../environment";

export const fetchAllFeatures = async (token: string | null) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/feature`, {
        headers: {Authorization: token ?? ""}
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchAccessRoles = async (token: string | null) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessrole`, {
        headers: {Authorization: token ?? ""}
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchFeaturesInRole = async (token: string | null, roleId: string | undefined) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`, {
        headers: {Authorization: token ?? ""}
    })
    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Du har ikke rettigheter til å hente ut CRUD-data")
    }

    return generalErrorResponse(response)
}

export const putPermissionDataForRole = async (token: string | null, updatedPermissionRole: any) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission`, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: "PUT",
        body: updatedPermissionRole,
    })
    if (response.ok) {
        return response;
    }
    if (response.status === 500) {
        return response
    }

    return generalErrorResponse(response)
}

const generalErrorResponse = (response: Response) => {
    if (response.status === 500) {
        throw new Error("Noe gikk galt. Feilkode 500")
    }
    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}